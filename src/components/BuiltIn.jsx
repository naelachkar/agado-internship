import { useState } from "react";

export default function BuiltIn() {
    const [text, setText] = useState();
    const [lang, setLang] = useState("en-US");

    function textToSpeech() {
        const voices = window.speechSynthesis.getVoices();
        // console.log(voices);
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = lang;
        window.speechSynthesis.speak(msg);
    }

    return (
        <>
            <h1>Built-in JavaScript</h1>
            <div>
                <textarea onChange={(e) => setText(e.target.value)}></textarea>
                <button onClick={textToSpeech}>Speak</button>
            </div>
            <div>
                <button onClick={() => setLang("en-US")}>English (US)</button>
                <button onClick={() => setLang("en-GB")}>English (UK)</button>
                <button onClick={() => setLang("he-IL")}>Hebrew</button>
            </div>
        </>
    );
}