import { createContext, useContext, useEffect, useState } from "react";

const BoxContext = createContext();

export function useBoxContext() {
  return useContext(BoxContext);
}

export default function BoxContextWrapper({ children }) {
  const [bool, setBool] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    document.body.style = `background: ${backgroundColor.toLowerCase()}`;
  }, [backgroundColor])

  const values = {
    bool,
    setBool,
    backgroundColor,
    setBackgroundColor,
  };

  return <BoxContext.Provider value={values}>{children}</BoxContext.Provider>;
}
