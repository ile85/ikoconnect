// src/components/Footer.tsx
"use client";

import Link from "next/link";
import FeaturedInSmall from "@/components/FeaturedInSmall";
import NewsletterForm from "@/components/NewsletterForm";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

type SectionItem = { href: string; label: string };
type Section = { title: string; items: SectionItem[] };

const NAV_SECTIONS: Section[] = [
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/media-kit", label: "Media Kit" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/legal#affiliate-disclosure", label: "Affiliate Disclosure" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/legal", label: "Legal Notice" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
];

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    // TODO: поврзи со build meta или CMS за реална дата
    setLastUpdated("June 9, 2025");
  }, []);

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
      {/* Featured In */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <FeaturedInSmall />
      </div>

      {/* Newsletter */}
      <div className="bg-white py-8 dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-6">
          <NewsletterForm />
        </div>
      </div>

      {/* Navigation & Social */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        {NAV_SECTIONS.map((section) => (
          <nav key={section.title} aria-labelledby={`footer-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <h4
              id={`footer-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="mb-4 text-lg font-semibold dark:text-gray-100"
            >
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:underline hover:text-gray-900 dark:hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h4 className="mb-4 text-lg font-semibold dark:text-gray-100">Follow Us</h4>
          <div className="flex items-center space-x-4">
            <a
              href="https://x.com/ikoconnect"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Twitter / X"
              className="text-2xl hover:text-blue-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/company/ikoconnect"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="LinkedIn"
              className="text-2xl hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/ikoconnect"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Facebook"
              className="text-2xl hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/ikoconnect"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="Instagram"
              className="text-2xl hover:text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer & Copyright */}
      <div className="bg-gray-100 py-6 dark:bg-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm md:flex-row">
          <p className="text-center md:text-left">
            Некои линкови можат да бидат affiliate; можеме да добиеме мала провизија без дополнителен трошок за тебе.{" "}
            <Link href="/legal#affiliate-disclosure" className="underline hover:no-underline">
              Прочитај повеќе
            </Link>
            {lastUpdated && (
              <span className="mt-1 block text-xs italic">Last updated: {lastUpdated}</span>
            )}
          </p>
          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} <span className="font-semibold">IkoConnect</span>. All rights reserved.
          </p>
        </div>

        <p className="mx-auto mt-4 max-w-6xl px-6 text-center text-xs text-gray-500 dark:text-gray-500">
          Овој сајт користи колачиња (cookies). Погледни{" "}
          <Link href="/privacy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
