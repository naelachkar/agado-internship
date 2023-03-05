import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1>Text-to-speech methods</h1>
        <div className="flex column">
          <button onClick={() => navigate("/builtIn")}>
            Built-in JavaScript
          </button>
          <button onClick={() => navigate("/EasySpeech")}>
            JavaScript with Easy Speech library
          </button>
          <button onClick={() => navigate("/Paid")}>Paid Services</button>
        </div>
        <h1>Voice activation</h1>
        <div className="flex column">
          <button onClick={() => navigate("/RSR")}>
            React Speech Recognition Library
          </button>
          <button onClick={() => navigate("/Alan")}>Alan Demo</button>
          <button onClick={() => navigate("/CloudGoogle")}>Cloud Google</button>
        </div>
        <h1>Avatars</h1>
        <div className="flex column">
          <button onClick={() => navigate("/Stacy")}>Stacy</button>
          <button onClick={() => navigate("/Stacy2")}>Stacy Test</button>
        </div>
      </div>
    </>
  );
}
