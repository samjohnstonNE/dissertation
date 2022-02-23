import React, {useContext, useState} from "react";
import { SiEthereum } from "react-icons/si";
import Input from "./Input";
import { useWeb3 } from "@3rdweb/hooks";
import { TransactionContext } from "../context/TransactionContext";
//import { shortenAddress  } from "../utils/shortenAddress";
import { Steps } from 'intro.js-react';
import "intro.js/introjs.css";
import stepList  from "../utils/stepList";


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[1px] border-gray-400 text-sm text-black dark:text-white";

const Main = () => {

    const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);

    const { address, chainId } = useWeb3();

    const handleSubmit = (e) => {
        const { addressTo, amount, message } = formData;

        e.preventDefault();

        if(!addressTo || !amount || !message) return;

        sendTransaction();
    }

    const [ enabled, setEnabled ] = useState(true)
    const [ initialStep, setInitialStep ] = useState(0)

    const onExit = () => {
        setEnabled(false)
    }


    return(
        <div className="flex w-full justify-center items-center bg-[#efeff4] dark:bg-[#0f172a]">
            <Steps
                enabled={enabled}
                steps={stepList}
                initialStep={initialStep}
                onExit={onExit}
            />
            <div className="flex md:flex-row items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col md:mr-10">

                    <h1 className="dark:text-gray-300 text-3xl sm:text-5xl text-black py-1">
                        Send Crypto. <br /> Wherever, Whenever.
                    </h1>
                    <p className="dark:text-gray-300 text-left mt-5 text-black md:w-9/12 w-11/12 text-base">
                        Explorer the crypto world. Buy and sell crypto currencies.
                    </p>
                    <p className="dark:text-gray-300 text-left mt-5 text-black md:w-9/12 w-11/12 text-base">
                        The web wallet for both beginners and experienced users.
                    </p>

                    {!currentAccount && (
                        <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        id="six"
                        >
                        <p className="dark:text-white text-base text-white font-semibold">Connect Web3.0 Wallet</p>
                    </button>
                    )}

                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`sm:rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>
                            Security
                        </div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyles}>
                            Low Fees<
                            /div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10 pl-4">
                    <div className="p-3 flex justify-end items-start flex-col  h-40 sm:w-72 w-full my-5" id="seven">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-center items-start">
                                <div className="w-20 h-20 rounded-full border-2 border-black flex justify-center items-center dark:border-gray-300">
                                    <SiEthereum fontSize={41} className="text-black dark:text-gray-300" />
                                </div>
                            </div>
                            <p className="text-black font-light text-sm dark:text-gray-300">
                                Address: {address}
                            </p>
                            <p className="text-black font-light text-sm dark:text-gray-300">
                                Short Address:
                            </p>
                            <p className="text-black font-light text-sm dark:text-gray-300" id="eight">
                                Chain ID: {chainId}
                            </p>
                        </div>
                    </div>
                    <div className="text-black p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism" id="nine">
                        <Input placeholder="Recipient Address" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />


                        <div className="h-[1px] w-full bg-grey-400 my-2"/>
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white font-semibold w-full mt-2 p-2 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                Send
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;