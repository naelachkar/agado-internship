import { Route, Routes } from "react-router-dom";
import "./App.css";
import BuiltIn from "./components/BuiltIn";
import EasySpeechLibrary from "./components/EasySpeechLibrary";
import Home from "./components/Home";
import Paid from "./components/Paid";
import RSR from "./components/RSR";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builtIn" element={<BuiltIn />} />
      <Route path="/easySpeech" element={<EasySpeechLibrary />} />
      <Route path="/Paid" element={<Paid />} />
      <Route path="/RSR" element={<RSR />} />
    </Routes>
  );
}
