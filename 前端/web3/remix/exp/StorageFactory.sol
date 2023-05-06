// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public ssList; 
    function createSimpleStorage()  public {
        SimpleStorage ss = new SimpleStorage();
        ssList.push(ss);
    }

    function sfStore(uint256 _idx, uint256 _n) public {
        SimpleStorage instance = ssList[_idx];
        instance.save(_n);
    }

    function sfGet(uint256 _idx) public view returns (uint256) {
        SimpleStorage instance = ssList[_idx];
        return instance.getNum();
    }
}