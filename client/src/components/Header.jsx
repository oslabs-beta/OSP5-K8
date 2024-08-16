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
    <div className="font-roboto flex items-center justify-end p-2 text-nemo-blue-200">
      <form id="ipform" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={changeNow}
            placeholder="888.888.888.888"
            className="m-1 w-36 bg-nemo-orange-100 pl-3 text-nemo-blue-800"
          ></input>
        </label>
      </form>
      <button
        className="ml-2 flex overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2"
        type="submit"
        form="ipform"
        value="Submit"
      >
        IP Submit
      </button>
    </div>
  );
};

export default Header;
