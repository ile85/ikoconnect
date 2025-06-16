"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function BlogHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-20 px-6 bg-gradient-to-b from-white to-[#f0fdfa] dark:from-gray-900 dark:to-gray-950 rounded-xl mb-10"
    >
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-400">
        Discover the Best Tools & Tips for Freelancers
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
        Expert-curated content, practical guides, and the most useful platforms for remote workers. Stay ahead in the freelance world.
      </p>

      <Link
        href="/newsletter"
        className="inline-flex items-center mt-6 px-6 py-3 bg-[#00957F] text-white rounded-full font-medium text-sm shadow-md hover:bg-[#007864] transition"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Subscribe to Newsletter
      </Link>
    </motion.div>
  );
}
