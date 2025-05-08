import React from "react";

export default function ContactPage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <form action="/api/contact" method="POST" className="max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#00957F] focus:border-[#00957F]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
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
        {/* TODO: reCAPTCHA hidden input: <input type="hidden" name="g-recaptcha-response" /> */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007A60] transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
