import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NavBar from "../../components/Welcome";

const setActiveButton = jest.fn();

test("renders NavBar menu options", () => {
  //   // const navElement = screen.getByText("WELCOME");
  //   const navElement = screen.getByText(/cluster/i);
  //   //console.log(navElement);
  //   expect(navElement).toBeInTheDocument();
});

// test("renders Welcome to Nemo!", () => {
//   // render(<App />);
//   render(<Welcome />);
//   const linkElement = screen.getByText("Welcome to Nemo!");
//   expect(linkElement).toBeInTheDocument();
// });

// test("renders What Is Nemo?", () => {
//   // render(<App />);
//   render(<Welcome />);

//   //console.log(screen.debug);
//   const linkElement2 = screen.getByText("What Is Nemo?");
//   expect(linkElement2).toBeInTheDocument();
// });

// test("renders an image", () => {
//   const { getByAltText } = render(<Welcome />);
//   const imgElement = getByAltText(/table/i);
//   console.log(imgElement);
//   expect(imgElement).toBeInTheDocument();
// });
