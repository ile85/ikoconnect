// src/components/Footer.tsx
"use client";

import Link from "next/link";
import FeaturedInSmall from "@/components/FeaturedInSmall";
import NewsletterForm from "@/components/NewsletterForm";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

const NAV_SECTIONS = [
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/media-kit", label: "Media Kit" },
      { href: "/newsletter", label: "Newsletter" },
    ],
  },
  {
    title: "Legal & Help",
    items: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/legal", label: "Legal" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    // Ideally sourced from build metadata or CMS
    setLastUpdated("June 9, 2025");
  }, []);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16 border-t border-gray-200 dark:border-gray-700">
      {/* Featured In */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <FeaturedInSmall />
      </div>

      {/* Newsletter */}
      <div className="bg-white dark:bg-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <NewsletterForm />
        </div>
      </div>

      {/* Navigation & Social */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-100">
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
          </div>
        ))}

        <div>
          <h4 className="text-lg font-semibold mb-4 dark:text-gray-100">Follow Us</h4>
          <div className="flex items-center space-x-4">
            <a
              href="https://x.com/ikoconnect"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-2xl hover:text-blue-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/company/ikoconnect"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-2xl hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/ikoconnect"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-2xl hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/ikoconnect"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-2xl hover:text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer & Copyright */}
      <div className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0">
            Some links may be affiliate links that earn us a small commission at no extra cost to you.
            {lastUpdated && (
              <span className="block mt-1 text-xs italic">
                Last updated: {lastUpdated}
              </span>
            )}
          </p>
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold">IkoConnect</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
