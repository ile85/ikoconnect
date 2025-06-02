// src/lib/htmlUtils.ts
import { JSDOM } from "jsdom";

export function cleanHtml(html: string): string {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Remove empty paragraphs and <br> wrappers
  document.querySelectorAll("p").forEach((p) => {
    const content = p.textContent?.replace(/\s|\u00a0/g, "");
    if (!content) p.remove();
  });

  // Optional: trim leading/trailing newlines and extra whitespace
  return document.body.innerHTML.trim();
}
