// src/app/layout.tsx
"use client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
