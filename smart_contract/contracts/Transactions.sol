// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address to, uint amount, string message, uint256 timestamp);

    struct TransferStruct {
        address sender;
        address to;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;


    function addToBlockchain(address payable to, uint amount, string memory message) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, to, amount, message, block.timestamp));

        emit Transfer(msg.sender, to, amount, message, block.timestamp);
    }


    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;

    }


    function getTransactionCount() public view returns (uint256) {
        return transactionCount;

    }

}