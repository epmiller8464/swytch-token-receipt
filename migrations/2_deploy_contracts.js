let SwytchReceiptToken = artifacts.require("./SwytchReceiptToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SwytchReceiptToken);
};
