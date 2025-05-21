// src/app/error.tsx
"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2">Oops — something went wrong</h1>
      <p className="text-gray-700 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#00957F] text-white rounded hover:bg-[#007A60]"
      >
        Try again
      </button>
    </div>
  );
}
