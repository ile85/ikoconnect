// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ThemeToggle on client only
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/jobs", label: "Jobs" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#00957F]">
          IkoConnect
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-3 items-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-4 py-2 rounded-md text-[15px] font-medium text-gray-800 hover:bg-[#E0F7F2] hover:text-[#00957F] transition"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/newsletter"
              className="px-4 py-2 bg-[#00957F] text-white text-sm font-semibold rounded-md hover:bg-[#007965] transition"
            >
              Join the Community
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-4 text-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-4 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-[#E0F7F2] hover:text-[#00957F] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/newsletter"
                className="block px-4 py-2 text-center bg-[#00957F] text-white rounded-md hover:bg-[#007965] transition"
                onClick={() => setMobileOpen(false)}
              >
                Join the Community
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
