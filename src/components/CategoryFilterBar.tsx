// components/CategoryFilterBar.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  "Freelancing",
  "Remote Work",
  "Productivity",
  "Tools",
  "Design",
  "Marketing",
  "Development",
  "Communication",
  "Finance",
  "E-commerce",
];

export default function CategoryFilterBar() {
  const searchParams = useSearchParams();
  const active = searchParams.get("tag");

  return (
    <div className="overflow-x-auto mb-8 scrollbar-hide">
      <div className="flex gap-3 px-1 whitespace-nowrap">
        <Link
          href="/blog"
          className={`px-4 py-1 rounded-full border text-sm transition ${
            !active
              ? "bg-[#00957F] text-white border-[#00957F]"
              : "hover:bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?tag=${encodeURIComponent(cat)}`}
            className={`px-4 py-1 rounded-full border text-sm transition ${
              active === cat
                ? "bg-[#00957F] text-white border-[#00957F]"
                : "hover:bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
        