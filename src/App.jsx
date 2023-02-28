import { Route, Routes } from "react-router-dom";
import "./App.css";
import BuiltIn from "./components/TTS/BuiltIn";
import EasySpeechLibrary from "./components/TTS/EasySpeechLibrary";
import Home from "./components/Home";
import Paid from "./components/TTS/Paid";
import RSR from "./components/Voice Assistant/RSR";
import Alan2 from "./components/Voice Assistant/Alan2";
import Avatar from "./components/avatar/avatar";
import Stacy from "./components/avatar/Stacy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builtIn" element={<BuiltIn />} />
      <Route path="/easySpeech" element={<EasySpeechLibrary />} />
      <Route path="/Paid" element={<Paid />} />
      <Route path="/RSR" element={<RSR />} />
      <Route path="/Alan" element={<Alan2 />} />
      <Route path="/avatar" element={<Avatar />} />
      <Route path="/Stacy" element={<Stacy />} />
    </Routes>
  );
}
