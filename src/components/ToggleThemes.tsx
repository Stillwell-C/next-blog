"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ToggleThemes = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleSetTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else if (resolvedTheme === "dark") {
      setTheme("light");
    }
  };

  return (
    <button onClick={handleSetTheme}>
      {resolvedTheme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

export default ToggleThemes;
