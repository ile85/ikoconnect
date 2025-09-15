// src/components/CopyButton.tsx
"use client";

import { useState, useCallback } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState<"idle" | "ok" | "err">("idle");

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback textarea
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied("ok");
      setTimeout(() => setCopied("idle"), 2000);
    } catch {
      setCopied("err");
      setTimeout(() => setCopied("idle"), 2000);
    }
  }, [text]);

  const handleShare = useCallback(async () => {
    try {
      if ((navigator as any)?.share) {
        await (navigator as any).share({ url: text });
      } else {
        await handleCopy();
      }
    } catch {
      // ignore
    }
  }, [text, handleCopy]);

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleCopy}
        aria-live="polite"
        aria-label="Copy link to clipboard"
        className="text-sm underline text-[#00957F] hover:text-[#007965] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        {copied === "ok" ? "Copied!" : copied === "err" ? "Error — copy again" : "Copy link"}
      </button>

      <button
        onClick={handleShare}
        aria-label="Share"
        className="text-sm text-gray-500 underline decoration-dotted hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
      >
        Share
      </button>
    </div>
  );
}
