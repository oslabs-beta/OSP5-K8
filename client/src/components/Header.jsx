import React, { useState } from "react";

const Header = (props) => {
  const { callback } = props;
  const [input, setInput] = useState("");

  const changeNow = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`http://${input}/metricserver/topNodes`);
      callback(input);
    } catch (err) {
      alert(
        `${input} is not a valid IP address. Please enter a valid IP address.`,
      );
    }
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
