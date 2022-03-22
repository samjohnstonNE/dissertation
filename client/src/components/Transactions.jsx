import React, {useContext, useState} from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData  from "../utils/dummyData";
import { Steps } from 'intro.js-react';
import "intro.js/introjs.css";
import stepList  from "../utils/stepList";

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, amount }) => {

    const [ enabled, setEnabled ] = useState(true)
    const [ initialStep, setInitialStep ] = useState(0)

    const onExit = () => {
        setEnabled(false)
    }

    return (
        <div className="bg-[#282c34] dark:bg-gray-300 m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[340px]
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <Steps
                enabled={enabled}
                steps={stepList}
                initialStep={initialStep}
                onExit={onExit}
            />
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base dark:text-black" id="eleven">
                            From: {addressFrom}
                        </p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base dark:text-black" id="twelve">
                            To: {addressTo}
                        </p>
                    </a>
                    <p className="text-white text-base dark:text-black" id="thirteen">
                        Amount: {amount} ETH
                    </p>
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base dark:text-black" id="fourteen">
                                Message: {message}
                            </p>
                        </>
                    )}
                    <p className="text-[#37c7da] font-bold dark:text-blue-800" id="fifteen">
                        {timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
}

const Transactions = () => {
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
                <div className="flex flex-wrap justify-center items-center mt-10" id="ten">
                    {[...dummyData, ...transactions].reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;