// src/lib/tools.ts

// Овозможува import на JSON.
// Во tsconfig.json мораш да имаш:
// {
//   "compilerOptions": {
//     "resolveJsonModule": true,
//     "esModuleInterop": true,
//     …
// }
import raw from "../data/affiliateTools.json";

export type Tier = "free" | "freemium" | "paid";

export interface Tool {
  id: string;                 // previously slugified name
  name: string;
  description: string;
  url: string;
  logo?: string;

  // New fields, matching the enriched JSON:
  categories: string[];
  features: string[];
  tier: Tier;
  rating?: number;
}

/**
 * Сега, бидејќи affiliateTools.json секој објект веќе има "id",
 * можеме едноставно да го типизираме raw како Tool[].
 */
export const tools: Tool[] = raw as Tool[];

/** Врати ја листата со сите алатки */
export function getAllTools(): Tool[] {
  return tools;
}

/** За generateStaticParams: вратете list на id */
export function getAllToolIds(): string[] {
  return tools.map((t) => t.id);
}

/** Врати еден Tool по неговото id */
export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}
