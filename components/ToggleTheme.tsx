"use client";

import { useEffect, useState } from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

import s from "./toggleTheme.module.scss";

const ToggleTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <button className={s.btn} disabled data-loading>
        <FaSun />
        Dark Mode
      </button>
    );

  return (
    <button
      className={s.btn}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <FaSun /> : <FaRegMoon />}
      {resolvedTheme === "dark" ? "light" : "dark"} Mode
    </button>
  );
};

export default ToggleTheme;
