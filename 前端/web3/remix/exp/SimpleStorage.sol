// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256 num;
    mapping (string => uint256) public  map;

    struct P {
        string name;
        uint256 n;
    }

    P[] public  pList;
    function save(uint256 _n) public virtual   {
        num = _n;
    }

    function getNum() public view returns (uint256) {
        return  num;
    }
    function add(string memory _name, uint256 _n) public  {
        pList.push(P({name: _name, n: _n}));
    }
}