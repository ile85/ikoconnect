// src/components/OGPreviewSection.tsx
"use client";
import React from "react";
import OGPreview from "./OGPreview";
import { motion } from "framer-motion";

export default function OGPreviewSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          🖼 Live OG Image Preview
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 text-lg mb-8"
        >
          Instantly preview how your Open Graph image appears when shared.
        </motion.p>
        <div className="flex justify-center">
          <OGPreview slug="home" width={800} height={420} />
        </div>
      </div>
    </section>
  );
}
