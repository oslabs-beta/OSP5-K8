import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./NavBar.jsx";
import MainContainer from "./MainContainer.jsx";
import Header from "./Header.jsx";

const queryClient = new QueryClient();

const App = () => {
  const [activeButton, setActiveButton] = useState(2);
  const [ip, setIP] = useState("");
  // const [binary, setBinary] = useState(0);

  const changeIP = (ipString) => {
    setIP(ipString);
  };

  // the sole purpose of this function is to cause a rerender if the switch is flipped
  // const flipSwitch = ()=>{
  //   binary === 0 ? setBinary(1) : setBinary(0)
  // }

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={{ backgroundColor: "#081020", minHeight: "100vh" }}>
      <QueryClientProvider client={queryClient}>
        <Header callback={changeIP} />
        <Navbar
          setActiveButton={setActiveButton}
          activeButton={activeButton}
          ip={ip}
        />
        <MainContainer activeButton={activeButton} ip={ip} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
