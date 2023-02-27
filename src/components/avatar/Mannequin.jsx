import { Helmet } from "react-helmet";

export default function Mannequin() {
  return (
    <>
      <Helmet>
        <script src="../../../node_modules/three/build/three.js"></script>
        <script src="../../../mannequin.js-main/mannequin">createScene(); man = new Male();</script>
      </Helmet>
      <h1>Mannequin.js</h1>
    </>
  );
}
