"use client";

import React from "react";
import Image from "next/image";

export interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  logo?: string;
  categories: string[];
  tier: "free" | "freemium" | "paid";
  features?: string[];
  url?: string; 
  cta: string;
}

export default function ToolCard({
  id,
  name,
  description,
  logo,
  categories,
  tier,
  features,
  url,
 cta,
}: ToolCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between">
      <div>
        {/* Logo */}
        {logo && (
          <div className="relative w-12 h-12 mb-4">
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              sizes="48px"
              className="object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {name}
        </h3>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="list-disc list-inside mb-4 text-sm text-gray-600 dark:text-gray-400">
            {features.slice(0, 3).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between">
        {/* Tier badge */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            tier === "free"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : tier === "freemium"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          }`}
        >
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </span>

        {/* Visit link */}
        <a
          href={url || `/api/redirect-tools/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-full transition"
        >
          Visit Site →
        </a>
      </div>
    </div>
  );
}
