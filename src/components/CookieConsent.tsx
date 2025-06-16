"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-gray-900 text-white p-4 rounded-xl shadow-xl max-w-xl mx-auto text-sm flex flex-col md:flex-row justify-between items-center gap-3">
      <p>
        We use cookies to improve your experience. By using our site, you agree
        to our{" "}
        <a href="/privacy" className="underline text-white hover:text-gray-300">
          Privacy Policy
        </a>
        .
      </p>
      <button
        onClick={accept}
        className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200"
      >
        Accept
      </button>
    </div>
  );
}
