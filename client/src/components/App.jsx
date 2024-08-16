import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./NavBar.jsx";
import MainContainer from "./MainContainer.jsx";
import Header from "./Header.jsx";
// import cluster1 from "../../../myDotEnv.js";

const queryClient = new QueryClient();

const App = () => {
  const [activeButton, setActiveButton] = useState(2);
  const [ip, setIP] = useState("");
  // const [ip, setIP] = useState(cluster1);

  const changeIP = (ipString) => {
    setIP(ipString);
  };

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* brough following div inside QueryClientProvider */}
      <div className="flex min-h-full flex-row border-4 border-lime-500 bg-nemo-blue-950">
        {/* <div>
        <Header callback={changeIP} />
        </div>
        <div className="flex">
        <Navbar
          setActiveButton={setActiveButton}
          activeButton={activeButton}
          ip={ip}
        />
        <MainContainer activeButton={activeButton} ip={ip} />
        </div> */}
        <Navbar
          setActiveButton={setActiveButton}
          activeButton={activeButton}
          ip={ip}
        />

        <div className="flex min-h-screen w-screen flex-col overflow-hidden border-2 border-yellow-500">
          <Header callback={changeIP} />
          <MainContainer activeButton={activeButton} ip={ip} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
