import { NextRequest } from "next/server";
import { join } from "path";
import { createReadStream, existsSync } from "fs";
import archiver from "archiver";

export async function GET(req: NextRequest) {
  const { ReadableStream } = require("stream/web");

  const zip = archiver("zip", { zlib: { level: 9 } });
  const { readable, writable } = new ReadableStream();

  zip.pipe(writable);

  const base = join(process.cwd(), "public/assets/press-kit");

  // Add logo
  if (existsSync(`${base}/logo/ikoconnect-square.png`)) {
    zip.file(`${base}/logo/ikoconnect-square.png`, { name: "logo-square.png" });
  }

  // Add horizontal logo
  if (existsSync(`${base}/logo/ikoconnect-horizontal.png`)) {
    zip.file(`${base}/logo/ikoconnect-horizontal.png`, { name: "logo-horizontal.png" });
  }

  // Add brand guidelines
  zip.file(join(process.cwd(), "public/assets/IkoConnect – Brand Guidelines.pdf"), {
    name: "IkoConnect – Brand Guidelines.pdf",
  });

  // Add screenshots
  zip.file(`${base}/screenshots/homepage.png`, { name: "screenshots/homepage.png" });
  zip.file(`${base}/screenshots/blog-post.png`, { name: "screenshots/blog-post.png" });
  zip.file(`${base}/screenshots/resources-page.png`, { name: "screenshots/resources-page.png" });

  // Add snippets
  zip.file(`${base}/snippets.txt`, { name: "snippets.txt" });

  zip.finalize();

  return new Response(readable, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=iko-press-kit.zip",
    },
  });
}
