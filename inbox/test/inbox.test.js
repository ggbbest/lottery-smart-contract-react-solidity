const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";
const NEW_STRING = "Bye";

beforeEach(async () => {
  // Get a list of all accounts
  // ganache CLI automaticly creates a set of accounts for us
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  // The first argument of Contract constructor is the ABI (interface)
  // And we want to parse it to regular JS Object.
  // The solidity compilier makes it JSON representation.
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // Creating the corntact object
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING], // The initial message
    })
    // The send method triggers the comunication from web3 of to the network
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address); // Checking if inbox.options.address != undefine and != null
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    // When we send transaction thru the test, we usually dont assing it to any variable.
    await inbox.methods.setMessage(NEW_STRING).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_STRING);
  });
});
