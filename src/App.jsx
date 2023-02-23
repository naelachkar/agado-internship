import { Route, Routes } from "react-router-dom";
import "./App.css";
import Alan from "./components/Voice Assistant/Alan";
import BuiltIn from "./components/TTS/BuiltIn";
import EasySpeechLibrary from "./components/TTS/EasySpeechLibrary";
import Home from "./components/Home";
import Paid from "./components/TTS/Paid";
import RSR from "./components/Voice Assistant/RSR";
// import useAlan from "./components/assets/useAlan";
import Alan2 from "./components/Voice Assistant/Alan2";

export default function App() {
  // useAlan();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builtIn" element={<BuiltIn />} />
      <Route path="/easySpeech" element={<EasySpeechLibrary />} />
      <Route path="/Paid" element={<Paid />} />
      <Route path="/RSR" element={<RSR />} />
      <Route path="/Alan" element={<Alan />} />
      <Route path="/Alan2" element={<Alan2 />} />
    </Routes>
  );
}
