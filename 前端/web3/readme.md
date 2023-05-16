# metamask

加密货币钱包

# 查看货币

https://etherscan.io/

# gas

```
在区块链的背景下，Gas指的是衡量在区块链网络上执行交易或执行智能合约所需计算工作量的度量单位。

当用户在区块链上发起交易或执行智能合约时，他们必须支付以Gas形式收取的费用。Gas费用支付给处理和验证交易或智能合约执行的矿工或验证器。

交易或智能合约执行所需的Gas数量取决于操作的复杂性和所需的计算资源。操作越复杂，所需的Gas费用就越高。

Gas费用通常用区块链网络的加密货币来表示。例如，在以太区块链上，Gas费用以以太币（ETH）的单位支付。Gas费用有助于激励矿工或验证器处理和验证交易和智能合约执行，以及防止垃圾邮件和滥用区块链网络。
```

# Gas Limit 和 Gas Price

```
当你发送以太交易时，你指定你的 gas 价格（通常以 Gwei 计价）和 gas 限制。您设置的天然气价格决定了您愿意为每单位天然气支付多少费用。气体限制决定了您愿意支付多少单位的气体。

注:
1eth = 10^9 Gwei = 1^18 wei
```

# remix ide

Remix IDE 用于各个知识水平的用户进行智能合约开发的整个过程。它无需设置，促进快速开发周期，并拥有一组丰富的插件和直观的 GUI。IDE 有两种形式（Web 应用程序或桌面应用程序）和作为 VSCode 扩展。

在线 ide: https://remix.ethereum.org/

文档: https://remix-ide.readthedocs.io/en/latest/

# vs 中开发 Solidity

```
添加插件 Solidity
ctrl + p
> settings
打开settings
或者在.vscode/settings.json中
{
    "[solidity]": {
        "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
    }
}
然后ctrl + p
> settings UI
搜索format on save
勾选上这样就可以在保存的时候格式化.sol文件内容

顺便添加默认的js格式化, 安装prettier插件
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

# node 编译 sol 文件

```
依赖solc
npm i solc
https://github.com/ethereum/solc-js

使用node_modules中的solcjs
node_modules/.bin/solcjs --bin --abi --include-path node_modules/ --base-path . SimpleStorage.sol
使用全局的solcjs
solcjs --bin --abi --include-path node_modules/ --base-path . SimpleStorage.sol
```

# 本地 blockChain

```
https://trufflesuite.com/ganache/
```

# ethers.js

```
文档: https://docs.ethers.org/v5/
```

# EIP

```
ethereum improvement proposal

以太坊改进提案
https://eips.ethereum.org/
```

# ERC (BEP,PEP)

```
Ethereum Request for comments

以太坊征求意见
```

# EIP ERC

```
类似es这种标准制定
```

# DEFI (Decentralized finance)

# AAVE

```
https://aave.com/
```

# NFT

```
Non-Fungible-Token
不可替代货币
可以理解为艺术品
```
