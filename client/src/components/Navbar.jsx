import React, { useContext, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import MetaMask from "../../images/metamask-fox.svg";
import MathWalletDark from "../../images/Mathwallet_Logo_Icon_White.svg"
import EtherScanDark from "../../images/etherscan-logo-light-circle.png";
import { TransactionContext } from "../context/TransactionContext";
import { tooltipStyle } from "../styles/styles";


const Navbar = () => {

    const [ toggleMenu, setToggleMenu ] = useState(false);

    const { connectWallet, currentAccount, gas, gasO, supply, eth, refresh } = useContext(TransactionContext);

    const toggleSteps = () => {
        location.reload();
    };

    return(

        <nav className="w-full flex md:justify-end justify-between items-center p-4 bg-[#282c34] dark:bg-[#0f172a] border-b border-gray-400 border-opacity-20">
            <div>
                <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" data-tooltip-target="tooltip-dark">
                    <img src={MetaMask} alt="MetaMask" className="w-12 cursor-pointer" id="one" />
                </a>
                <div id="tooltip-dark" role="tooltip"
                     className={tooltipStyle}>
                    MetaMask
                    <div className="tooltip-arrow" data-popper-arrow />
                </div>
            </div>
            <div className="pl-4">
                <a href="https://mathwallet.org/en-us/" target="_blank" rel="noopener noreferrer" data-tooltip-target="tooltip-dark2">
                    <img src={MathWalletDark} alt="MathWallet" className="w-12 cursor-pointer" id="two" />
                </a>
                <div id="tooltip-dark2" role="tooltip"
                     className={tooltipStyle}>
                    MathWallet
                    <div className="tooltip-arrow" data-popper-arrow />
                </div>
            </div>
                <p className="md:flex hidden text-white pl-4">
                    |
                </p>
            <div className="pl-4">
                <a href="https://etherscan.io/" target="_blank" rel="noopener noreferrer" data-tooltip-target="tooltip-dark3">
                    <img src={EtherScanDark} alt="EtherScan" className="w-12 cursor-pointer" id="three" />
                </a>
                <div id="tooltip-dark3" role="tooltip"
                     className={tooltipStyle}>
                    Etherscan.io
                    <div className="tooltip-arrow" data-popper-arrow />
                </div>
            </div>

            <div className="pl-4">
                <p className="dark:text-gray-300 text-xs text-left text-white text-base mt-0.5">{'ETH: ' + eth}</p>
                <p className="dark:text-gray-300 text-xs text-left text-white text-base">{'Current Gas Price: ' + gasO}</p>
                <p className="dark:text-gray-300 text-xs text-left text-white text-base mt-0.5">{'Test Network Gas Price: ' + gas}</p>
                <p className="dark:text-gray-300 text-xs text-left text-white text-base mt-0.5">{'Current Supply: ' + supply}</p>
            </div>

            <section className="md:flex-[1.0] pl-4">
            </section>

            <ul className="float-right p-2 text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                <li className="float-right p-2 text-white md:flex hidden list-none flex-row justify-between items-center flex-initial" id="four">
                    <button onClick={refresh} className="pl-5">
                        Refresh Data
                    </button>
                    <button onClick={() => toggleSteps(true)} className="pl-5">
                        Tutorial
                    </button>
                </li>
                <li className="float-right p-2 text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                    <SiEthereum fontSize={21} className='text-white' />
                </li>
                {!currentAccount && (
                <li className="bg-[#2952e3] py-2 px-7 mx-3 rounded-full cursor-pointer hover:bg-[#2546bd] dark:text-white">
                    <button
                        type="button"
                        onClick={connectWallet}
                        id="five"
                    >
                        <p className="font-semibold">Connect</p>
                    </button>
                </li>
                )}
            </ul>
            <div className="flex relative float-right">
            {toggleMenu
                ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
            }
                {toggleMenu && (
                    <ul
                    className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        <button onClick={refresh} className="pl-5">
                            Refresh Data
                        </button>
                        <button onClick={() => toggleSteps(true)} className="pl-4">
                            Tutorial
                        </button>
                        <li className="bg-[#2952e3] py-2 px-7 mx-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                            Login
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;