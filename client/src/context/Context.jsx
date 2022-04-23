import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress, apiKey } from "../utils/constants";

/**
 * Transaction Context
 *
 * Performs the transactions and provides all the data for the application.
 *
 * This component consists of functions that are linked to the blockchain
 * and perform fetching ,sending and setting data tasks.
 * The transaction provider is wrapped around the application in the main.jsx file.
 * Each function and variable is passed through the provider at the bottom of the file
 * and can be imported on every component. Each variable containing data is set using useState and
 * some functions are included in the useEffect to load whenever the page refreshes.
 *
 * @author Sam Johnston
 * @id W17004648
 * @github https://github.com/SamJohnstonNE/dissertation
 */

export const Context = React.createContext(0);

const { ethereum } = window; //Creates a web3 ethereum window

const etherscanProvider = new ethers.providers.EtherscanProvider("ropsten", apiKey); //Sets the provider to the ropsten using an etherscan apikey and ethers library

/* Initialise Ethereum Window to pass details to contract */
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};


export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] =  useState('');
    const [formData, setformData] = useState({addressTo: '', amount: '', message: ''});
    const [isLoading, setIsLoading] =  useState(false);
    const [history, setHistory] = useState([]);
    const [gas, setGas] = useState('');
    const [balance, setBalance] = useState('');
    const [gasO, setGasO] = useState([]);
    const [eth, setEth] = useState([]);
    const [supply, setSupply] = useState([]);

    const handleChange = (e, name) => {
        setformData((prevState) => ({...prevState, [name]: e.target.value}));
    };

    /* Fetches and sets account balance based on current wallet connected */
    const accountBalance = () => {
        try {
            if (ethereum) {
                etherscanProvider.getBalance(currentAccount).then(function(balance) {

                    // balance is a BigNumber (in wei); format is as a sting (in ether)
                    let eth = ethers.utils.formatEther(balance);

                    // limit the balance number to 5 characters for better readability
                    let shortBal = eth.slice(0, 5)

                    setBalance(shortBal + ' ETH')
                });
            } else {
                console.log("Retrieving balance failed");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object");
        }
    }

    /* Fetches and sets gas price from Etherscan using the ethers library (experimental) */
    const getGasPrice = () => {
        try {
            etherscanProvider.getGasPrice().then((gasPrice) => {

                // gasPrice is a BigNumber (in wei); format is as a sting (in gwei) and  use of | operator
                let gasG = ethers.utils.formatUnits(gasPrice, "gwei") | ethers.utils.formatUnits(gasPrice)

                // format gasPrice for a value in ETH
                let gasETH = ethers.utils.formatUnits(gasPrice)

                setGas(gasETH + ' ETH | ' + gasG + ' gwei')
            });
        } catch (error) {
            console.log(error);

            throw new Error("Retrieving Gas Price failed");
        }
    }

    /* Fetches and sets the low, average and high gas price from the last the etherscan oracle database */
    const getGasPriceOracle = () => {
        try {
            let url = "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + apiKey //Mainnet Oracle database using apikey

            fetch(url)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        throw Error(response.statusText);
                    }
                })
                .then ((data) => {
                    setGasO([
                        "Low: " +
                        data.result.SafeGasPrice +
                        " | " +
                        "Average: " +
                        data.result.ProposeGasPrice +
                        " | " +
                        "High: " +
                        data.result.FastGasPrice +
                        " | " +
                        "Suggest Base Fee : " +
                        [data.result.suggestBaseFee | data.result.suggestBaseFee]
                    ])
                })
                .catch ((err) => {
                    console.log("something went wrong ", err)
                });
        } catch (error) {
            console.log(error);

            throw new Error("Retrieving Gas Price failed");
        }
    }

    /* Fetches and sets Ethereum's last known price as USD and BTC from the etherscan database */
    const getEthCurrentPrice = () => {
        try {
            let url = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + apiKey

            fetch(url)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        throw Error(response.statusText);
                    }
                })
                .then((data) => {
                    setEth([
                        "$" +
                        data.result.ethusd +
                        " | " +
                        "ETH/BTC: " +
                        data.result.ethbtc
                    ])
                })
                .catch ((err) => {
                    console.log("something went wrong ", err)
                });
        } catch (error) {
            console.log(error);

            throw new Error("Retrieving ETH Current Price Failed");
        }
    }

    /* Fetches and sets the current circulating supply of Ethereum from the etherscan database */
    const getCurrentSupply = () => {
        try {
            let url = "https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=" + apiKey

            fetch(url)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        throw Error(response.statusText);
                    }
                })
                .then((data) => {
                    setSupply([data.result])
                })
                .catch ((err) => {
                    console.log("something went wrong ", err)
                });
        } catch (error) {
            console.log(error);

            throw new Error("Retrieving Current Supply Failed");
        }
    }

    /* Fetches and sets all transactions of current account from Etherscan using the ethers library */
    const transactionHistory = () => {
        try {
            if (ethereum) {
                etherscanProvider.getHistory(currentAccount).then((history) => {
                    setHistory(history);
                    });
            } else {
                console.log("Retrieving transactions failed");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object");
        }
    }

    /* Checks that a web3 extension is installed in the browser with a connected unlocked account
    * async function to wait and check before setting current account */
    const checkWalletConnection = async  () => {
        try {
            if (!ethereum) return alert("Please install either MetaMask or MathWallet Connect. Icons in the top left are links to the installation pages");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object");
        }
    };

    /* Connects the application to a web3 browser extension
    * async function to wait and check before setting current account */
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install either MetaMask or MathWallet Connect. Icons in the top left are links to the installation page");

            const accounts = await  ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);

            location.reload();
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum object");
        }
    };

    /* Performs transaction request using smart contract function  */
    const sendTransaction = async () => {
        try {
            if (ethereum) {
                // variables passed for the input section as
                const { addressTo, amount, message } = formData;
                const transactionContract = getEthereumContract(); // calls smart contract
                const parsedAmount = ethers.utils.parseEther(amount); // amount to send (ether)

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208', //21000 GWEI
                        value: parsedAmount._hex, //0.00001 ETH
                    }],
                });

                const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message); // passes the variables from the input to the smart contract

                // sets loading state to true for loading component to render (user feedback)
                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);
                window.alert(`Transaction Successful!\n TxID - ${transactionHash.hash}\nIf the window does not refresh after closing this alert, please refresh the page`); // sets alert for user
            } else {
                console.log("Sending transaction failed");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object");
        }
    };

    /* Calls all fetching functions to refresh data */
    const refresh = () => {
        getCurrentSupply();
        getEthCurrentPrice();
        getGasPriceOracle();
        getGasPrice();
        accountBalance();
    }

    /* Functions passed through useEffect to run when page loads */
    useEffect(() => {
        checkWalletConnection();
        getGasPrice();
        getGasPriceOracle();
        accountBalance();
        getEthCurrentPrice();
        getCurrentSupply();
        },
        [ balance, gas ]);

    return (
        <Context.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setformData,
            handleChange,
            sendTransaction,
            transactionHistory,
            history,
            balance,
            accountBalance,
            gas,
            getGasPrice,
            isLoading,
            getGasPriceOracle,
            gasO,
            getEthCurrentPrice,
            eth,
            getCurrentSupply,
            supply,
            refresh
        }}>
            {children}
        </Context.Provider>
    );

}