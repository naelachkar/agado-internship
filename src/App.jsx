import { Route, Routes } from "react-router-dom";
import "./App.css";
import BuiltIn from "./components/BuiltIn";
import Home from "./components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builtIn" element={<BuiltIn />} />
    </Routes>
  );
}
