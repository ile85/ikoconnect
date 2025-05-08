// src/app/layout.tsx
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar"; // <-- ова е точно

export const metadata = {
  title: "ikoConnect",
  description: "Your freelance hub",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />         {/* <— тука го вметнуваш */}
        {children}
      </body>
    </html>
  );
}
