let fs = require('fs')

var SwytchReceiptToken = artifacts.require('./SwytchReceiptToken.sol')

contract('SwytchReceiptToken', function (accounts) {
  it('should put 10000 MetaCoin in the first account', function () {
    return SwytchReceiptToken.deployed().then(function (instance) {
      console.log(instance)
      return instance.balanceOf.call(accounts[1])
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 0, '10000 wasn\'t in the first account')
    })
  })

  it('test balance', function () {
    return SwytchReceiptToken.deployed().then(function (instance) {
      console.log(instance)
      return instance.totalSupply.call()
    }).then(function (balance) {
      assert.equal(balance.toNumber(), 0, '10000 wasn\'t in the first account')
    })
  })
})
