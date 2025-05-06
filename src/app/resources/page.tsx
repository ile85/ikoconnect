// src/app/resources/page.tsx
"use client";

import { useState } from "react";
import toolsData from "@/data/affiliateTools.json";

type Tool = {
  name: string;
  description: string;
  url: string;
  tags: string[];
};

const tools = toolsData as Tool[];

export default function ResourcesPage() {
  const allTags = Array.from(new Set(tools.flatMap((t) => t.tags)));
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? tools.filter((t) => t.tags.includes(activeTag))
    : tools;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Resources</h1>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          key="all"
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full ${
            activeTag === null
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full ${
              activeTag === tag
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Tool cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((tool) => (
          <a
            key={tool.url}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 border rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
            <div className="text-xs text-gray-400">
              {tool.tags.join(", ")}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
