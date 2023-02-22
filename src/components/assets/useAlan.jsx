import alanBtn from "@alan-ai/alan-sdk-web";
import { useCallback, useEffect, useState } from "react";

const COMMANDS = {
  OPEN_BOX: "open-box",
};

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState();

  const openBox = useCallback(() => {
    alanInstance.playText("Opening the box");
  }, [alanInstance]);

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_BOX, openBox);

    return () => {
      window.removeEventListener(COMMANDS.OPEN_BOX, openBox);
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
