// src/components/BlogList.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import React from "react";

interface Props {
  posts: PostSummary[];
}

export default function BlogList({ posts }: Props) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-6"
    >
      {posts.map((post) => (
        <motion.li
          key={post.slug}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="border rounded-xl p-6 shadow hover:shadow-md transition-all"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{post.date}</p>
            <p className="text-gray-700 mt-3">{post.excerpt}</p>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
