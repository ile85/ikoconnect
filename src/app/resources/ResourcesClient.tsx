"use client";

import React, { useState, useMemo } from "react";
import { Tool, getAllTools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function ResourcesClient() {
  const allTools: Tool[] = getAllTools();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<"all" | "free" | "freemium" | "paid">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const allCategories = useMemo(() => {
    const setCat = new Set<string>();
    allTools.forEach((t) => {
      t.categories.forEach((c) => setCat.add(c));
    });
    return Array.from(setCat).sort();
  }, [allTools]);

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
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
  }, [allTools, searchQuery, selectedCategory, selectedTier]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);

  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTools.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <section className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16">
      <div className="mb-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-l-4 border-teal-500 px-4 py-2 rounded-md">
        Disclosure: IkoConnect may earn a commission if you purchase tools through links on this page. Thanks for supporting our site!
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <input
            id="tool-search"
            type="text"
            placeholder="Search tools by name or description…"
            className="input-field w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange();
            }}
          />
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="tier-filter" className="sr-only">
            Filter by tier
          </label>
          <select
            id="tier-filter"
            className="input-field w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={selectedTier}
            onChange={(e) => {
              setSelectedTier(e.target.value as "all" | "free" | "freemium" | "paid");
              handleFilterChange();
            }}
          >
            <option value="all">All Tiers</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => {
            setSelectedCategory(null);
            handleFilterChange();
          }}
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
            onClick={() => {
              setSelectedCategory((prev) => (prev === cat ? null : cat));
              handleFilterChange();
            }}
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

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedTools.map((tool) => (
          <ToolCard key={tool.id} {...tool} cta="Learn More" />
        ))}

        {paginatedTools.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No tools found. Try adjusting your search, category, or tier filters.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`
              px-4 py-2 rounded-lg font-medium transition
              ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            ← Previous
          </button>

          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`
              px-4 py-2 rounded-lg font-medium transition
              ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            Next →
          </button>
        </nav>
      )}
    </section>
  );
}
