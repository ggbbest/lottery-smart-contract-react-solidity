import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import Form from "./Form";
import WinnerPick from "./WinnerPick";
import Content from "./Content";
import Loader from "./Loader";

const App = () => {
  const [managerAddress, setManagerAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractAccountBalance, setContractAccountBalance] = useState("");
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [messege, setMessege] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [lastWinner, setLastWinner] = useState("");
  const [players, setPlayers] = useState([]);


  const ethereum = window.ethereum;

  useEffect(() => {
    const func = async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const managerAddress = await lottery.methods.manager().call();
      const contractAccountBalance = await web3.eth.getBalance(
        lottery.options.address
      );

      const contractAccountBalanceInEther = web3.utils.fromWei(
        contractAccountBalance,
        "ether"
      );

      const contractAddress = await lottery.options.address;

      const numOfPlayers = await lottery.methods.getPlayerCount().call();
      const lastWinner = await lottery.methods.lastWinner().call();
      const players = await lottery.methods.getPlayers().call();

      setManagerAddress(managerAddress);
      setContractAddress(contractAddress);
      setContractAccountBalance(contractAccountBalanceInEther);
      setNumOfPlayers(numOfPlayers);
      setUserAddress(accounts[0]);
      setLastWinner(lastWinner);
      setPlayers(players)
      
    };

    func();
  }, []);

  useEffect(() => {
    const isAccountsChanged = async () => {
      ethereum.on("accountsChanged", async () => {
        const accounts = await web3.eth.getAccounts();

        setUserAddress(accounts[0]);
      });
    };
    isAccountsChanged();
  }, []);

  const onSubmit = async (term) => {
    setMessege("Waitin on transaction success...");

    try{
      await lottery.methods.enter().send({
        from: userAddress,
        value: web3.utils.toWei(term, "ether"),
      });
      setNumOfPlayers(parseInt(numOfPlayers)+1)
      const players = await lottery.methods.getPlayers().call();
      setPlayers(players)
      setContractAccountBalance(
        parseFloat(contractAccountBalance) + parseFloat(term)
      );
      setMessege("You have been entered!");
    }catch(error){
      setMessege("You Rejected!");
    }

  };

  const onClick = async () => {
    setMessege("Waitin on transaction success...");
    await lottery.methods.pickWinner().send({
      from: managerAddress,
    });
    setNumOfPlayers(0)
    setContractAccountBalance(0)
    setPlayers([])
    const lastWinner = await lottery.methods.lastWinner().call();
    setLastWinner(lastWinner);
    setMessege("Winner has been picked!");
  };

  const renderContent = () => {
    console.log(userAddress)
    if (userAddress) {
      return (
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <Content
                contractAddress={contractAddress}
                userAddress={userAddress}
                managerAddress={managerAddress}
                numOfPlayers={numOfPlayers}
                contractAccountBalance={contractAccountBalance}
                lastWinner={lastWinner}
                players={players}
              />
            </div>
            <div className="five wide column">
              <Form onSubmit={onSubmit} />
              {userAddress.toLowerCase() === managerAddress.toLowerCase() ? (
                <div>
                  <br/>
                  <WinnerPick onClick={onClick} />
                </div>
              ) : null}
            </div>
          </div>
          <h1>{messege}</h1>
        </div>
      );
    }
    return <Loader />;
  };

  return (
    <div style={{ marginTop: "50px" }} className="ui container">
      {renderContent()}
    </div>
  );
};

export default App;
