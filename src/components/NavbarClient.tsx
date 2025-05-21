"use client";

import dynamic from "next/dynamic";

// This dynamic import with ssr: false MUST live in a client component
const Navbar = dynamic(() => import("./Navbar"), {
  ssr: false,
  loading: () => <p className="p-4 text-center">Loading menu…</p>,
});

export default function NavbarClient() {
  return <Navbar />;
}
