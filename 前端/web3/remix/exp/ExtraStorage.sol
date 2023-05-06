// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./SimpleStorage.sol";

contract ExtraStorage  is SimpleStorage{
      function save(uint256 _n) public override {
          num = _n+5;
      }
}