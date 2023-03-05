import { useEffect } from "react";
import StacyScript2 from "./StacyScript2";
import "../StacyStyle.css";
import Navbar from "../Navbar";

export default function Stacy() {
  useEffect(() => {
    StacyScript2();
  }, []);

  return (
    <>
      <Navbar />
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
    </>
  );
}
