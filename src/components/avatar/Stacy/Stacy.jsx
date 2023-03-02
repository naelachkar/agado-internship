import { useEffect } from "react";
import StacyScript from "./StacyScript";
import "../StacyStyle.css";

export default function Stacy() {
  useEffect(() => {
    StacyScript();
  }, []);

  return (
    <div className="flex column">
      <h1>Stacy</h1>
      <div id="wrapper">
        <canvas id="c"></canvas>
      </div>
      <div>
        <a
          href="https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/"
          target="_blank">
          Source
        </a>
      </div>
    </div>
  );
}