"use client";

import { useEffect } from "react";

export default function TimeBasedThemeProvider() {
  useEffect(() => {
    const hour = new Date().getHours();
    // between 18:00 and 5:59 → dark
    if (hour >= 18 || hour < 6) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
