import { useEffect, useState } from "react";
import "./Alan.css";
import useAlan from "../assets/useAlan";
import { useBoxContext } from "./BoxContext";

export default function Alan() {
  useAlan();
  const { bool, setBool } = useBoxContext();

  return (
    <div className="container">
      <h1>Alan Demo</h1>
      <p>
        <span>
          Alan is the Virtual Assistant available by clicking on the blue icon
          on the top left corner.
        </span>
        <br />
        <span>
          To open or close the box, use the button below or ask Alan to do it.
        </span>
      </p>
      <button onClick={() => setBool(!bool)}>
        {bool ? "Open" : "Close"} the Box
      </button>
      <div className="box" style={{ visibility: bool ? "hidden" : "visible" }}>
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
