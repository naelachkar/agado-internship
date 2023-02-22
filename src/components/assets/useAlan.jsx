import alanBtn from "@alan-ai/alan-sdk-web";
import { useCallback, useEffect, useState } from "react";
import { useBoxContext } from "../Voice Assistant/BoxContext";

const COMMANDS = {
  OPEN_BOX: "open-box",
  CLOSE_BOX: "close-box",
};

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState();
  const { setBool } = useBoxContext();

  const openBox = useCallback(() => {
    alanInstance.playText("Opening the box");
    setBool(false);
  }, [alanInstance]);

  const closeBox = useCallback(() => {
    alanInstance.playText("Closing the box");
    setBool(true);
  }, [alanInstance]);

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_BOX, openBox);
    window.addEventListener(COMMANDS.CLOSE_BOX, closeBox);

    return () => {
      window.removeEventListener(COMMANDS.OPEN_BOX, openBox);
      window.removeEventListener(COMMANDS.CLOSE_BOX, closeBox);
    };
  }, [openBox]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        top: "20px",
        left: "20px",
        key: import.meta.env.VITE_ALAN_KEY,
        onCommand: ({ command }) => {
          window.dispatchEvent(new CustomEvent(command));
        },
      })
    );
  }, []);

  return null;
}
