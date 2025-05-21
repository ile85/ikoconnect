// src/app/layout.tsx
import "@/styles/globals.css";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://ikoconnect.com"),
  title: {
    default: "IkoConnect",
    template: "%s | IkoConnect",
  },
  description:
    "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
  openGraph: {
    title: "IkoConnect",
    description:
      "Discover the best remote work tools, guides, and job listings for freelancers.",
    url: "https://ikoconnect.com",
    siteName: "IkoConnect",
    images: [
      {
        url: "https://ikoconnect.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "IkoConnect Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IkoConnect",
    description:
      "Discover the best remote work tools, guides, and job listings for freelancers.",
    images: ["https://ikoconnect.com/og-default.png"],
    site: "@ikoconnect",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Providers>
        <Navbar />

        {/* ——————————————————————————————— */}
        {/* 1) GLOBAL SVG CLIP-PATH (zero-sized, with viewBox) */}
        <svg
          width="0"
          height="0"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          <defs>
<clipPath id="blobClip" clipPathUnits="userSpaceOnUse">
     {/* прво преведи до центарот, па скалирај 3х */}
     <path
       d="M64.2,-23.7
          C67.8,-9.9 44.5,9.7 25.5,20
          C6.4,30.4 -8.6,31.4 -24.8,22.4
          C-41,13.4 -58.5,-5.6 -54.6,-19.9
          C-50.6,-34.2 -25.3,-43.7 2.5,-44.5
          C30.3,-45.3 60.7,-37.4 64.2,-23.7
          Z"
       transform="translate(100 100) scale(3)"
     />
   </clipPath>
          </defs>
        </svg>
        {/* ——————————————————————————————— */}

         {/* Wrap your page content */}
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
