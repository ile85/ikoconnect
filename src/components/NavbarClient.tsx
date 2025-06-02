// src/components/NavbarClient.tsx
"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), {
  ssr: false,
  loading: () => (
    <p className="p-4 text-center text-gray-700 dark:text-gray-300">
      Loading menu…
    </p>
  ),
});

export default function NavbarClient() {
  return <Navbar />;
}
