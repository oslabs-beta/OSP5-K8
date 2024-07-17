import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import NodeContainer from "./NodeContainer.jsx";
import PodContainer from "./PodContainer.jsx";
import ChartComponent from "./ClusterStructure.jsx";
import Welcome from "./Welcome.jsx";

const fetchNodes = async () => {
  //update fetch endpoint to be flexible via env variables
  const response = await fetch(`http://${TO_BE_ADDED}/metricserver/topNodes`);
  if (!response.ok) {
    throw new Error("Response from server not ok.");
  }
  return response.json();
};

const fetchPods = async () => {
  //update fetch endpoint to be flexible via env variables
  const response = await fetch(`http://${TO_BE_ADDED}/metricserver/topPods`);
  if (!response.ok) {
    throw new Error("Response from server not ok.");
  }
  return response.json();
};

const MainContainer = ({ activeButton }) => {
  const {
    data: nodes,
    isLoading: isLoadingNodes,
    isError: isNodesError,
    error: nodesError,
  } = useQuery("nodes", fetchNodes, {
    refetchInterval: 2000,
  });

  const {
    data: podsData,
    isLoading: isLoadingPods,
    isError: isPodsError,
    error: podsError,
  } = useQuery("pods", fetchPods, {
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

  if (isNodesError) console.error("Error fetching nodes:", nodesError);
  if (isPodsError) console.error("Error fetching pods:", podsError);

  return (
    <div>
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
    </div>
  );
};

export default MainContainer;
