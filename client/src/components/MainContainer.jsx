import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import NodeContainer from "./NodeContainer.jsx";
import PodContainer from "./PodContainer.jsx";
import ChartComponent from "./ClusterStructure.jsx";
import Welcome from "./Welcome.jsx";

const fetchNodes = async (ip) => {
  while (ip) {
    const response = await fetch(`http://${ip}/metricserver/topNodes`);
    console.log(response);
    // if (!response.ok) {
    //   throw new Error("Response from server not ok.");
    // }
    return response.json();
  }
};

const fetchPods = async (ip) => {
  while (ip) {
    const response = await fetch(`http://${ip}/metricserver/topPods`);
    // if (!response.ok) {
    //   throw new Error("Response from server not ok.");
    // }
    return response.json();
  }
};

const MainContainer = ({ activeButton, ip, setIP }) => {
  const {
    data: nodes,
    isLoading: isLoadingNodes,
    isError: isNodesError,
    error: nodesError,
  } = useQuery(["nodes", ip], () => fetchNodes(ip), {
    refetchInterval: 2000,
  });

  const {
    data: podsData,
    isLoading: isLoadingPods,
    isError: isPodsError,
    error: podsError,
  } = useQuery(["pods", ip], () => fetchPods(ip), {
    refetchInterval: 2000,
  });

  const Spinner = () => (
    <div className="ml-64 flex h-screen flex-col items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-nemo-orange-950 shadow-md"></div>
    </div>
  );

  const showLoadingSpinner =
    (activeButton === 2 && (isLoadingNodes || isLoadingPods)) ||
    (activeButton === 3 && isLoadingNodes) ||
    (activeButton === 4 && isLoadingPods);

  // if (isNodesError) console.error("Error fetching nodes:", nodesError);
  // if (isPodsError) console.error("Error fetching pods:", podsError);

  if (isNodesError) {
    console.error("Error fetching nodes:", nodesError);
    // alert("Please enter a valid IP address. Returning to Welcome screen...");
    return <Welcome />;
  }
  if (isPodsError) console.error("Error fetching pods:", podsError);

  return (
    <div>
      {!ip ? (
        <Welcome />
      ) : (
        <>
          {showLoadingSpinner ? (
            <Spinner />
          ) : (
            <div>
              {activeButton === 1 && <Welcome />}
              {activeButton === 2 && (
                <ChartComponent nodeData={nodes} podsData={podsData} />
              )}
              {activeButton === 3 && <NodeContainer nodeData={nodes} />}
              {activeButton === 4 && <PodContainer podsData={podsData} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MainContainer;
