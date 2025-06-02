// /src/lib/fixEncoding.ts
import he from "he";


export function fixEncoding(input: string): string {
  try {
  // 1) HTML entities
  let str = he.decode(input);

  // 2) Legacy замени
  str = str
    .replace(/â|â/g, '"')
    .replace(/â¦/g, "…")
    .replace(/â/g, "–")
    .replace(/â/g, "—")
    .replace(/â¢/g, "•")
    .replace(/â˜|â™/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

  // 3) Double‐decode (Latin-1 → UTF-8)
  if (/Ã[¡-ÿ]/.test(str)) {
    const bytes = Uint8Array.from([...str].map((c) => c.charCodeAt(0)));
    str = new TextDecoder("utf-8").decode(bytes);
  }

  // 4) Normalize whitespace
  return decodeURIComponent(escape(input));
  } catch {
    return input;
  }
}
