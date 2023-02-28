import { useEffect, useRef } from "react";
import StacyScript from "./StacyScript";

export default function Stacy(props) {
  const canvas = useRef();

  useEffect(() => {
    StacyScript();
  }, []);

  return (
    <div className="flex column">
      <h1>Stacy</h1>
      <div className="wrapper">
        <canvas ref={canvas} id="c"></canvas>
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
