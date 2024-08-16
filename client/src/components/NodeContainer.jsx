import React from "react";
import NodeCharts from "./NodeCharts.jsx";
import NodeTable from "./NodeTable.jsx";

const NodeContainer = ({ nodeData }) => {
  const nodeDataByMem = nodeData.sort(
    (a, b) => b.MEMORY_REQUEST_TOTAL - a.MEMORY_REQUEST_TOTAL,
  );

  const memUsageArray = nodeDataByMem.map(
    (node) => node.MEMORY_REQUEST_TOTAL / 1000000000,
  );

  const memNodeNames = nodeDataByMem.map((node) => {
    return node.NODE_NAME;
  });

  const nodeDataByCpu = nodeData.sort(
    (a, b) => b.CPU_REQUEST_TOTAL - a.CPU_REQUEST_TOTAL,
  );

  const cpuUsageArray = nodeDataByCpu.map((node) => node.CPU_REQUEST_TOTAL);

  const cpuNodeNames = nodeDataByCpu.map((node) => {
    return node.NODE_NAME;
  });

  return (
    <div>
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <NodeCharts
          memUsages={memUsageArray}
          cpuUsages={cpuUsageArray}
          cpuNodeNames={cpuNodeNames}
          memNodeNames={memNodeNames}
        />
      </div>
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <NodeTable nodeData={nodeData} />
      </div>
    </div>
  );
};

export default NodeContainer;
