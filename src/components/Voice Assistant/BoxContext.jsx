import { createContext, useContext, useState } from "react";

const BoxContext = createContext();

export function useBoxContext() {
  return useContext(BoxContext);
}

export default function BoxContextWrapper({ children }) {
  const [bool, setBool] = useState(true);

  return <BoxContext.Provider value={{bool, setBool}}>{children}</BoxContext.Provider>;
}
