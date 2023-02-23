import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, useState } from "react";

export default function Alan2() {
  const [bool, setBool] = useState(true);
  const [ttsText, setTtsText] = useState();
  const alanInstance = useRef();
  const alanState = useRef();
  const alanPayload = useRef();

  const commands = {
    openBox: function () {
      alanInstance.current.playText("Opening the box");
      setBool(false);
    },

    closeBox: function () {
      alanInstance.current.playText("Closing the box");
      setBool(true);
    },

    changeBackground: function () {
      alanInstance.current.playText(
        `Changing the background to ${alanPayload.current.color}`
      );

      if (alanPayload.current.color.toLowerCase() === "black") {
        document.body.style = `background: ${alanPayload.current.color.toLowerCase()}; color: white`;
      } else {
        document.body.style = `background: ${alanPayload.current.color.toLowerCase()}; color: #213547`;
      }
    },

    sayHi: function () {
      alanInstance.current.activate();
      alanInstance.current.playText(
        "Hello my name is Alan. This is a demo of my voice."
      );
    },

    textToSpeech: function () {
      alanInstance.current.activate();
      alanInstance.current.playText(ttsText);
    },
  };

  useEffect(() => {
    alanInstance.current = alanBtn({
      key: import.meta.env.VITE_ALAN_KEY,
      onCommand: ({ command, payload }) => {
        alanPayload.current = payload;
        commands[command]();
      },
      onButtonState: (e) => {
        alanState.current = e;
      },
    });

    return () => {
      alanInstance.current.remove();
    };
  }, []);

  return (
    <div className="container">
      <h1>Alan Demo 2</h1>
      <p>
        <span>
          Alan is the Virtual Assistant available by clicking on the blue icon
          on the top left corner.
        </span>
        <br />
        <span>
          To open or close the box, use the button below or ask Alan to do it.
        </span>
      </p>
      <button onClick={() => setBool(!bool)}>
        {bool ? "Open" : "Close"} the Box
      </button>
      <div className="box" style={{ visibility: bool ? "hidden" : "visible" }}>
        <span>I'm open 👋</span>
      </div>
      <p>You can also ask Alan to change the page background color to:</p>
      <ul>
        <li>Red</li>
        <li>Blue</li>
        <li>Green</li>
        <li>White</li>
        <li>Orange</li>
        <li>Purple</li>
        <li>Pink</li>
        <li>Black</li>
      </ul>
      <p>Click on the button bellow to hear Alan say hello.</p>
      <button onClick={commands.sayHi}>👋</button>
      <p>Alan can also pronounce sentences for you:</p>
      <textarea onChange={(e) => setTtsText(e.target.value)}></textarea>
      <button onClick={commands.textToSpeech}>Speak</button>
    </div>
  );
}
