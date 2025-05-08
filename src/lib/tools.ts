// src/lib/tools.ts
import tools from "@/data/affiliateTools.json";
export type Tool = {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  tags: string[];
};
export function getAllTools(): Tool[] {
  return tools as Tool[];
}
