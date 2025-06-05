// /src/lib/fixEncoding.ts
import he from "he";
import { decode } from "iconv-lite";


export function fixEncoding(input: string, from: BufferEncoding = "latin1") {
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
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&copy;/g, "©")
    .trim();

  // 3) Double‐decode (Latin-1 → UTF-8)
  if (/Ã[¡-ÿ]/.test(str)) {
    const bytes = Uint8Array.from([...str].map((c) => c.charCodeAt(0)));
    str = new TextDecoder("utf-8").decode(bytes);
  }


  // 4) Normalize whitespace
  return decode(Buffer.from(input, "binary"), from);
  } catch {
    return input;
  }
}