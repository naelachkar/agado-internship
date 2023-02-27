// import * as THREE from "three";
// // import * as mjs from "../../../mannequin.js-main/mannequin";
// import * as three from "../../../node_modules/three/build/three.min.js"

import { useEffect } from "react";

export default function Mannequin() {
  useEffect(() => {
    const mannequinjs = document.createElement("script");
    mannequinjs.src = "../../../mannequin.js-main/mannequin";
    mannequinjs.async = true;
    mannequinjs.append("createScene(); man = new Male()")

    const three = document.createElement("script");
    three.src = "../../../node_modules/three/build/three.min.js";
    three.async = true;

    document.body.appendChild(three);
    document.body.appendChild(mannequinjs);

    // const script = document.createElement("script");
    // script.async = true
    
    // document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(mannequinjs);
      document.body.removeChild(three);
    //   document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <h1>Mannequin.js</h1>
    </>
  );
}
