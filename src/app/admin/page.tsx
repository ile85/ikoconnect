"use client";

import React, { useState } from "react";
import OGPreview from "../../components/OGPreview";

export default function AdminPage() {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const res = await fetch("/api/admin/tools/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, description, url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      setStatus("✅ " + data.message);
      setSlug(""); setName(""); setDescription(""); setUrl("");
    } catch (err: any) {
      setStatus("❌ " + err.message);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin: Add / Edit Tool</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium text-sm">Slug (ID)</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-sm">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-sm">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        {/* URL */}
        <div>
          <label className="block mb-1 font-medium text-sm">URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        {/* OG Preview */}
        {slug.trim() && <OGPreview slug={slug.trim()} />}

        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Save Tool
        </button>
      </form>
      <button
  onClick={async () => {
    setStatus("⏳ Generating posts...");
    const res = await fetch("/api/admin/generate-tool-posts");
    const data = await res.json();
    if (res.ok) {
      setStatus("✅ " + data.message);
    } else {
      setStatus("❌ " + (data.error || "Unknown error"));
    }
  }}
  type="button"
  className="mt-6 px-5 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
>
  📝 Generate Blog Posts from Tools
</button>


      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
