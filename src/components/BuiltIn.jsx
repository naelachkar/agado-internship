import { useEffect, useState } from "react";

export default function BuiltIn() {
  const [text, setText] = useState();
  const [voiceList, setVoiceList] = useState();
  const [voiceIndex, setVoiceIndex] = useState(0);

  // getVoice is async
  let timeout = 0;
  const maxTimeout = 2000;
  const interval = 250;
  const loadVoices = (cb) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      return cb(undefined, voices);
    }
    if (timeout >= maxTimeout) {
      return cb(new Error("loadVoices max timeout exceeded"));
    }
    timeout += interval;
    setTimeout(() => loadVoices(cb), interval);
  };

  useEffect(() => {
    loadVoices((err, voices) => {
      if (err) return console.error(err);
      setVoiceList(voices);
    });
  }, []);

  function textToSpeech() {
    const msg = new SpeechSynthesisUtterance(text);
    msg.voice = voiceList[voiceIndex];
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <h1>Built-in JavaScript</h1>
      <div className="flex">
        <textarea onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={textToSpeech}>Speak</button>
      </div>
      {voiceList?.length > 0 && (
        <select onChange={(e) => setVoiceIndex(e.target.value)}>
          {voiceList.map((voice, index) => (
            <option key={voice.voiceURI} value={index}>
              {voice.lang} - {voice.name}
            </option>
          ))}
        </select>
      )}
      <details>
        <summary>Pros & Cons</summary>
        <h4>Pros</h4>
        <ul>
          <li>No need for libraries or APIs</li>
          <li>Light solution</li>
          <li>Works offline</li>
        </ul>
        <h4>Cons</h4>
        <ul>
          <li>Cross-browser support difficult</li>
          <li>Robotic voices</li>
          <li>TTS without user action disabled in Chrome (TBC)</li>
        </ul>
      </details>
    </>
  );
}
