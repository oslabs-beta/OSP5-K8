import React, { useState } from "react";

const Header = (props) => {
  const { callback } = props;
  const [input, setInput] = useState("");

  const changeNow = (event) => {
    // event.preventDefault();
    // console.log(event.target.value);
    // callback(event.target.value);
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(input);
  };

  return (
    <div className="p-2 text-right text-white">
      <form id="ipform" onSubmit={handleSubmit}>
        <label>
          IP:
          <input
            type="text"
            onChange={changeNow}
            className="text-black"
          ></input>
        </label>
      </form>
      <button type="submit" form="ipform" value="Submit">
        Submit
      </button>
    </div>
  );
};

export default Header;
