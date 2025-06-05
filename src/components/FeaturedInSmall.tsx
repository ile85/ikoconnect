// src/components/FeaturedInSmall.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FeaturedItem {
  id: number;
  name: string;
  logoUrl: string;
  link?: string;
}

export default function FeaturedInSmall() {
  const [items, setItems] = useState<FeaturedItem[]>([]);

  useEffect(() => {
    import("../../content/featured.json")
      .then((mod) => setItems(mod.default.slice(0, 3))) // show only first 3
      .catch((err) => console.error("Error loading featured:", err));
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mt-8 flex justify-center items-center space-x-6">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link || "#"}
          target={item.link ? "_blank" : undefined}
          rel={item.link ? "noopener noreferrer" : undefined}
          className="relative w-24 h-10 filter grayscale hover:filter-none transition duration-300"
        >
          <Image
            src={item.logoUrl}
            alt={`Logo for ${item.name}`}
            fill
            sizes="96px"
            className="object-contain"
          />
        </a>
      ))}
    </div>
  );
}
