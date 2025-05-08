import React from "react";

export default function NewsletterPage() {
  return (
    <section className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Join Our Newsletter</h1>
      <p className="text-lg text-gray-700 mb-8">
        Get weekly remote work tips, tool reviews, and exclusive deals delivered
        straight to your inbox.
      </p>
      <form action="/api/newsletter" method="POST" className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#00957F] focus:border-[#00957F]"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007A60] transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
