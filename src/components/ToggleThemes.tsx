"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ToggleThemes = () => {
  const { setTheme, resolvedTheme } = useTheme();

  if (resolvedTheme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <FiMoon size={20} />
      </button>
    );
  }

  if (resolvedTheme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <FiSun size={20} />
      </button>
    );
  }
};

export default ToggleThemes;
