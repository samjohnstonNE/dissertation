import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress, apiKey } from "../utils/constants";


export const TransactionContext = React.createContext(0);

const { ethereum } = window;

const etherscanProvider = new ethers.providers.EtherscanProvider("ropsten", apiKey);


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

    const handleChange = (e, name) => {
        setformData((prevState) => ({...prevState, [name]: e.target.value}));
    };


    const accountBalance = () => {
        try {
            if (ethereum) {
                etherscanProvider.getBalance(currentAccount).then(function(balance) {

                    // balance is a BigNumber (in wei); format is as a sting (in ether)
                    let eth = ethers.utils.formatEther(balance);
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

    const getGasPrice = () => {
        try {
            if (ethereum) {
                etherscanProvider.getGasPrice().then((gasPrice) => {

                    let gasG = ethers.utils.formatUnits(gasPrice, "gwei") | ethers.utils.formatUnits(gasPrice)
                    let gasETH = ethers.utils.formatUnits(gasPrice)

                    setGas(gasETH + ' ETH | ' + gasG + ' gwei')
                });
            } else {
                    console.log("Retrieving Gas Price failed");
                }
            } catch (error) {
                console.log(error);

                throw new Error("No Ethereum object");
            }
    }

    const transactionHistory = async () => {
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

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const { addressTo, amount, message } = formData;
                const transactionContract = getEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208', //21000 GWEI
                        value: parsedAmount._hex, //0.00001
                    }],
                });

                const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);
                window.alert(`Transaction Successful!\n TxID - ${transactionHash.hash}\nIf the window does not refresh after closing this alert, please refresh the page`)
            } else {
                console.log("Sending transaction failed");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object");
        }
    };


    useEffect(() => {
        checkWalletConnection();
        getGasPrice();
        accountBalance();
    },
        [setGas, gas, setBalance, balance]);

    return (
        <TransactionContext.Provider value={{
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
            isLoading
        }}
        >
            {children}
        </TransactionContext.Provider>
    );

}