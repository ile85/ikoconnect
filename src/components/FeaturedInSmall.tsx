"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// Relative path from this file → your JSON
import featuredData from "../../content/featured.json";

interface FeaturedItem {
  id: number;
  name: string;
  logoUrl: string;
  link?: string;
}

export default function FeaturedInSmall() {
  const [items, setItems] = useState<FeaturedItem[]>([]);

  useEffect(() => {
    // 🔥 only take the first 3 entries
    const firstThree = (featuredData as FeaturedItem[]).slice(0, 3);
    setItems(firstThree);
  }, []);

  if (items.length === 0) {
    // nothing to show (still loading or no data)
    return null;
  }

  return (
    <div className="mt-8 flex justify-center items-center space-x-6">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link ?? "#"}
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
