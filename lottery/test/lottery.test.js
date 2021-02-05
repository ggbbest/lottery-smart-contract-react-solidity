const assert = require("assert");
// ganache is going to be our local test network that only
// gets created when we start running our tests by
// just requiring it into this file.
const ganache = require("ganache-cli");
const Web3 = require("web3");
// the provider is what allows us to connect to any given network.
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

const interface = abi;
const bytecode = evm.bytecode.object;

let lottery;
let accounts;

beforeEach(async () => {
  // Get a list of all accounts
  // ganache CLI automaticly creates a set of accounts for us
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  // The first argument of Contract constructor is the ABI (interface)
  // And we want to parse it to regular JS Object.
  // The solidity compilier makes it JSON representation.
  lottery = await new web3.eth.Contract(interface)
    // Creating the corntact object
    .deploy({
      data: bytecode,
    })
    // The send method triggers the comunication from web3 of to the network
    .send({ from: accounts[0], gas: "1000000" });
  //console.log(lottery);
});

describe("Lottery Contract", () => {
  it("deploys a contract", () => {
    assert.ok(lottery._address);
  });

  it("allows one account to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("allows multipy accounts to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("requires a minimum amount of ether to enter", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        // its 200 wei because we dont convert it to etr
        value: 200,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("only manager can call pickWinner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1], // this is not the manager of the lottery
      });
      assert(false); // if we get to this line of code, automaticly fail the test.
    } catch (err) {
      assert(err);
    }
  });
  // end to end test
  it("sends money to the winner and resets the players array", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    // getBalance() takes address and returns the amout of ether assings to this address (working also for contracts)
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    // the difference between initialBalance to finalBalance will be less then 2 ether
    // because of the gas
    const defference = finalBalance - initialBalance;
    assert(defference > web3.utils.toWei("1.8", "ether"));

    // here we want to be sure that the amount of the contract = 0
    // After the money is sent to the winner's account
    const lotteryBalance = await web3.eth.getBalance(lottery._address);
    assert.equal(lotteryBalance, 0);

    // Here we check that the array is emptied after the lottery
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });
    assert.equal(players.length, 0);
  });
});
