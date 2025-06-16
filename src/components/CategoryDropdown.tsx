"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Тип за dropdown options (ако сакаш да го прошириш)
interface Props {
  allTags: string[];
}

export default function CategoryDropdown({ allTags }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTag = searchParams.get("tag") || "";

  const [selected, setSelected] = useState(activeTag);

  useEffect(() => {
    setSelected(activeTag);
  }, [activeTag]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete("tag");
    } else {
      params.set("tag", value);
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xs mb-8">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Filter by category
      </label>
      <select
        value={selected}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="">All categories</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
