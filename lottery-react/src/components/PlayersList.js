import React from "react";

const PlayersList = ({players}) => {
  const renderedList = players.map((player) => {
    return (
        <div className="item">
            <img className="ui avatar image" src="https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-512.png"/>
            <div className="content">
                <a className="header" href={`https://scope.klaytn.com/account/${player}`}>{player}</a> 
                <div className="description">Last seen watching just now...</div>
            </div>
        </div>
        
    );
  });

  return <div className="ui list">{renderedList}</div>;
};


export default PlayersList;