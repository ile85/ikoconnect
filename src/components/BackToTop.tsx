// /var/www/ikoconnect/src/components/BackToTop.tsx
"use client";

import React from "react";

export default function BackToTop() {
  return (
    <div className="mt-12 text-center">
      <a
        href="#faq"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-primary hover:underline"
      >
        Back to top
      </a>
    </div>
  );
}
