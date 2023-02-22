import { createContext, useContext, useEffect, useState } from "react";

const BoxContext = createContext();

export function useBoxContext() {
  return useContext(BoxContext);
}

export default function BoxContextWrapper({ children }) {
  const [bool, setBool] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    if (backgroundColor.toLowerCase() === "black") {
      document.body.style = `background: ${backgroundColor.toLowerCase()}; color: white`;
      return;
    }
    document.body.style = `background: ${backgroundColor.toLowerCase()}; color: #213547`;
  }, [backgroundColor]);

  const values = {
    bool,
    setBool,
    backgroundColor,
    setBackgroundColor,
  };

  return <BoxContext.Provider value={values}>{children}</BoxContext.Provider>;
}
