"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "rtk/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
