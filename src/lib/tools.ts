// src/lib/tools.ts
import affiliateToolsData from "@/data/affiliateTools.json";

// Ова е вашиот Tool интерфејс. Ја задржуваме union типизацијата за tier:
export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  categories: string[];
  features?: string[];
  tier: "free" | "freemium" | "paid"; // Union од овие три вредности
  rating?: number;
  tags?: string[]; 
}

// Оваа линија ќе го „фрли“ affiliateToolsData кон Tool[] и ќе го спречи
// TypeScript да се жали дека фактулните JSON вредности (string) не се точни literal union:
export const tools: Tool[] = affiliateToolsData as Tool[];

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getAllToolIds(): string[] {
  return tools.map((t) => t.id);
}
