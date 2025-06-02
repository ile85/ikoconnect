// src/components/ToolsClient.tsx
"use client";

import React, { useState } from "react";
import { Tool, getAllTools } from "@/lib/tools";
import Link from "next/link";

export default function ToolsClient() {
  const allTools: Tool[] = getAllTools();

  // Local state for filters:
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<"free" | "freemium" | "paid" | "all">("all");

  // Build unique category list for chips:
  const allCategories = Array.from(
    new Set(allTools.flatMap((t) => t.categories))
  ).sort();

  // Filter logic: name/description, category, and tier:
  const filteredTools = allTools.filter((tool) => {
    const matchesQuery =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? tool.categories.includes(selectedCategory)
      : true;

    const matchesTier =
      selectedTier === "all" ? true : tool.tier === selectedTier;

    return matchesQuery && matchesCategory && matchesTier;
  });

  return (
    <section className="max-w-screen-lg mx-auto px-4 sm:px-6">
      {/* Affiliate Disclosure */}
      <div className="mb-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-l-4 border-teal-500 px-4 py-2 rounded-md">
        Disclosure: IkoConnect may earn a commission if you purchase tools through links on this page. Thanks for supporting our site!
      </div>

      {/* SEARCH + TIER FILTER (Desktop: side-by-side; Mobile: stacked) */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <input
            id="tool-search"
            type="text"
            placeholder="Search tools by name or description…"
            className="input-field w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tier Dropdown */}
        <div className="w-full md:w-48">
          <label htmlFor="tier-filter" className="sr-only">
            Filter by tier
          </label>
          <select
            id="tier-filter"
            className="
              input-field w-full
              bg-white dark:bg-gray-800
            "
            value={selectedTier}
            onChange={(e) =>
              setSelectedTier(e.target.value as "free" | "freemium" | "paid" | "all")
            }
          >
            <option value="all">All Tiers</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* CATEGORY CHIPS (always full-width row below search/tier) */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* “All” chip to reset */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`
            px-3 py-1 rounded-full text-sm font-medium transition
            ${
              selectedCategory === null
                ? "bg-[#00957F] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }
          `}
        >
          All Categories
        </button>

        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory((prev) => (prev === cat ? null : cat))
            }
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition
              ${
                selectedCategory === cat
                  ? "bg-[#00957F] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* GRID OF TOOL CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition bg-white dark:bg-gray-800"
          >
            <div>
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="h-12 inline-block mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">
                {tool.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {tool.description}
              </p>
              <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
                {tool.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center justify-between">
              {/* Tier Badge */}
              <span
                className={`
                  text-sm font-medium px-2 py-1 rounded-full
                  ${
                    tool.tier === "free"
                      ? "bg-green-100 text-green-800"
                      : tool.tier === "freemium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }
                `}
              >
                {tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}
              </span>

              {/* Visit Site Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-sm px-4 py-2"
              >
                Visit Site →
              </a>
            </div>
          </div>
        ))}

        {filteredTools.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No tools found. Try adjusting your search, category, or tier filters.
          </p>
        )}
      </div>
    </section>
  );
}
