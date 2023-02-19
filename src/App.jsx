import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState();

  function textToSpeech() {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <h1>Text to speech</h1>
      <input onChange={(e) => setText(e.target.value)}></input>
      <button onClick={textToSpeech}>Speak</button>
    </>
  );
}
