const { createAlchemyWeb3 } = require ("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(
    "wss://eth-mainnet.alchemyapi.io/v2/0QOVobtGtwMg0WcPs9uAksDfuF_mCXXd"
)

const formatOutput = (data, numBlocks) => {

    let blocks = []
    for (let i=0; i<numBlocks; i++) {
        blocks.push({
            blockNumber: Number(data.oldestBlock) + i,
            reward: data.reward[i].map(r => Math.round(Number(r) / 10 ** 9)),
            baseFeePerGas: Math.round(Number(data.baseFeePerGas[i]) / 10 ** 9),
            gasUsedRatio: data.gasUsedRatio[i],
        })
    }
    return blocks;
}

const numBlocks = 5;

let subscription = web3.eth.subscribe('newBlockHeaders');

subscription.on("data", () => {
    web3.eth.getFeeHistory(numBlocks, "latest", [25, 50, 75]).then((data) => {
        const blocks = formatOutput(data,numBlocks);
        console.log(blocks);
    });
});