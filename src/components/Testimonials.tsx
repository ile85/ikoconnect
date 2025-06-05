// src/components/Testimonials.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  photoUrl: string;
  quote: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Dynamically pull the JSON file from /content
    import("../../content/blog/testimonials.json")
      .then((mod) => setTestimonials(mod.default))
      .catch((err) => console.error("Error loading testimonials:", err));
  }, []);

  if (testimonials.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Loading testimonials...
        </p>
      </div>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
          What People Are Saying
        </h2>

        {/* Grid for larger screens, single column on mobile */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8 flex flex-col items-center text-center"
            >
              {/* Photo circle */}
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={t.photoUrl}
                  alt={`${t.name} headshot`}
                  fill
                  sizes="96px"
                  className="rounded-full object-cover"
                />
              </div>
              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-300 italic mb-6">
                “{t.quote}”
              </blockquote>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {t.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.role}
                <span className="text-gray-400 dark:text-gray-500">, </span>
                <span className="font-light">{t.company}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
