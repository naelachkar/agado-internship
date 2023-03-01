import { useEffect } from "react";
import StacyScript2 from "./StacyScript2";
import "../StacyStyle.css";

export default function Stacy2() {
  useEffect(() => {
    StacyScript2();
  }, []);

  return (
    <div className="flex column">
      <h1>Stacy Test</h1>
      <div id="wrapper">
        <canvas id="c"></canvas>
      </div>
    </div>
  );
}
