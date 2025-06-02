// /var/www/ikoconnect/src/app/resources/ResourcesClient.tsx
"use client";

import React, { useState } from "react";
import type { Tool } from "@/lib/tools";

interface Props {
  tools: Tool[];
}

export default function ResourcesClient({ tools }: Props) {
  // Collect all unique tags
  const allTags = Array.from(
    new Set(tools.flatMap((t) => t.tags ?? []))
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter tools by the selected tag (or show all if none)
  const filtered = activeTag
    ? tools.filter((t) => (t.tags ?? []).includes(activeTag))
    : tools;

  return (
    <>
      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
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

      {/* Tool cards grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((tool) => (
          <a
            key={tool.id}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 border rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
            <div className="text-xs text-gray-400">
              {(tool.tags ?? []).join(", ")}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
