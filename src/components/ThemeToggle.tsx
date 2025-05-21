// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;

  const toggle = () => {
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${current === "dark" ? "light" : "dark"} mode`}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00957F] bg-gray-200 dark:bg-gray-700"
    >
      {current === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
