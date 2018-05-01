'use strict'
let Web3 = require('web3')
let provider = new Web3.providers.HttpProvider('http://localhost:8545')
let contract = require('truffle-contract')
let abi = require('./build/contracts/SwytchReceiptToken')

const initialize = () => {
  let web3
  // let web3 = this.web3
  if (typeof web3 !== 'undefined') {
    // then call functions to determine account and balance
    web3 = new Web3(web3.currentProvider)
  } else {
    // replace provider with URL of your choice
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  if (typeof web3.currentProvider.sendAsync !== 'function') {
    web3.currentProvider.sendAsync = function () {
      return web3.currentProvider.send.apply(web3.currentProvider, arguments)
    }
  }
  return web3
}
let web3 = initialize()

function loadContract (networkId) {
  return new Promise(async (resolve, reject) => {
    // initialize()
    try {
      // let artifacts = await loadContractArtifacts(`${name}.json`, path)
      // contractAbstraction = JSON.parse(abi)
      let SwytchReceiptToken = contract(abi)
      SwytchReceiptToken.setProvider(web3.currentProvider)
      let _contract = null
      if (abi.networks[networkId]) {
        let address = abi.networks[networkId].address
        _contract = await SwytchReceiptToken.at(address)
      }
      // _contract = await SwytchContract.at('0x9f545025c6fc23811a4bc70e95b5eb577145c6e2')

      return resolve(_contract)
    } catch (error) {
      return reject(error)
    }
  })
}

function loadFile (fileName) {
  // initialize()
  let file = require(fileName)
  let records = []
  file.forEach((record) => {
    if (web3.utils.isAddress(record.wallet)) {
      let tokens = web3.utils.toWei(record.tokens)
      records.push({tokens: tokens, address: record.wallet})
    }
  })
  return records
}

function transfer (networkId = '3', fileName) {
  return new Promise((resolve, reject) => {

    let transfers = []
    let records = loadFile(fileName)
    if (!records) {
      return reject(new Error('No records found...'))
    }
    loadContract(networkId).then(async (_contract) => {
      // console.log(_contract)
      let owner = await _contract.owner()
      // let r = await web3.eth.personal.unlockAccount(owner, 'BamRn3434*$84')
      // console.log(r)
      // let tx1 = await _contract.disableTransfers(false)
      // tx = await _contract.balanceOf(owner)

      for (let i = 0; i < records.length; i++) {
        let record = records[0]
        if (record) {
          // console.log(`${record}`)
          // let tx = await _contract.balanceOf(owner)
          try {
            let tx = _contract.transfer(record.address, record.tokens, {from: owner})
            transfers.push(tx)
            // .then((tx) => {
          } catch (e) {
            console.error(e)
          }
          // })
        }
      }

      return resolve(transfers)
    })
  })
}

module.exports = {transfer, loadContract, loadFile}
