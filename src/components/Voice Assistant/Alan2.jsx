import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useRef, useState } from "react";

export default function Alan2() {
  const [bool, setBool] = useState(true);
  const alanInstance = useRef();

  function openBox() {
    alanInstance.current.playText("Opening the box");
    setBool(false);
  }

  function react() {
    alanInstance.current.playText("I'm reacting.");
    alert("Reaction!");
  }

  const commands = {
    openBox,
    react,
  };

  useEffect(() => {
    alanInstance.current = alanBtn({
      key: import.meta.env.VITE_ALAN_KEY,
      onCommand: ({ command, payload }) => {
        if (command === "open-box") {
          openBox();
        } else {
          commands[command]();
        }
      },
    });
  });

  return (
    <div>
      <h1>Alan 2</h1>
      <button onClick={() => setBool(!bool)}>
        {bool ? "Open" : "Close"} the Box
      </button>
      <div className="box" style={{ visibility: bool ? "hidden" : "visible" }}>
        <span>I'm open 👋</span>
      </div>
    </div>
  );
}
