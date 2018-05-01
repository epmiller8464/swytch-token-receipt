// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      from: '0xe3ec0033d4d5359f0ba497b0f4053d3e496b3d07',
      host: '127.0.0.1',
      port: 8545,
      network_id: 3,
      gas: 4700000,
      gasPrice: 8000000000
    },
    live: {
      from: '0xabc09e2ac2c45387c6fbefb882ce21a6fbeb5667',
      host: '127.0.0.1',
      port: 8545,
      network_id: 1,
      gas: 5534126,
      gasPrice: 10000000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
