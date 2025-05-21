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
      {posts.map((post) => {
        const date = new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

        return (
          <motion.li
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="border rounded-xl p-6 shadow hover:shadow-md transition-all bg-white"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="flex flex-col sm:flex-row gap-4">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full sm:w-48 h-32 object-cover rounded-md"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-[#00957F] hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{date}</p>
                  <p className="mt-2 text-gray-700 text-sm">
                    {post.excerpt || "No description available."}
                  </p>
                </div>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
