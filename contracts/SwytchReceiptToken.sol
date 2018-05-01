pragma solidity ^0.4.21;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract SwytchReceiptToken is Ownable, StandardToken {

    string public constant name = "Receipt From Swytch"; // solium-disable-line uppercase
    string public constant symbol = "RFS"; // solium-disable-line uppercase
    uint8 public constant decimals = 18; // solium-disable-line uppercase

    uint256 public constant INITIAL_SUPPLY = 28575978 * (10 ** uint256(decimals));

    bool public transfersEnabled = false;

    // allows execution only when transfers aren't disabled
    modifier transfersAllowed {
        assert(transfersEnabled);
        _;
    }

    /**
       * @dev Constructor that gives msg.sender all of existing tokens.
     */
    function SwytchReceiptToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);
    }

    function transfer(address _to, uint256 _value) public transfersAllowed onlyOwner returns (bool) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public transfersAllowed returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }

    function disableTransfers(bool _disable) public onlyOwner {
        transfersEnabled = !_disable;
    }
}

