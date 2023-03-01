import { Route, Routes } from "react-router-dom";
import "./App.css";
import BuiltIn from "./components/TTS/BuiltIn";
import EasySpeechLibrary from "./components/TTS/EasySpeechLibrary";
import Home from "./components/Home";
import Paid from "./components/TTS/Paid";
import RSR from "./components/Voice Assistant/RSR";
import Alan2 from "./components/Voice Assistant/Alan2";
import CloudGoogle from "./components/Voice Assistant/CloudGoogle";
import Stacy2 from "./components/avatar/Stacy2/Stacy2";
import Stacy from "./components/avatar/Stacy/Stacy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builtIn" element={<BuiltIn />} />
      <Route path="/easySpeech" element={<EasySpeechLibrary />} />
      <Route path="/Paid" element={<Paid />} />
      <Route path="/RSR" element={<RSR />} />
      <Route path="/Alan" element={<Alan2 />} />
      <Route path="/CloudGoogle" element={<CloudGoogle />} />
      <Route path="/Stacy" element={<Stacy />} />
      <Route path="/Stacy2" element={<Stacy2 />} />
    </Routes>
  );
}
