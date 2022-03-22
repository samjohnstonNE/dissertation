import React, {useEffect, useState} from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext(0);

const { ethereum } = window;

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
    const [transactionCount, setTransactionCount] =  useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);


    const handleChange = (e, name) => {
        setformData((prevState) => ({...prevState, [name]: e.target.value}));
    };

    const getAllTransactions = async () => {
        try {
            if (ethereum) {

                const transactionContract = getEthereumContract();

                const availableTransactions = await transactionContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkWalletConnection = async  () => {
        try {
            if (!ethereum) return alert("Please install either MetaMask or MathWallet Connect. Icons in the top left are links to the installation pages");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                await getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkTransactionsExistence = async () => {
        try {
            if (ethereum) {
                const transactionContract = getEthereumContract();
                const currentTransactionCount = await transactionContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log(error);

            throw new Error("Transaction check failed");
        }
    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install either MetaMask or MathWallet Connect. Icons in the top left are links to the installation page");

            const accounts = await  ethereum.request({method: 'eth_requestAccounts', });

            setCurrentAccount(accounts[0]);

            window.reload();
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
                window.alert(`Transaction Successful!\n TxID - ${transactionHash.hash}\n If the window does not refresh after closing this alert, please refresh the page`)

                const transactionsCount = await transactionContract.getTransactionCount();

                setTransactionCount(transactionsCount.toNumber());
            } else {
                console.log("No Ethereum Object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object");
        }
    };

    useEffect(() => {
        checkWalletConnection();
        checkTransactionsExistence();
    },
        [transactionCount]);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setformData,
            handleChange,
            sendTransaction,
            transactionCount,
            transactions
        }}
        >
            {children}
        </TransactionContext.Provider>
    );

}