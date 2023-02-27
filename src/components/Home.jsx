import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
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
        <button onClick={() => navigate("/Alan2")}>Alan Demo 2</button>
      </div>
      <h1>Avatars</h1>
      <div className="flex column">
        <button onClick={() => navigate("/avatar")}>Avatar Demo</button>
      </div>
    </>
  );
}
