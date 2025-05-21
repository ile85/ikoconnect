// src/components/RecommendationsList.tsx
import React from "react";
import Image from "next/image";


interface Recommendation {
  name: string;
  url: string;
  logo?: string;
}

interface Props {
  items: Recommendation[];
}

export default function RecommendationsList({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((rec) => (
        <article
          key={rec.url}
          className="p-4 border rounded-lg hover:shadow-md transition"
        >
          {rec.logo && (
            <div className="mb-4 flex justify-center">
              <Image
                src={rec.logo}
                alt={`${rec.name} logo`}
                width={64}
                height={64}
                className="object-contain"
                priority={false}
              />
            </div>
          )}
          <h3 className="text-lg font-semibold text-center">{rec.name}</h3>
          <a
            href={rec.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-center text-teal-600 hover:underline"
          >
            Visit
          </a>
        </article>
      ))}
    </div>
  );
}
