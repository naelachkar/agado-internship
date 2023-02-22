import { useState } from "react";
import "./Alan.css";

export default function Alan() {

    const [bool, setBool] = useState(true);


  return (
    <>
      <h1>Alan Demo</h1>
      <button onClick={() => setBool(!bool)}>Open the Box</button>
      <div className="test" hidden={bool}>
        <span>I'm open 👋</span>
      </div>
    </>
  );
}
