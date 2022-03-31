//https://eth-ropsten.alchemyapi.io/v2/EaJ6yfDGJQkZniZ2ZVUVw6vrLIm0hDQ7
//7DJNBGU957QN9Q62ZP2X25539G4I1U9V45

require('@nomiclabs/hardhat-waffle') //plugin for smart contract test

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/EaJ6yfDGJQkZniZ2ZVUVw6vrLIm0hDQ7', //key from Alchemy for test network
      accounts: ['0f1789077f9da46ce7ffa73f0a036b4606e417bdf9f42fe30a68d6bbb6570fc2'] //my test wallet private key
    }
  }
}