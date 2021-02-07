import Web3 from "web3";

let web3;
const ethereum = window.ethereum;

if (ethereum) {
  web3 = window.web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.log(error);
  }
} else if (window.web3) {
  web3 = window.web3 = new Web3(web3.currentProvider);
  // Acccounts always exposed
} else {
  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

export default web3;
