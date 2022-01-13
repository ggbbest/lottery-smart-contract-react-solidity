const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "girl pluck love flag unveil wave pool very expand wool reward vendor",
  "https://rinkeby.infura.io/v3/97db390fb48c4bcd8568ed76db6e1111"
);

const web3 = new Web3(provider);
// getAccounts() becouse the mnemonic can genarate many accounts.
const deploy = async () => {
  const accounts = await caver.klay.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new caver.klay.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
