const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
// The bytecode is what will actually go onto the blockchain to make the smart contract work.
// The interface will be the Javascript layer that acts like a human-friendly map of the bytecode. interface = ABI

const { interface, object: bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "girl pluck love flag unveil wave pool very expand wool reward vendor",
  "https://rinkeby.infura.io/v3/97db390fb48c4bcd8568ed76db6e1111"
);

const web3 = new Web3(provider);
// getAccounts() becouse the mnemonic can genarate many accounts.
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(interface)
    .deploy({ data: "0x" + bytecode }) // add 0x bytecode
    .send({ from: accounts[0] }); // remove 'gas'

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
};

deploy();
