// Allows us to use ES6 in our migrations and tests.
require('babel-register')
let HDWalletProvider = require('truffle-hdwallet-provider')
let mnemonic = '' // From MetaMask

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id,
      gas: '0x47c970',
      gasPrice: '0x12a05f200'
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/QNptwaAQzyMw1uoXZoys'),
      network_id: 3,
      gas: '0x47b760',
      gasPrice: '0x12a05f200'
    },
    mainnet: {
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/QNptwaAQzyMw1uoXZoys'),
      network_id: 1,
      gas: '0x7a1200',
      gasPrice: '0x12a05f200'
    }
  }
}
