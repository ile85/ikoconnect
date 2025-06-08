// /var/www/ikoconnect/src/components/Footer.tsx
"use client";

import Link from "next/link";
import FeaturedInSmall from "@/components/FeaturedInSmall";
import NewsletterForm from "@/app/newsletter/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t mt-12 text-sm text-gray-600 dark:text-gray-400">
      {/* ─── Top Section: Links & Copyright ─── */}
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          &copy; {currentYear}{" "}
          <span className="font-semibold text-primary">IkoConnect</span>. All rights reserved.
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
          <Link href="/terms" className="hover:text-primary hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-primary hover:underline">
            Privacy
          </Link>
          <Link href="/legal" className="hover:text-primary hover:underline">
            Legal
          </Link>
          <Link href="/faq" className="hover:text-primary hover:underline">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-primary hover:underline">
            Contact
          </Link>
          <Link href="/testimonials" className="hover:text-primary hover:underline">
            Testimonials
          </Link>
          <Link href="/about" className="hover:text-primary hover:underline">
            About
          </Link>
        </div>
      </div>

      {/* ─── FeaturedInSmall Badges ─── */}
      <div className="max-w-6xl mx-auto px-4 pb-6 flex justify-center">
        <FeaturedInSmall />
      </div>

      {/* ─── Full Newsletter Form ─── */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <NewsletterForm />
      </div>

      {/* ─── Follow Us Link ─── */}
      <div className="max-w-6xl mx-auto px-4 pb-6 text-center">
        <a
          href="https://x.com/ikoconnect"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-blue-500 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
          <span>Follow @ikoconnect</span>
        </a>
      </div>

      {/* ─── Affiliate Disclaimer ─── */}
      <div className="text-center text-xs px-4 pb-6 text-gray-500 dark:text-gray-400">
        Some job links may be affiliate links that help us earn a small commission. Thank you for supporting IkoConnect.
      </div>
    </footer>
  );
}
