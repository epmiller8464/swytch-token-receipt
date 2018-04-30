App = {
  web3Provider: null,
  contracts: {},
  walletData: {},
  init: function () {
    return App.initWeb3()
  },

  initWeb3: function () {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/QNptwaAQzyMw1uoXZoys')
      web3 = new Web3(App.web3Provider)
    }
    $.getJSON('rfs.json', function(data){
      App.walletData = data
      console.log(`Wallet data: ${data}`)
    })
    return App.initContract()
  },

  initContract: function () {
    $.getJSON('SwytchReceiptToken.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var SwytchReceiptTokenArtifact = data
      App.contracts.SwytchReceiptToken = TruffleContract(SwytchReceiptTokenArtifact)

      // Set the provider for our contract.
      App.contracts.SwytchReceiptToken.setProvider(App.web3Provider)
    })
    return App.bindEvents()
  },

  bindEvents: function () {
    $(document).on('click', '#viewBalance', App.viewBalance)
    $(document).on('click', '#acctButton', App.viewMainPage)
  },

  getBalance: function(account){
    var tutorialTokenInstance
    account = $.trim(account)
    console.log('account: '+ account)

    App.contracts.SwytchReceiptToken.deployed().then(function (instance) {
      tutorialTokenInstance = instance
      tutorialTokenInstance.balanceOf(account).then(async (bal) => {
        $('#BalDev').show()
        $('#BalAsk').hide()
        $('#acctButton').show()
        $('#Balance').text(bal.toString(10) / 10 ** 18)
        $('#Address').text(account)
        if (account in App.walletData){
          $('#AdditionalDetails').show()
          $('#Contribution').text(App.walletData[account]['Contribution'])
          $('#USD').text(App.walletData[account]['USD'])
        }
      }).catch(function (err) {
        alert(`Could not load details for address ${account}`)
        console.log(err.message)
      })
    }).catch(function (err) {
      alert(`Could not connect to ETH network`)
      console.log(err.message)
    })

  },
  viewBalance: function (event) {
      event.preventDefault()
    var account = $('#MyAddress').val()
      App.getBalance(account)
  },
  viewMainPage: function (event) {
    event.preventDefault()
    history.pushState(null, null, 'index.html')
    $('#BalDev').hide()
    $('#AdditionalDetails').hide()
    $('#acctButton').hide()
    $('#BalAsk').show()
    $('#Balance').text("")
    $('#Address').text("")
    $('#Contribution').text("")
    $('#USD').text("")
  }
}

$(function () {
  $(window).load(function () {
    App.init()
  })
})
