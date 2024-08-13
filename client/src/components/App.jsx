import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./NavBar.jsx";
import MainContainer from "./MainContainer.jsx";
import Header from "./Header.jsx";

const queryClient = new QueryClient();

const App = () => {
  const [activeButton, setActiveButton] = useState(2);
  const [ip, setIP] = useState("34.44.251.182");

  const changeIP = (ipString) => {
    setIP(ipString);
  };

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div className="min-h-screen bg-nemo-blue-950">
      <QueryClientProvider client={queryClient}>
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

        <div className="flex flex-col border-2 border-yellow-500">
          <Header callback={changeIP} />

          <MainContainer activeButton={activeButton} ip={ip} />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default App;
