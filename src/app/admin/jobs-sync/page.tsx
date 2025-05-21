// src/app/admin/jobs-sync/page.tsx
"use client";

import React, { useState } from "react";

export default function JobSyncPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSync() {
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/update-jobs");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");
      setStatus("success");
      setMessage(data.message);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  return (
    <section className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">🔄 Sync Remote Jobs</h1>
      <p className="mb-8 text-gray-600">
        Click below to pull fresh jobs from the API and store them in <code>data/jobs.json</code>.
      </p>

      <button
        onClick={handleSync}
        disabled={status === "loading"}
        className="px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007965] transition"
      >
        {status === "loading" ? "Updating..." : "🔄 Update Jobs Now"}
      </button>

      {status !== "idle" && (
        <p className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </section>
  );
}
