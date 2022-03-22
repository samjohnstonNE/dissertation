import React, {useContext, useState} from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData  from "../utils/dummyData";
import { Steps } from 'intro.js-react';
import "intro.js/introjs.css";
import stepList  from "../utils/stepList";

const TransactionsBlock = ({ addressTo, addressFrom, timestamp, message, amount, id })  => {

    const [ enabled, setEnabled ] = useState(true)
    const [ initialStep, setInitialStep ] = useState(0)


    const onExit = () => {
        setEnabled(false)
    }


    return (
        /* Parts of this section is taken from the Tailwind website
        * https://tailwindui.com/components/application-ui/data-display/description-lists */
        <div>
            <div className="dark:bg-gray-200 shadow overflow-hidden sm:rounded-lg">
                <Steps
                    enabled={enabled}
                    steps={stepList}
                    initialStep={initialStep}
                    onExit={onExit}
                />
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-[#282c34] dark:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                            <dt className="text-sm font-medium text-white dark:text-black">ID:</dt>
                            <dd className="mt-1 text-sm text-white font-bold dark:text-black sm:mt-0 sm:col-span-2" id="eleven">{id}</dd>
                        </div>
                        <div className="bg-[#282c34] dark:bg-gray-300 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                            <dt className="text-sm font-medium text-white dark:text-black">From:</dt>
                            <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                                <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="twelve">{addressFrom}</dd>
                            </a>
                        </div>
                        <div className="bg-[#282c34] dark:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                            <dt className="text-sm font-medium text-white dark:text-black">To:</dt>
                            <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                                <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="thirteen">{addressTo}</dd>
                            </a>
                        </div>
                        <div className="bg-[#282c34] dark:bg-gray-300 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                            <dt className="text-sm font-medium text-white dark:text-black">Amount:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="fourteen">{amount} ETH</dd>
                        </div>
                        <div className="bg-[#282c34] dark:bg-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-gray-400 border-opacity-20">
                            <dt className="text-sm font-medium text-white dark:text-black">Message:</dt>
                            <dd className="mt-1 text-sm text-white dark:text-black sm:mt-0 sm:col-span-2" id="fifteen">{message}</dd>
                        </div>
                        <div className="bg-[#282c34] dark:bg-gray-300 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-white dark:text-black">Timestamp:</dt>
                            <dd className="mt-1 text-[#37c7da] font-bold dark:text-blue-800 sm:mt-0 sm:col-span-2" id="sixteen">{timestamp}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <br/>
        </div>
    )
}

const TransactionsTailwind = () => {
    const { currentAccount, transactions } = useContext(TransactionContext);

    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 bg-[#efeff4] dark:bg-[#0f172a]">
            <div className="flex flex-col md:p-12 py-12 px-4">
                { currentAccount ? (
                    <h3 className="text-black text-3xl text-center my-2 dark:text-gray-300">
                        Latest Transactions
                    </h3>
                ) : (
                    <h3 className="text-black text-3xl text-center my-2 dark:text-gray-300">
                        Connect your account to see the latest transactions
                    </h3>
                )}
                <p className="text-black text-center my-2 dark:text-gray-300 font-thin italic">
                    Any data that is visible when an account is not connect is example data and the ID will be marked with "Example"
                </p>
                <div className="flex flex-wrap justify-center items-center mt-10" id="ten">
                    {[...dummyData, ...transactions].reverse().map((transaction, i) => (
                        <TransactionsBlock key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TransactionsTailwind;
