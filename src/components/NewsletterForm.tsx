// src/components/NewsletterForm.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [subCount, setSubCount] = useState<number | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  // fetch a fake subscriber count only on client
  useEffect(() => {
    const count = Math.floor(Math.random() * 5000) + 1000;
    setSubCount(count);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
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

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setSubCount((prev) => (prev !== null ? prev + 1 : prev));
      } else {
        setErrorMessage(data.message || "Subscription failed. Please try again.");
        setStatus("error");
      }
    } catch {
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
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
            Oops! {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
