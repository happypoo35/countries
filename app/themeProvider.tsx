"use client";

import { createContext, useEffect, useState } from "react";
import getInitialColorMode from "../utils/getInitialColorMode";

export interface ThemeContextInterface {
  colorMode: string;
  setColorMode: (value: string) => void;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, rawSetColorMode] = useState("light");

  const setColorMode = (value: string) => {
    rawSetColorMode(value);
    window.localStorage.setItem("theme", value);
  };

  useEffect(() => {
    setColorMode(getInitialColorMode());
  }, []);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      <body data-theme={colorMode}>{children}</body>
    </ThemeContext.Provider>
  );
};
