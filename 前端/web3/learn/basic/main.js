const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("区块链url");
  const wallt = new ethers.Wallet("私钥", provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallt);
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  //   console.log(contract);
  //   获取区块的东西
  const currentNum = await contract.getNum();
  console.log(currentNum.toString());
  const transactionResponse = await contract.save("123456"); // 使用字符串也可以赋值给数值类型，因为js中对大数处理有问题
  const res = await transactionResponse.wait(1);
  const newNum = await contract.getNum();
  console.log(newNum.toString());
}
main();
