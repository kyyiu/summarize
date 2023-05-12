const { getNamedAccounts, ethers } = require("hardhat")
const AMOUNT = ethers.utils.parseEther("0.002")
async function getWeth() {
    // const { deployer } = await getNamedAccounts()
    // // call the "deposit" function on the weth contract
    // // IWeth address 0xf531B8F309Be94191af87605CfBf600D71C2cFe0
    // const iWeth = await ethers.getContractAt(
    //     "IWeth",
    //     "0xf531B8F309Be94191af87605CfBf600D71C2cFe0",
    //     deployer
    // )
    // // 再押AMOUNT这么多
    // const tx = await iWeth.deposit({value: AMOUNT})
    // await tx.wait(1)
    // const wethBalance = await iWeth.balanceOf(deployer)
    // console.log(`得到${wethBalance.toString()}`)
}

module.exports = { getWeth }