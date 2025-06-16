"use client";
import Link from "next/link";

interface Crumb {
  href: string;
  label: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap space-x-2">
        {items.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2">/</span>}
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
