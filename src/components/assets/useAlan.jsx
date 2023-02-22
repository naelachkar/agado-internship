import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";

export default function useAlan() {
  const [alanInstance, setAlanInstance] = useState();

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        top: "20px",
        left: "20px",
        key: import.meta.env.VITE_ALAN_KEY,
        onCommand: (commandData) => {
          console.log(commandData);
        },
      })
    );
  }, []);

  return null;
}
