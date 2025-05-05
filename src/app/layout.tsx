// src/app/layout.tsx
import './globals.css';
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN + all its core plugins (typography, filters, animations, forms, aspect-ratio, etc.) */}
         <script
          src="https://cdn.tailwindcss.com?plugins=typography,filters,forms,aspect-ratio,container-queries"
          defer
        ></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
