import EasySpeech from "easy-speech";
import { useEffect, useState } from "react";
import DetectOS from "../assets/DetectOS";
import Navbar from "../avatar/Navbar";

export default function EasySpeechLibrary() {
  const [text, setText] = useState();
  const [voiceList, setVoiceList] = useState();
  const [voiceIndex, setVoiceIndex] = useState(0);

  useEffect(() => {
    const init = async () => {
      await EasySpeech.init({ maxTimeout: 5000, interval: 250 })
        .then(() => console.debug("load complete"))
        .catch((e) => console.error(e));
      const voices = EasySpeech.voices();
      setVoiceList(voices);
    };
    init();
  }, []);

  async function textToSpeech() {
    await EasySpeech.speak({ text: text, voice: voiceList[voiceIndex] });
  }

  return (
    <>
    <Navbar />
      <h1>Easy Speech library</h1>
      <div className="flex">
        <textarea onChange={(e) => setText(e.target.value)}></textarea>
        <button onClick={textToSpeech} disabled={!voiceList ? true : false}>
          Speak
        </button>
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
      <DetectOS voiceList={voiceList} />
      <details>
        <summary>Pros & Cons</summary>
        <h4>Pros</h4>
        <ul>
          <li>Easier to implement</li>
          <li>Cross-browser support including mobile</li>
          <li>Works offline</li>
        </ul>
        <h4>Cons</h4>
        <ul>
          <li>Still robotic voices</li>
          <li>Still dependent on user's device voices</li>
        </ul>
        <a
          target="_blank"
          href="https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353">
          Explanations
        </a>
        <br />
        <a target="_blank" href="https://github.com/jankapunkt/easy-speech">
          Source Code
        </a>
      </details>
    </>
  );
}
