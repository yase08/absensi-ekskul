import { createContext, useContext, useState } from "react";

const EkskulContext = createContext();

export function useEkskul() {
  return useContext(EkskulContext);
}

export function EkskulProvider({ children }) {
  const [ekskul, setEkskul] = useState("");

  const value = {
    ekskul,
    setEkskul,
  };

  return (
    <EkskulContext.Provider value={value}>{children}</EkskulContext.Provider>
  );
}
