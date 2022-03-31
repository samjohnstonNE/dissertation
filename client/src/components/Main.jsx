import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import Input from "./Input";
import { useWeb3 } from "@3rdweb/hooks";
import { TransactionContext } from "../context/TransactionContext";
import Loading from "./Loading";


const Main = () => {

    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, balance, isLoading } = useContext(TransactionContext);

    const { address, chainId } = useWeb3();

    //const shortAdd = `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

    const handleSubmit = (e) => {
        const { addressTo, amount, message } = formData;

        e.preventDefault();

        if(!addressTo || !amount || !message) return;

        sendTransaction();
    }



    return(
        <div className="flex w-full justify-center items-center bg-[#efeff4] dark:bg-[#0f172a]">
            <div className="flex md:flex-row items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col md:mr-10">

                    <h1 className="dark:text-gray-300 text-3xl sm:text-5xl text-black py-1">
                        Send Crypto. <br /> Wherever, Whenever.
                    </h1>
                    <p className="dark:text-gray-300 text-left mt-4 text-black md:w-9/12 w-11/12 text-base">
                        Explorer the crypto world. Buy and sell crypto currencies.
                    </p>
                    <p className="dark:text-gray-300 text-left mt-4 text-black md:w-9/12 w-11/12 text-base">
                        The web wallet for both beginners and experienced users.
                    </p>
                    <p className="dark:text-gray-300 text-left mt-4 text-black md:w-9/12 w-11/12 dark:font-thin italic">
                        *This app includes a visual walkthrough and other a few features to help you understand how to create a live crypto transaction*
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
                    <p className="dark:text-gray-300 text-left mt-8 text-black md:w-9/12 w-11/12 dark:font-thin italic">
                        *Use of the navigation bar functions in the top right to refresh the gas price or wallet balance*
                    </p>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10 pl-4">
                    <div className="w-20 h-20 rounded-full border-2 border-black flex justify-center items-center dark:border-gray-300 mb-5">
                        <SiEthereum fontSize={41} className="text-black dark:text-gray-300" />
                    </div>
                    <div className="flex flex-col flex-1 items-center justify-start w-full" id="seven">
                        <p className="text-black text-sm dark:text-gray-300">
                            Address:  {address}
                        </p>
                        <p className="text-black text-sm dark:text-gray-300">
                            Balance: <b>{balance}</b>
                        </p>
                        <p className="text-black text-sm dark:text-gray-300 mb-5" id="eight">
                            Chain ID: {chainId}
                        </p>
                    </div>
                    <div className="text-black p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism" id="nine">
                        <Input placeholder="Recipient Address" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-grey-400 my-2"/>
                        {isLoading
                            ? <Loading />
                            : (
                            <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white font-semibold w-full mt-2 p-2 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                Send
                            </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;