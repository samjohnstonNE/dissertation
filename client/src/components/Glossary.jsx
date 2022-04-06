import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { tooltipStyle } from "../styles/styles";

/**
 * Glossary
 *
 * This component renders the technical terms with explanations
 *
 * This component is called in the Main.jsx file and renders the
 * technical terms with an information icon next to each item.
 * The information icon can be hovered over to reveal a tooltip
 * with the explanation for each term.
 * The explanations are taken from the Etherscan transactions
 * webpage as they provide an accurate description yet not
 * too complicated for beginner users.
 *
 * @author Sam Johnston
 * @id W17004648
 * @github https://github.com/SamwiseNE/dissertation
 */

const Glossary = () => {

    return (
        <div>
            <div className="grid sm:grid-cols-4 grid-cols-3 w-full mt-10">
                <p className="dark:text-gray-300 text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark4"/>
                    <div id="tooltip-dark4" role="tooltip"
                         className={tooltipStyle}>
                        The Chain ID is an value used to identify which network the transaction was sent on. (1=Mainnet, 3=Ropsten, 4=Rinkeby, 5=Goerli, 42=Kovan)
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Chain ID:
                </p>
                <p className="dark:text-gray-300 text-left text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark5"/>
                    <div id="tooltip-dark5" role="tooltip"
                         className={tooltipStyle}>
                        Number of the block in which the transaction is recorded.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Block Number:
                </p>
                <p className="dark:text-gray-300 text-left text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark6"/>
                    <div id="tooltip-dark6" role="tooltip"
                         className={tooltipStyle}>
                        A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    TxID:
                </p>
                <p className="dark:text-gray-300 text-left  text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark7"/>
                    <div id="tooltip-dark7" role="tooltip"
                         className={tooltipStyle}>
                        The sending party of the transaction.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    From:
                </p>
                <p className="dark:text-gray-300 text-left  text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark8"/>
                    <div id="tooltip-dark8" role="tooltip"
                         className={tooltipStyle}>
                        The receiving party of the transaction (could be a contract address).
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    To:
                </p>
                <p className="dark:text-gray-300 text-left  text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark9"/>
                    <div id="tooltip-dark9" role="tooltip"
                         className={tooltipStyle}>
                        The price offered to the miner to purchase this amount of GAS （per GAS）.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Gas Price:
                </p>
                <p className="dark:text-gray-300 text-left  text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark10"/>
                    <div id="tooltip-dark10" role="tooltip"
                         className={tooltipStyle}>
                        The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Value:
                </p>
                <p className="dark:text-gray-300 text-left  text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark11"/>
                    <div id="tooltip-dark11" role="tooltip"
                         className={tooltipStyle}>
                        Additional data included for this transaction. Commonly used as part of contract interaction or as a message sent to the recipient.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Input:
                </p>
                <p className="dark:text-gray-300 text-left text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark12"/>
                    <div id="tooltip-dark12" role="tooltip"
                         className={tooltipStyle}>
                        Block confirmations indicate how many blocks have been added since the transaction was mined.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Confirmations:
                </p>
                <p className="dark:text-gray-300 text-left  text-black dark:font-thin italic">
                    <AiOutlineInfoCircle fontSize={18} className='text-black float-right dark:text-gray-300 mx-2 mt-1 cursor-pointer' data-tooltip-target="tooltip-dark13"/>
                    <div id="tooltip-dark13" role="tooltip"
                         className={tooltipStyle}>
                        The date and time at which a transaction is mined.
                        <div className="tooltip-arrow" data-popper-arrow />
                    </div>
                    Timestamp:
                </p>
            </div>
        </div>
    );
}

export default Glossary;