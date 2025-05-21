// src/lib/url.ts
/**
 * Превзема патека (path) и враќа целосен URL со
 * фронт-енд доменот дефиниран во NEXT_PUBLIC_SITE_URL.
 */
export function absoluteUrl(path: string = "/"): string {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  // осигурај дека path почнува со “/”
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}
