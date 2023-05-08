# metamask

加密货币钱包

# 查看货币

https://etherscan.io/

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
