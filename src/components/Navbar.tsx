// src/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/jobs", label: "Jobs" },
    { href: "/community", label: "Community" },
    { href: "/media-kit", label: "Media Kit" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-md"
          : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="
            inline-block transition-transform duration-200 transform
            hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
          "
        >
          <img
            src="/logo.svg"
            alt="IkoConnect"
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center space-x-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`
                  px-4 py-2 rounded-md text-[15px] font-medium
                  ${
                    pathname === href
                      ? "bg-[#E0F7F2] text-[#00957F]"
                      : "text-gray-800 dark:text-gray-100 hover:bg-[#E0F7F2] hover:text-[#00957F] dark:hover:bg-gray-700 dark:hover:text-teal-400"
                  }
                  transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                `}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Resources dropdown */}
          <li className="relative group">
            <button
              aria-haspopup="true"
              aria-expanded="false"
              className="
                flex items-center px-4 py-2 rounded-md text-[15px] font-medium
                text-gray-800 dark:text-gray-100 hover:bg-[#E0F7F2] hover:text-[#00957F] dark:hover:bg-gray-700 dark:hover:text-teal-400
                focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition
              "
            >
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            <div
              className="
                absolute left-0 top-full w-48
                bg-white dark:bg-gray-800 shadow-lg rounded-md py-2
                z-50 opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto
                transition-opacity
              "
              style={{ marginTop: "-2px" }}
            >
              <Link
                href="/resources"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                All Resources
              </Link>
              <Link
                href="/tools"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Tools
              </Link>
              <Link
                href="/resources#guides"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Guides
              </Link>
            </div>
          </li>

          {/* Community CTA (styled as a button) */}
          <li>
            <Link
              href="/community"
              className="
                px-4 py-2 bg-[#00957F] text-white font-semibold
                rounded-md hover:bg-[#007965] dark:bg-teal-600 dark:hover:bg-teal-500
                transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
              "
            >
              Join Community
            </Link>
          </li>

          {/* Theme Toggle */}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-4 text-gray-800 dark:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md px-6 pt-2 pb-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="
                    block px-4 py-2 rounded-md text-base font-medium
                    text-gray-800 dark:text-gray-100
                    hover:bg-[#E0F7F2] dark:hover:bg-gray-700
                    transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                  "
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Mobile Resources section */}
            <li>
              <div className="px-4 py-2 font-medium text-gray-800 dark:text-gray-100">
                Resources
              </div>
              <ul className="pl-4 space-y-1">
                <li>
                  <Link
                    href="/resources"
                    className="
                      block px-4 py-2 rounded-md text-base font-medium
                      text-gray-800 dark:text-gray-100
                      hover:bg-[#E0F7F2] dark:hover:bg-gray-700
                      transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                    "
                    onClick={() => setMobileOpen(false)}
                  >
                    All Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    className="
                      block px-4 py-2 rounded-md text-base font-medium
                      text-gray-800 dark:text-gray-100
                      hover:bg-[#E0F7F2] dark:hover:bg-gray-700
                      transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                    "
                    onClick={() => setMobileOpen(false)}
                  >
                    Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources#guides"
                    className="
                      block px-4 py-2 rounded-md text-base font-medium
                      text-gray-800 dark:text-gray-100
                      hover:bg-[#E0F7F2] dark:hover:bg-gray-700
                      transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                    "
                    onClick={() => setMobileOpen(false)}
                  >
                    Guides
                  </Link>
                </li>
              </ul>
            </li>

            {/* Community CTA */}
            <li>
              <Link
                href="/community"
                className="
                  block px-4 py-2 text-center bg-[#00957F] text-white font-semibold
                  rounded-md hover:bg-[#007965] dark:bg-teal-600 dark:hover:bg-teal-500
                  transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                "
                onClick={() => setMobileOpen(false)}
              >
                Join Community
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
