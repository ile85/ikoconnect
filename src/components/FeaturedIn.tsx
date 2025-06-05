// src/components/FeaturedIn.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FeaturedItem {
  id: number;
  name: string;
  logoUrl: string;
  link?: string;
}

export default function FeaturedIn() {
  const [items, setItems] = useState<FeaturedItem[]>([]);

  useEffect(() => {
    import("../../content/featured.json")
      .then((mod) => setItems(mod.default))
      .catch((err) =>
        console.error("Failed to load featured items:", err)
      );
  }, []);

  if (items.length === 0) {
    return null; // or a simple loading placeholder
  }

  return (
    <section id="featured-in" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
          As Seen On
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link || "#"}
              target={item.link ? "_blank" : undefined}
              rel={item.link ? "noopener noreferrer" : undefined}
              className="block w-32 h-16 relative filter grayscale hover:filter-none transition duration-300"
            >
              <Image
                src={item.logoUrl}
                alt={`Logo for ${item.name}`}
                fill
                sizes="128px"
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
