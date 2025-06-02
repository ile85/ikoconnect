// src/lib/readFileUTF8.ts
import fs from "fs";
import iconv from "iconv-lite";

/**
 * Reads a file as UTF-8, falling back to Windows-1252 if needed.
 */
export function readFileAsUTF8(filePath: string): string {
  const buffer = fs.readFileSync(filePath);
  try {
    // Try UTF-8 first
    return iconv.decode(buffer, "utf-8");
  } catch {
    // Fallback to Windows-1252
    return iconv.decode(buffer, "windows-1252");
  }
}
