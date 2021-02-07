import React from "react";

const WinnerPick = (props) => {
  const onButtonClick = (event) => {
    props.onClick();
  };

  return (
    <div>
      <h4>Ready to pick a winner?</h4>
      <button className="ui secondary button" onClick={onButtonClick}>
        <i className="money bill alternate outline icon"></i>
        Pick a winner
      </button>
    </div>
  );
};

export default WinnerPick;
