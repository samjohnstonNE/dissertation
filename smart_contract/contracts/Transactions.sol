// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    event Transfer(address from, address to, uint amount, string message, uint256 timestamp);

    function addToBlockchain(address payable to, uint amount, string memory message) public {

        emit Transfer(msg.sender, to, amount, message, block.timestamp);
    }
}