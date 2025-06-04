// src/lib/fixEncoding.ts
import he from "he";
import iconv from "iconv-lite";

/**
 * Attempts to fix common encoding issues in job descriptions.
 * First decodes HTML entities then, if the text appears to be
 * misinterpreted as Latin-1, decodes it using iconv-lite.
 */
export function fixEncoding(input: string): string {
  try {
    let str = he.decode(input);

    // Detect sequences that typically indicate UTF-8 bytes interpreted as Latin-1
    if (/[\u00c2-\u00f4][\u0080-\u00bf]/.test(str)) {
      const buf = Buffer.from(str, "binary");
      str = iconv.decode(buf, "utf8");
    }

    return str;
  } catch {
    return input;
  }
}
