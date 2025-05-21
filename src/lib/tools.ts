// src/lib/tools.ts

// Овозможува import на JSON
// Во tsconfig.json мораш да имаш:
// {
//   "compilerOptions": {
//     "resolveJsonModule": true,
//     "esModuleInterop": true,
//     …
import raw from '@/data/affiliateTools.json';

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  tags?: string[];
  ogImage?: string;
}

// Генерираме типизиран масив од JSON и автоматски сетуваме id
const tools: Tool[] = (raw as Omit<Tool, 'id'>[]).map((t) => {
  // slugify на name → id
  const id = t.name
    .toLowerCase()
    .replace(/’/g, '')            // отстрани апострофи
    .replace(/[^a-z0-9]+/g, '-')  // нек-алфанумерички → црта
    .replace(/(^-|-$)/g, '');     // тримирај црти на рабовите

  return {
    id,
    name: t.name,
    description: t.description,
    url: t.url,
    logo: t.logo,
    tags: t.tags,
    ogImage: t.logo,  // ако сакаш да користиш логото како OG
  };
});

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
