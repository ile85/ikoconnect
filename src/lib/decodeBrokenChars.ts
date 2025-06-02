// src/lib/decodeBrokenChars.ts
export function decodeBrokenChars(text: string): string {
  return text
    .replace(/â€™/g, "’")
    .replace(/â€“/g, "–")
    .replace(/â€”/g, "—")
    .replace(/â€œ/g, "“")
    .replace(/â€/g, "”")
    .replace(/â€/g, "'")
    .replace(/â€¦/g, "…")
    .replace(/Â/g, "")
    .replace(/\uFFFD/g, "�"); // fallback for unknown
}
