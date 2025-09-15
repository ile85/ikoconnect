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
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <div>
        {/* Logo */}
        {logo && (
          <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-900">
            <div className="absolute inset-0 z-0 rounded-md bg-black/5 dark:bg-white/10" />
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              sizes="48px"
              className="relative z-10 object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Name */}
        <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>

        {/* Categories */}
        <div className="mb-2 flex flex-wrap gap-1">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-200"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="mb-4 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
            {features.slice(0, 3).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        {/* Tier badge */}
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            tier === "free"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : tier === "freemium"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          }`}
        >
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </span>

        {/* Visit link (affiliate safe) */}
        <a
          href={url || `/api/redirect-tools/${id}`}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-block rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          {cta} →
        </a>
      </div>
    </div>
  );
}
