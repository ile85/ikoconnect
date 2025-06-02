// src/lib/utils.ts
export function getBadgeColor(label: string): string {
  const colors: Record<string, string> = {
    "Full-Time": "bg-green-100 text-green-700",
    "Part-Time": "bg-blue-100 text-blue-700",
    "Contract": "bg-yellow-100 text-yellow-700",
    "Freelance": "bg-purple-100 text-purple-700",
    "Internship": "bg-pink-100 text-pink-700",
    "Design": "bg-indigo-100 text-indigo-700",
    "Development": "bg-cyan-100 text-cyan-700",
    "Marketing": "bg-orange-100 text-orange-700",
    "Writing": "bg-red-100 text-red-700",
    "DevOps": "bg-teal-100 text-teal-700",
    "Sales": "bg-lime-100 text-lime-700",
  };

  return colors[label] || "bg-gray-100 text-gray-700";
}
