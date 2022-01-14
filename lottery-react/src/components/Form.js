import React, { useState } from "react";

const Form = (props) => {
  const [term, setTerm] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);



  const onFormSubmit = (event) => {
    event.preventDefault();
    if(term !== '0.1')
      setIsCorrect(false)
    else{
      setIsCorrect(true)
      props.onSubmit(term);
      setTerm('');
    }
  };

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <form className="ui fuild form" onSubmit={onFormSubmit}>
        <h4>최소 0.1 klay 이상가능</h4>
        <div className="field">
          <label>구매할 klay입력: </label>
          <input className="ui input" value={term} onChange={onInputChange} />
          {!isCorrect && <div class="ui pointing red basic label">1 Ticket = 0.1 klay</div>}
        </div>
        <button className="ui primary button">구매</button>
      </form>
    </div>
  );
};

export default Form;
