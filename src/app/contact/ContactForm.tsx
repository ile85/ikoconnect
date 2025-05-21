// src/app/contact/ContactForm.tsx
"use client";

import React, { useState } from "react";
import Script from "next/script";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // Соберете ги вредностите преку FormData
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      // ако имате recaptcha response:
      "g-recaptcha-response": formData.get("g-recaptcha-response") as string,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* reCAPTCHA script */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="beforeInteractive"
      />

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#00957F] focus:border-[#00957F]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#00957F] focus:border-[#00957F]"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#00957F] focus:border-[#00957F]"
          />
        </div>

        {/* reCAPTCHA widget */}
        <div
          className="g-recaptcha"
          data-sitekey="6LfGQBcrAAAAAN0p4eMHPQ2gnTqpetUIAbHaVTZW"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007A60] transition"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-600">Thank you! We'll be in touch soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-600">Oops! Something went wrong.</p>
        )}
      </form>
    </>
  );
}
