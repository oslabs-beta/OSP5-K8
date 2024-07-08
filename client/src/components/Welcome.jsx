import React, { useState, useEffect } from "react";
import GitHubButton from "react-github-btn";
import donuts from "../assets/donuts.jpg";
import d3 from "../assets/d3.jpg";
import table from "../assets/table.jpg";

const Welcome = () => {
  const [showText, setShowText] = useState(false);
  const [showText1, setShowText1] = useState(false);

  useEffect(() => {
    // After component mounts, set showText to true to trigger animation
    setShowText(true);
    setShowText1(true);
  }, []);

  return (
    <div>
      <div
        style={{
          color: "#E88504",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Horizontal centering
          alignItems: "center", // Vertical centering
          opacity: showText ? 1 : 0, // Set opacity based on showText state
          transition: "opacity 4s ease", // Smooth transition for opacity change
          marginLeft: "150px", // Set left margin to auto to push text to the right
        }}
      >
        <h1
          style={{ fontSize: "64px", paddingBottom: "2em", paddingTop: "1em" }}
        >
          Welcome to Nemo!
        </h1>
      </div>
      <div
        style={{
          color: "#BCDCFC",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Horizontal centering
          alignItems: "center", // Vertical centering
          opacity: showText1 ? 1 : 0, // Set opacity based on showText state
          transition: "opacity 10s ease", // Smooth transition for opacity change
          marginLeft: "150px", // Set left margin to auto to push text to the right
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: "75%",
            overflow: "wrap",
            marginLeft: "110px",
          }}
        >
          <h1 style={{ fontSize: "48px" }}>
            What Is Nemo?
            <div style={{ fontSize: "20px", marginBottom: "1em" }}>
              Nemo offers a straightforward and user-friendly health monitoring
              solution for your Kubernetes Clusters, focusing on the CPU and
              Memory consumption across the cluster's nodes and pods, and
              delivering the insights in two accessible formats. The first
              format is a neatly arranged table, customizable to prioritize the
              metrics most relevant to you. The second format features
              easy-to-interpret donut charts that display usage statistics, with
              dynamic color changes to reflect usage levels. Both presentation
              methods ensure the provision of real-time data. Moreover, the
              Cluster tab lays out the architecture of your Kubernetes Cluster,
              from the Master Node through to the Nodes, and down to the Pods,
              with a color-coding scheme akin to our chart system, designed to
              indicate usage severity.
            </div>
            <GitHubButton
              href="https://github.com/oslabs-beta/nemo"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-size="large"
              data-show-count="true"
              aria-label="Follow @buttons on GitHub"
            >
              Follow Nemo on GitHub
            </GitHubButton>
          </h1>
        </div>

        <br></br>
        <br></br>

        <div
          style={{
            fontSize: "40px",
            marginLeft: "110px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <em
              style={{
                marginBottom: ".5em",
                fontSize: "40px",
                marginLeft: "110px",
              }}
            >
              DYNAMIC TABLES
            </em>
            <img alt="table" src={table} />
          </div>
          <br></br>
        </div>
      </div>
      <br></br>
      <br></br>
      <div
        className="ml-64"
        style={{
          marginBottom: ".5em",
          fontSize: "40px",
          color: "#BCDCFC",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <em>REAL-TIME NODE AND POD DATA</em>
        <em>COLOR-CODED CLUSTER ARCHITECTURE</em>
      </div>

      <div
        className="ml-64"
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img src={donuts} />
        <img src={d3} />
      </div>
    </div>
  );
};

export default Welcome;
