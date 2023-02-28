// import { useEffect, useState } from "react";
// import "./Alan.css";
// import useAlan from "../assets/useAlan";
// import { useBoxContext } from "./BoxContext";

// export default function Alan() {
//   const {sayHello, alanTTS} = useAlan();
//   const { bool, setBool, setCustomTTS } = useBoxContext();

//   return (
//     <div className="container">
//       <h1>Alan Demo</h1>
//       <p>
//         <span>
//           Alan is the Virtual Assistant available by clicking on the blue icon
//           on the top left corner.
//         </span>
//         <br />
//         <span>
//           To open or close the box, use the button below or ask Alan to do it.
//         </span>
//       </p>
//       <button onClick={() => setBool(!bool)}>
//         {bool ? "Open" : "Close"} the Box
//       </button>
//       <div className="box" style={{ visibility: bool ? "hidden" : "visible" }}>
//         <span>I'm open 👋</span>
//       </div>
//       <p>You can also ask Alan to change the page background color to:</p>
//       <ul>
//         <li>Red</li>
//         <li>Blue</li>
//         <li>Green</li>
//         <li>White</li>
//         <li>Orange</li>
//         <li>Purple</li>
//         <li>Pink</li>
//         <li>Black</li>
//       </ul>
//       <p>Click on the button bellow to hear Alan say hello.</p>
//       <button onClick={sayHello}>👋</button>
//       <p>Alan can also pronounce sentences for you:</p>
//       <textarea onChange={(e) => setCustomTTS(e.target.value)}></textarea>
//       <button onClick={alanTTS}>Speak</button>
//     </div>
//   );
// }
