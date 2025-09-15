"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

type Item = { href: string; label: string };

const primary: Item[] = [
  { href: "/blog", label: "Blog" },
  { href: "/jobs", label: "Jobs" },
  { href: "/tools", label: "Tools" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const more: Item[] = [
  { href: "/media-kit", label: "Media Kit" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/legal#affiliate-disclosure", label: "Affiliate Disclosure" },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const resBtnRef = useRef<HTMLButtonElement | null>(null);
  const moreBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // затвори мени при навигација
    setMobileOpen(false);
    setResOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-lg backdrop-blur-md dark:bg-gray-900/80"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="IkoConnect — Home"
          className="inline-flex items-center gap-2 transition-transform duration-200 hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <span className="relative block h-10 w-10 sm:h-12 sm:w-12">
            <Image
              src="/logo.svg"
              alt="IkoConnect"
              fill
              sizes="48px"
              priority
            />
          </span>
          <span className="hidden text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:inline">
            IkoConnect
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-[15px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                isActive(item.href)
                  ? "bg-[#E0F7F2] text-[#00957F]"
                  : "text-gray-800 hover:bg-[#E0F7F2] hover:text-[#00957F] dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-teal-400"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Resources dropdown */}
          <div className="relative">
            <button
              ref={resBtnRef}
              aria-haspopup="menu"
              aria-expanded={resOpen}
              aria-controls="resources-menu"
              onClick={() => setResOpen((v) => !v)}
              onBlur={(e) => {
                // затвори ако фокусот излезе од попапот
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                  setResOpen(false);
                }
              }}
              className="flex items-center rounded-md px-3 py-2 text-[15px] font-medium text-gray-800 transition hover:bg-[#E0F7F2] hover:text-[#00957F] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-teal-400"
            >
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div
              id="resources-menu"
              role="menu"
              className={`absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg transition dark:border-gray-800 dark:bg-gray-900 ${
                resOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Link
                role="menuitem"
                href="/resources"
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                All Resources
              </Link>
              <Link
                role="menuitem"
                href="/tools"
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Tools
              </Link>
              <Link
                role="menuitem"
                href="/resources#guides"
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Guides
              </Link>
            </div>
          </div>

          {/* More dropdown */}
          <div className="relative">
            <button
              ref={moreBtnRef}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              aria-controls="more-menu"
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                  setMoreOpen(false);
                }
              }}
              className="flex items-center rounded-md px-3 py-2 text-[15px] font-medium text-gray-800 transition hover:bg-[#E0F7F2] hover:text-[#00957F] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-teal-400"
            >
              More
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div
              id="more-menu"
              role="menu"
              className={`absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg transition dark:border-gray-800 dark:bg-gray-900 ${
                moreOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {more.map((item) => (
                <Link
                  key={item.href}
                  role="menuitem"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <Link
            href="/newsletter"
            className="ml-2 rounded-md bg-[#00957F] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007965] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Subscribe
          </Link>
          <Link
            href="/community"
            className="ml-2 rounded-md border border-[#00957F] px-4 py-2 text-sm font-semibold text-[#00957F] transition hover:bg-[#E0F7F2] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-teal-500 dark:text-teal-400 dark:hover:bg-gray-800"
          >
            Join Community
          </Link>

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-4 text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-gray-100"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Primary */}
            {primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base transition ${
                  isActive(item.href)
                    ? "bg-[#E0F7F2] text-[#00957F]"
                    : "text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Resources */}
            <div className="my-2 h-px bg-gray-200 dark:bg-gray-800" />
            <div className="px-3 pb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Resources
            </div>
            <div className="space-y-1 pl-2">
              <Link
                href="/resources"
                className="block rounded-md px-3 py-2 text-base text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                All Resources
              </Link>
              <Link
                href="/tools"
                className="block rounded-md px-3 py-2 text-base text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Tools
              </Link>
              <Link
                href="/resources#guides"
                className="block rounded-md px-3 py-2 text-base text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Guides
              </Link>
            </div>

            {/* More */}
            <div className="my-2 h-px bg-gray-200 dark:bg-gray-800" />
            <div className="px-3 pb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              More
            </div>
            <div className="space-y-1 pl-2">
              {more.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="my-3 grid grid-cols-2 gap-2">
              <Link
                href="/newsletter"
                className="rounded-md bg-[#00957F] px-3 py-2 text-center font-semibold text-white hover:bg-[#007965]"
              >
                Subscribe
              </Link>
              <Link
                href="/community"
                className="rounded-md border border-[#00957F] px-3 py-2 text-center font-semibold text-[#00957F] hover:bg-[#E0F7F2] dark:border-teal-500 dark:text-teal-400 dark:hover:bg-gray-800"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
