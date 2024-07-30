import React, { useState } from "react";

const Navbar = ({ setActiveButton, activeButton, ip }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const buttonLabels = ["ABOUT", "CLUSTER", "NODES", "PODS"];

  return (
    <div className="flex">
      <div className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-nemo-blue-900 pt-5">
        {ip &&
          buttonLabels.map((label, i) => (
            <button
              key={i}
              className={`transition-color font-roboto mb-1 w-full cursor-pointer px-4 py-2 text-left font-bold uppercase duration-300 ${
                activeButton === i + 1 || hoveredButton === i + 1
                  ? "bg-nemo-blue-950 text-nemo-orange-950"
                  : "bg-nemo-blue-900 text-nemo-blue-200"
              }`}
              onClick={() => handleButtonClick(i + 1)}
              onMouseEnter={() => setHoveredButton(i + 1)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
