import { useState } from "react";
import "./Alan.css";
import useAlan from "../assets/useAlan";

export default function Alan() {
  useAlan();

  const [bool, setBool] = useState(true);

  return (
    <>
      <h1>Alan Demo</h1>
      <button onClick={() => setBool(!bool)}>
        {bool ? "Open" : "Close"} the Box
      </button>
      <div className="test" hidden={bool}>
        <span>I'm open 👋</span>
      </div>
    </>
  );
}
