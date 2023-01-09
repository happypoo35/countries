import { Nunito_Sans } from "@next/font/google";
// import { ServerThemeProvider } from "next-themes";

import Header from "./header";
import { Providers } from "./providers";

import "../styles/globals.scss";
import s from "./layout.module.scss";

const nunito = Nunito_Sans({
  weight: ["300", "400", "600", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className} suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <div className={s.wrapper}>
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
