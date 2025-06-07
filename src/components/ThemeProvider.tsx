// src/components/ThemeProvider.tsx
"use client";

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const apply = (dark: boolean) => {
      if (dark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    };

    // initial
    apply(window.matchMedia("(prefers-color-scheme: dark)").matches);

    // listen for changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return null;
}
