import React from "react";
import PlayersList from './PlayersList'

const Content = (props) => {
  const {
    contractAddress,
    userAddress,
    managerAddress,
    numOfPlayers,
    contractAccountBalance,
    lastWinner,
    players
  } = props;

  return (
    <div>
      <h1 className="ui header">Klay Lotto</h1>
      <h2 className="line">{`
                          입력 최소금액은 0.1 klay. 
                          적립된 klay는 무작위로 선택된 당첨자의 계좌로 들어갑니다.`}</h2>
      <div className="paragraph">
        <div className="line">
          {`The contract address is: `}
          <a href={`https://scope.klaytn.com/account/${contractAddress}`}>
            {contractAddress}
          </a>
        </div>
        <div className="line">{`Diployed to: klaytn Network`}</div>
        <div className="line">
          {`Your address is: `}
          <a href={`https://scope.klaytn.com/account/${userAddress}`}>
            {userAddress}
          </a>
        </div>
        <div className="line">
          {`This contract is managed by: `}
          {managerAddress === userAddress ? (
            "You!"
          ) : (
            <a href={`https://scope.klaytn.com/account/${managerAddress}`}>
              {managerAddress}
            </a>
          )}
        </div>
        <div className="line">
          There are currently {numOfPlayers} players entered.
        </div>
        <div className="line">
          competiong to win {contractAccountBalance} klay!
        </div>
        <div className="line">
        {`Last Winner: `}
          <a href={`https://scope.klaytn.com/account/${lastWinner}`}>
            {lastWinner}
          </a>
        </div>
        <div className="line">
          <br/>
          {players.length > 0 ? 'Player list:' : null}
        </div>
            <PlayersList players={players}/>
      </div>
    </div>
  );
};

export default Content;
