// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using  PriceConverter for uint256;
    uint256 minUSD = 50 * 1e18;
    address[] public  funders;
    mapping (address => uint256) public map;

    address public  owner;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable  {
        // payable 关键字可以让我们使用DEPLOY的相关信息
        // 1e18 == 1*10**18 == 1eth
        // 如果msg.value > 1e18为false，则处理Didnt send enough
        require(msg.value.getConvertRate() >= minUSD, "Didnt send enough");
        funders.push(msg.sender);
        map[msg.sender] += msg.value;
    }

    function withDraw() public onlyOwner {
        for (uint idx = 0; idx < funders.length; idx++) {
            address funder = funders[idx];
            map[funder] = 0;
        }

        // reset array
        funders = new address[](0);

        // transfer
        payable(msg.sender).transfer(address(this).balance);
        // send
        bool isSucc = payable(msg.sender).send(address(this).balance);
        require(isSucc, "send Error");
        // call
        (bool callSucc,) = payable (msg.sender).call{value: address(this).balance}("");
        require(callSucc, "call Err");
    }

    modifier onlyOwner {
        require(owner == msg.sender, "sender is not owner");
        _; // 下划线代表使用onlyOwner标识的函数中的内容
    }
}  