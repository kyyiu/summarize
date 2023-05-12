require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const MAINNET_URL = process.env.MAINNET_URL

module.exports = {
  solidity: {
    compilers: [{version: "0.8.18"},
    {version: "0.6.6"},
    {version: "0.6.12"}
    ,{version: "0.4.19"}]
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
        forking: {
            url: "https://rpc.ankr.com/eth",
        },
    },
    //  yarn hardhat run .\scripts\aaveBorrow.js --network sepolia
    sepolia: {
        url: SEPOLIA_RPC_URL,
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //   accounts: {
        //     mnemonic: MNEMONIC,
        //   },
        saveDeployments: true,
        chainId: 11155111,
    },
  },
  namedAccounts: {
      deployer: {
          default: 0, // here this will by default take the first account as deployer
          1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
  },
};
