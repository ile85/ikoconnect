// /var/www/ikoconnect/src/app/newsletter/NewsletterForm.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [subCount, setSubCount] = useState<number | null>(null);

  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  // Simulate fetching a subscriber count (e.g., from an API) on mount
  useEffect(() => {
    async function fetchSubCount() {
      // Replace this with a real API call if desired
      // For now, just simulate a number between 1000 and 6000
      setSubCount(Math.floor(Math.random() * 5000) + 1000);
    }
    fetchSubCount();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate email before sending
    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        // Optionally update subscriber count
        setSubCount((prev) => (prev !== null ? prev + 1 : null));
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "Subscription failed. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="newsletter-heading"
      className="relative max-w-md mx-auto flex flex-col sm:flex-row gap-4 z-10"
    >
      <h2 id="newsletter-heading" className="sr-only">
        Subscribe to our newsletter
      </h2>

      <div className="flex-1 flex flex-col">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          aria-required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`flex-1 px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00957F] focus:border-[#00957F] ${
            !isValidEmail && email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {/* Inline validation message for email */}
        {!isValidEmail && email && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-red-600 text-sm"
          >
            {errorMessage || "Invalid email address."}
          </motion.p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !isValidEmail}
        className="relative px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007965] transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00957F] flex items-center justify-center"
      >
        {status === "loading" ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          "Subscribe"
        )}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-green-600 font-medium text-center"
          >
            🎉 Thanks for subscribing!
            {subCount !== null && (
              <span className="block text-sm text-gray-600 dark:text-gray-400">
                You’re subscriber #<strong>{subCount}</strong>
              </span>
            )}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-red-600 font-medium text-center"
          >
            Oops! {errorMessage || "Please try again."}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
