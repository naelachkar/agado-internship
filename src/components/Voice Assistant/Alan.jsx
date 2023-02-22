import { useState } from "react";
import "./Alan.css";
import useAlan from "../assets/useAlan";
import { useBoxContext } from "./BoxContext";

export default function Alan() {
  useAlan();
  const { bool, setBool } = useBoxContext();

  return (
    <div>
      <h1>Alan Demo</h1>
      <p>Use the button below or ask Alan to open or close the box</p>
      <button onClick={() => setBool(!bool)}>
        {bool ? "Open" : "Close"} the Box
      </button>
      <div className="test" style={{ visibility: bool ? "hidden" : "visible"}}>
        <span>I'm open 👋</span>
      </div>
      <p>You can also ask Alan to change the page background color to:</p>
      <ul>
        <li>Red</li>
        <li>Blue</li>
        <li>Green</li>
        <li>White</li>
        <li>Orange</li>
        <li>Purple</li>
        <li>Pink</li>
        <li>Black</li>
      </ul>
    </div>
  );
}
