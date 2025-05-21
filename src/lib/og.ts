// src/lib/og.ts
import puppeteer from 'puppeteer';

/**
 * Generate an OG image for a given slug by rendering a special preview URL.
 */
export async function generateOgImage(slug: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    const previewUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/${slug}`;
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });

    return await page.screenshot({ type: 'png' }) as Buffer;
  } finally {
    await browser.close();
  }
}
