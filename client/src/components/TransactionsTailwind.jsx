import React, { useContext } from "react";
import { Context } from "../context/Context";
import dummyData  from "../utils/dummyData";
import { ethers } from "ethers";
import { datatableStyle, transactionBox1, transactionBox2 } from "../styles/styles"; // common styles are saved and import to provide better visibility of code

/**
 * TransactionsTailwind
 *
 * This component displays all transaction data for the current wallet connected.
 *
 * Example data is displayed when a web3 ethereum connection is not present.
 * Real transaction data can be fetched once a connection is made using
 * the call feature. The data is fetched from the Etherscan api and mapped to
 * the TransactionBlock and styled.
 *
 * @author Sam Johnston
 * @id W17004648
 * @github https://github.com/SamJohnstonNE/dissertation
 */

const TransactionsBlock = ({ blockNumber, chainId, confirmations, from, timestamp, to, hash, addressFrom, addressTo, amount, message, timestamp1, id, gasPrice, value, data })  => {

    const { currentAccount } = useContext(Context);


    return (
        /* Parts of this section is taken from the Tailwind website
        * https://tailwindui.com/components/application-ui/data-display/description-lists */
        <div>
            <div className="dark:bg-gray-200 shadow overflow-hidden sm:rounded-lg">
                <div className="border-t border-gray-200">
                    { currentAccount ? (
                    <dl>
                        <div className={transactionBox1}>
                            <dt className={datatableStyle}>Chain ID:</dt>
                            <dd className="mt-1 text-sm text-white font-bold dark:text-black sm:mt-0 sm:col-span-2" id="twelve" key="chainId">{chainId}</dd>
                        </div>
                        <div className={transactionBox2}>
                            <dt className={datatableStyle}>Block Number:</dt>
                            <a href={`https://ropsten.etherscan.io/block/${blockNumber}`} target="_blank" rel="noopener noreferrer">
                                <dd className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2" id="" key="blockNumber">{blockNumber}</dd>
                            </a>
                        </div>
                        <div className={transactionBox1}>
                            <dt className={datatableStyle}>TxID:</dt>
                            <a href={`https://ropsten.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">
                                <dd className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2" id="" key="hash">{hash}</dd>
                            </a>
                        </div>
                        <div className={transactionBox2}>
                            <dt className={datatableStyle}>From:</dt>
                            <a href={`https://ropsten.etherscan.io/address/${from}`} target="_blank" rel="noopener noreferrer">
                                <dd className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2" id="thirteen" key="from">{from}</dd>
                            </a>
                        </div>
                        <div className={transactionBox1}>
                            <dt className={datatableStyle}>To:</dt>
                            <a href={`https://ropsten.etherscan.io/address/${to}`} target="_blank" rel="noopener noreferrer">
                                <dd className="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2" id="fourteen" key="to">{to}</dd>
                            </a>
                        </div>
                        <div className={transactionBox2}>
                            <dt className={datatableStyle}>Gas Price:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="" key="">
                                {ethers.utils.formatUnits(gasPrice)} ETH | {ethers.utils.formatUnits(gasPrice, "gwei") | ethers.utils.formatUnits(gasPrice)} gwei
                            </dd>
                        </div>
                        <div className={transactionBox1}>
                            <dt className={datatableStyle}>Value:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="fifteen" key="">{ethers.utils.formatEther(value)} ETH</dd>
                        </div>
                        <div className={transactionBox2}>
                            <dt className={datatableStyle}>Input:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2 overflow-x-auto" id="sixteen" key="">{data}</dd>
                        </div>
                        <div className={transactionBox1}>
                            <dt className={datatableStyle}>Confirmations:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="" key="confirmations">{confirmations}</dd>
                        </div>
                        <div className={transactionBox2}>
                            <dt className={datatableStyle}>Timestamp:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="seventeen" key="timestamp">{timestamp}</dd>
                        </div>
                    </dl>
                    ) : (
                        <dl>
                            <div className="bg-[#282c34] dark:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                                <dt className="text-sm font-medium text-white dark:text-black">ID:</dt>
                                <dd className="mt-1 text-sm text-white font-bold dark:text-black sm:mt-0 sm:col-span-2" id="twelve">{id}</dd>
                            </div>
                            <div className="bg-[#282c34] dark:bg-gray-300 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                                <dt className="text-sm font-medium text-white dark:text-black">From:</dt>
                                <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                                    <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="thirteen">{addressFrom}</dd>
                                </a>
                            </div>
                            <div className="bg-[#282c34] dark:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                                <dt className="text-sm font-medium text-white dark:text-black">To:</dt>
                                <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                                    <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="fourteen">{addressTo}</dd>
                                </a>
                            </div>
                            <div className="bg-[#282c34] dark:bg-gray-300 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                                <dt className="text-sm font-medium text-white dark:text-black">Amount:</dt>
                                <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="fifteen">{amount} ETH</dd>
                            </div>
                            <div className="bg-[#282c34] dark:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                                <dt className="text-sm font-medium text-white dark:text-black">Message:</dt>
                                <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="sixteen">{message}</dd>
                            </div>
                            <div className="bg-[#282c34] dark:bg-gray-300 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                                <dt className="text-sm font-medium text-white dark:text-black">Timestamp:</dt>
                                <dd className="mt-1 text-[#37c7da] font-bold dark:text-blue-800 sm:mt-0 sm:col-span-2" id="seventeen">{timestamp1}</dd>
                            </div>
                        </dl>
                    )}
                </div>
            </div>
            <br/>
        </div>
    )
}

const TransactionsTailwind = () => {
    const { currentAccount, transactionHistory, history } = useContext(Context);

    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 bg-[#efeff4] dark:bg-[#0f172a]">
            <div className="flex flex-col md:px-20 py-4 px-4 w-full">
                { currentAccount ? (
                    <div>
                        <h3 className="text-black ml-9 text-3xl text-left my-2 dark:text-gray-300">
                            Latest Transactions
                        </h3>
                        <button
                            type="button"
                            onClick={transactionHistory}
                            className="float-right mr-9 w-64 p-1 bg-[#2952e3] rounded-md cursor-pointer hover:bg-[#2546bd]"
                        >
                            <p className="text-base text-white font-semibold">Retrieve Transaction History</p>
                        </button>
                        <p className="text-black left ml-9 mr-2 my-2 dark:text-gray-300 font-thin italic">
                            All successful transactions for the current connected wallet will be fetched using the Etherscan API
                        </p>
                        <div className="flex flex-wrap justify-center items-center py-4">
                            {[...history].reverse().map((transaction, i) => (
                                <TransactionsBlock key={i} {...transaction} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-black text-3xl text-center my-2 dark:text-gray-300">
                            Connect your account to see the latest transactions
                        </h3>
                        <p className="text-black text-center my-2 dark:text-gray-300 font-thin italic">
                            Any data that is visible when an account is not connect is example data and the ID will be marked with "Example"
                        </p>
                        <div className="flex flex-wrap justify-center items-center mt-10" id="eleven">
                            {[...dummyData].reverse().map((transaction, i) => (
                                <TransactionsBlock key={i} {...transaction} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionsTailwind;
