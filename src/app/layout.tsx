// /var/www/ikoconnect/src/app/layout.tsx
import "@/styles/globals.css";
import type { ReactNode } from "react";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientOnly from "../components/ClientOnly";

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
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <ClientOnly>
          <Providers>
            <Navbar />

            <main id="main-content" className="relative z-10 pt-24 overflow-x-hidden">
              {children}
            </main>

            <Footer />
          </Providers>
        </ClientOnly>
      </body>
    </html>
  );
}
