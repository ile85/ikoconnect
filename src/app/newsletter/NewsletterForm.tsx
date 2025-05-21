// src/app/newsletter/NewsletterForm.tsx
"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // ...fetch logic...
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="newsletter-heading"
      className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
    >
      <h2 id="newsletter-heading" className="sr-only">
        Subscribe to our newsletter
      </h2>

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
        className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#00957F] focus:border-[#00957F]"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007965] transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00957F]"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>

      {status === "success" && (
        <p role="status" className="mt-4 text-green-600 font-medium">
          Thanks for subscribing!
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-red-600 font-medium">
          Oops! Please try again.
        </p>
      )}
    </form>
  );
}
