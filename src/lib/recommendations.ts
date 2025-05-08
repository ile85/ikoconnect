// src/lib/recommendations.ts
import recs from "@/data/recommendations.json";

export type Recommendation = {
  name: string;
  description: string;
  url: string;
  logo: string;
};

/**
 * Враќа ја целата листа на препораки
 */
export function getAllRecommendations(): Recommendation[] {
  // Ако TypeScript ти фрла сè уште грешка, може да го каста ова:
  // return recs as unknown as Recommendation[];
  return recs;
}
