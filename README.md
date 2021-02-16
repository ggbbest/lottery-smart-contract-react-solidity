# ethereum-lottery-smart-contract
Ethereum / Solidity Smart Contract BoilerPlate

## App Description
🔹 The contract allows players to buy tickets and sign up for a lottery 💰.
The addresses of the participants' wallets will appear in the list on the screen and clicking on any address will take the user to the account information on the etherscan website.

🔹 If the Contract manager is logged in from the current account, he will be able to start the lottery by pressing the button "Pick a Winner" button. If the manager will click on the button, one participant from the list will win the amount of #ethereum and a transfer will be made to him from the smart account to the address of his wallet.

### Steps:
Sign up for [https://metamask.io/](https://metamask.io/) to get an Ethereum wallet. Make sure to save your 12 word wallet mnemonic somewhere safe.

Visit [https://www.rinkeby.io/#faucet](https://www.rinkeby.io/#faucet) to get some test Ether coins on Rinkeby test network.

Sign up for a free account on [https://infura.io/](https://infura.io/) to get an Ethereum client provider. Full Documentation can be found at [https://infura.io/docs](https://infura.io/docs)

Replace `providerURL` and `mnemonic` constants in `deploy.js` file with yours.

```javascript
const providerURL = "https://rinkeby.infura.io/..."; // replace with your Rinkeby test network URL
const mnemonic = "in crypto we trust ..."; // replace with your 12 word wallet mnemonic.
```

Install packages
```Bash
npm install
```

Run tests:
```Bash
npm run tests
```

Deploy your smart contract to Ethereum Rinkeby network:
```Bash
npm run deploy
```

Visit [https://www.rinkeby.io/#explorer](https://www.rinkeby.io/#explorer) to find your deployed
smart contract.
