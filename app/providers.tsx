"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "store";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);
