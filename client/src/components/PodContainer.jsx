import React, { Component } from "react";
import PodCharts from "./PodCharts.jsx";
import PodTable from "./PodTable.jsx";

const PodContainer = ({ podsData }) => {
  const podsDataByMem = podsData.sort(
    (a, b) => b.MEMORY_USAGE_BYTES - a.MEMORY_USAGE_BYTES,
  );

  const memUsageArray = podsDataByMem.map(
    (pod) => pod.MEMORY_USAGE_BYTES / 1000000000,
  );

  const memPodNames = podsDataByMem.map((pod) => {
    return pod.POD_NAME;
  });

  const podsDataByCpu = podsData.sort(
    (a, b) => b.CPU_USAGE_CORES - a.CPU_USAGE_CORES,
  );

  const cpuUsageArray = podsDataByCpu.map((pod) => pod.CPU_USAGE_CORES);

  const cpuPodNames = podsDataByCpu.map((pod) => {
    return pod.POD_NAME;
  });

  return (
    <div>
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <PodCharts
          memUsages={memUsageArray}
          cpuUsages={cpuUsageArray}
          cpuPodNames={cpuPodNames}
          memPodNames={memPodNames}
        />
      </div>
      <div className="font-roboto flex flex-wrap items-start justify-around p-5">
        <PodTable podsData={podsData} />
      </div>
    </div>
  );
};

export default PodContainer;
