import { useEffect, useState } from "react";

export default function BuiltIn() {
  const [text, setText] = useState();
  const voices = window.speechSynthesis.getVoices();
  const [voiceList, setVoiceList] = useState();
  const [voiceIndex, setVoiceIndex] = useState(0);

  useEffect(() => {
    setVoiceList(voices);
  }, []);

  function textToSpeech() {
    const msg = new SpeechSynthesisUtterance(text);
    msg.voice = voices[voiceIndex];
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <h1>Built-in JavaScript</h1>
      <div>
        <textarea onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={textToSpeech}>Speak</button>
      </div>
      {voiceList.length > 0 && (
        <select onChange={(e) => setVoiceIndex(e.target.value)}>
          {voiceList.map((voice, index) => (
            <option key={voice.voiceURI} value={index}>
              {voice.name}
            </option>
          ))}
        </select>   
      )}
    </>
  );
}
