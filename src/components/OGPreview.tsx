"use client";
import React, { useEffect, useState } from "react";

interface OGPreviewProps {
  slug: string;
  width?: number;
  height?: number;
}

export default function OGPreview({ slug, width = 1200, height = 630 }: OGPreviewProps) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!slug) return;
    const url = `/api/og/${slug}?t=${Date.now()}`; // avoid cache
    setSrc(url);
  }, [slug]);

  if (!src) return null;

  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground mb-2">OG Preview:</p>
      <img
        src={src}
        alt={`OG image for ${slug}`}
        width={width}
        height={height}
        className="rounded shadow border"
      />
    </div>
  );
}
