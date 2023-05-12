# 使用 hardhat 初始化

```
npm i hardhat -D
cmd
.\node_modules\.bin\hardhat
这里使用 Create an empty hardhat.config.js 方案
```

# 更多依赖

```
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv
```

# 编译 sol

```
yarn add --dev hardhat-shorthand
.\node_modules\.bin\hh compile
```

npm ERR! ERESOLVE could not resolve
方案
npm config set legacy-peer-deps true

# aave 文档 v2

https://docs.aave.com/developers/v/2.0/

# ILendingPool

```
yarn add --dev @aave/protocol-v2
```

# 问题

```
遇到failed to get chainId, falling back on net_version...
或者Code exception等会有很多是因为网络问题
尝试
https://www.ankr.com/rpc/eth/
https://www.infura.io/zh
https://www.alchemy.com/
等地方获取mainnet再试
```
