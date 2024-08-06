import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ForceDirectedGraph = ({ podsData, nodeData, ip }) => {
  // Create a reference to the SVG element
  const svgRef = useRef();

  // Keep track of whether the component has been initialized
  const initializedRef = useRef(false);

  useEffect(() => {
    // Check if the component is not yet initialized and if both nodeData and podsData arrays have elements
    if (!initializedRef.current && nodeData.length > 0 && podsData.length > 0) {
      initializedRef.current = true;

      // Calculate total CPU and memory usage for normalization
      const totalUsage = {
        totalCpu: podsData.reduce(
          (total, pod) => total + parseFloat(pod.CPU_USAGE_CORES),
          0,
        ),
        totalMemory: podsData.reduce(
          (total, pod) => total + parseFloat(pod.MEMORY_USAGE_BYTES),
          0,
        ),
      };

      // Combine nodes and podsData into a single array for nodes
      const nodes = [
        { id: `Master Node: ${ip}` },
        ...nodeData.map((node) => ({
          id: node.NODE_NAME,
          cpuPercentage: (
            (parseFloat(node.CPU_REQUEST_TOTAL) / node.CPU_CAPACITY) *
            100
          ).toFixed(3),
          memoryPercentage: (
            (parseFloat(node.MEMORY_REQUEST_TOTAL / 1000000000) /
              node.MEMORY_CAPACITY /
              1000000000) *
            100
          ).toFixed(3),
        })),
        ...podsData.map((pod) => ({
          id: pod.POD_NAME,
          isPod: true,
          nodeName: pod.NODE_NAME,
          cpuPercentage: (
            (parseFloat(pod.CPU_USAGE_CORES) / totalUsage.totalCpu) *
            100
          ).toFixed(3),
          memoryPercentage: (
            (parseFloat(pod.MEMORY_USAGE_BYTES) / totalUsage.totalMemory) *
            100
          ).toFixed(3),
        })),
      ];

      // Generate links connecting master node to all nodes
      const links = [
        ...nodeData.map((node) => ({
          source: `Master Node: ${ip}`,
          target: node.NODE_NAME,
          distance: 30,
        })),
        ...podsData.map((pod) => ({
          source: pod.POD_NAME,
          target: pod.NODE_NAME,
          distance: 80,
        })),
      ];

      // D3 force simulation setup
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance((d) => d.distance),
        )
        .force("charge", d3.forceManyBody().strength(-350))
        .force(
          "center",
          d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2),
        );

      // Create SVG element
      const svg = d3
        .select(svgRef.current)
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

      // Draw links
      const link = svg
        .append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1);

      // Draw nodes
      const node = svg
        .append("g")
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node");

      // Differentiate appearance of nodes and master node from pods
      node
        .append("rect")
        .attr("width", (d) => (d.id === `Master Node: ${ip}` ? 80 : 40))
        .attr("height", (d) => (d.id === `Master Node: ${ip}` ? 120 : 40))
        .attr("fill", (d) =>
          d.id === `Master Node: ${ip}`
            ? "#102444"
            : d.isPod
              ? getColorPods(d.cpuPercentage, d.memoryPercentage)
              : getColorNodes(d.cpuPercentage, d.memoryPercentage),
        ) // Set fill color based on CPU and memory percentages
        .attr("x", (d) => (d.id === `Master Node: ${ip}` ? -40 : -20))
        .attr("y", (d) => (d.id === `Master Node: ${ip}` ? -60 : -20));

      // Append text to nodes for displaying node id
      const text = node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("fill", "#fff")
        .text((d) => d.id)
        .style("visibility", "hidden");

      // Mouseover and mouseout event listeners to show/hide text on hover
      node
        .on("mouseover", function () {
          d3.select(this)
            .select("text")
            .style("visibility", "visible")
            .style("fill", "#8CBEFA");
        })
        .on("mouseout", function () {
          d3.select(this).select("text").style("visibility", "hidden");
        });

      // Drag behavior to nodes
      node.call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

      // Tick function to update node and link positions
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

      // Function to handle drag start
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      // Function to handle dragging
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      // Function to handle drag end
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // Function to handle window resize
      function handleResize() {
        svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
        simulation.force(
          "center",
          d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2),
        );
      }

      // Event listener for window resize
      window.addEventListener("resize", handleResize);

      // Cleanup function to remove event listener and stop the simulation when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
        simulation.stop();
      };
    }
  }, [podsData, nodeData]);

  // Function to determine the fill color of pods based on CPU and memory percentages
  function getColorPods(cpuPercentage, memoryPercentage) {
    if (
      (cpuPercentage >= 4 && cpuPercentage < 5) ||
      (memoryPercentage >= 4 && memoryPercentage < 5)
    ) {
      return "#EC9006";
    } else if (
      (cpuPercentage >= 5 && cpuPercentage < 6) ||
      (memoryPercentage >= 5 && memoryPercentage < 6)
    ) {
      return "#D24E02";
    } else if (cpuPercentage > 6 || memoryPercentage > 6) {
      return "#b52009";
    } else {
      return "#FADEB2";
    }
  }

  // Function to determine the fill color of nodes based on CPU and memory percentages
  function getColorNodes(cpuPercentage, memoryPercentage) {
    if (
      (cpuPercentage > 70 && cpuPercentage <= 80) ||
      (memoryPercentage > 70 && memoryPercentage <= 80)
    ) {
      return "#EC9006";
    } else if (
      (cpuPercentage > 80 && cpuPercentage <= 90) ||
      (memoryPercentage > 80 && memoryPercentage <= 90)
    ) {
      return "#D24E02";
    } else if (
      (cpuPercentage > 90 && cpuPercentage <= 100) ||
      (memoryPercentage > 90 && memoryPercentage <= 100)
    ) {
      return "#b52009";
    } else {
      return "#FADEB2";
    }
  }

  // Render the SVG element
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <svg
        ref={svgRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <rect width="100%" height="100%" fill="none" pointerEvents="all" />
      </svg>
    </div>
  );
};

export default ForceDirectedGraph;
