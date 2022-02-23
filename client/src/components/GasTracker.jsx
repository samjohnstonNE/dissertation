import React, { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const Num_Blocks = 20;

const [ blockHistory, setBlockHistory ] = useState(null);
const [ avgGas, setAvgGas ] = useState(null);
const [ avgBlockVolume, setAvgBlockVolume ] = useState(null);

const formatOutput = (data) => {

    let avgGasFee = 0;
    let avgFill = 0;
    let blocks = [];

    for (let i = 0; i < Num_Blocks; i++) {
        avgGasFee = avgGasFee + Number(data.reward[i][1]) + Number(data.baseFeePerGas[i])
        avgFill = avgFill + Math.round(data.gasUsedRatio[i] * 100);

    blocks.push({
        blockNumber: Number(data.oldestBlock) + i,
        reward: data.reward[i].map(r => Math.round(Number(r) / 10 ** 9)),
        baseFeePerGas: Math.round(Number(data.baseFeePerGas[i]) / 10 ** 9),
        gasUsedRatio: data.gasUsedRatio[i],
    })
    }

    avgGasFee = avgGasFee / Num_Blocks;
    avgGasFee = Math.round(avgGasFee /10 ** 9)

    avgFill = avgFill / Num_Blocks;
    return [blocks, avgGasFee, avgFill];
}

useEffect(() => {

    const web3 = createAlchemyWeb3(
        "wss://eth-mainnet.alchemyapi.io/v2/0QOVobtGtwMg0WcPs9uAksDfuF_mCXXd"
    );

    let subscription = web3.eth.subscribe('newBlockHeaders');

    subscription.on('data', () => {
        web3.eth.getFeeHistory(Num_Blocks, "latest", [25, 50, 75]).then((feeHistory) => {
            const [blocks, avgGasFee, avgFill] = formatOutput(feeHistory, Num_Blocks);
            setBlockHistory(blocks);
            setAvgGas(avgGasFee);
            setAvgBlockVolume(avgFill);
        });
    });

    return () => {
        web3.eth.clearSubscriptions();
    }
}, [])


const GasTracker = () => {

    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 bg-[#efeff4] dark:bg-[#0f172a]">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <h1>EIP-1559 Gas Tracker</h1>
                {!blockHistory && <p>Data is Loading...</p>}
                {avgGas && avgBlockVolume && <h3>
                    <div>
                        {avgGas} Gwei
                    </div>
                    |
                    <div>
                        {avgBlockVolume}% Volume
                    </div>

                </h3>}
                {blockHistory && <table>
                    <thead>
                    <tr>
                        <th>Block Number</th>
                        <th>Base Fee</th>
                        <th>Reward (25%)</th>
                        <th>Reward (50%)</th>
                        <th>Reward (75%)</th>
                        <th>Gas Used</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blockHistory.map(block => {
                    return (
                        <tr>
                            <td>{block.blockNumber}</td>
                            <td>{block.baseFeePerGas}</td>
                            <td>{block.reward[0]}</td>
                            <td>{block.reward[1]}</td>
                            <td>{block.reward[2]}</td>
                            <td>{block.gasUsedRatio}%</td>
                        </tr>
                    )
                    })}
                    </tbody>
                </table> }
            </div>
        </div>
    );
}

export default GasTracker;