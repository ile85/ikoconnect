// /var/www/ikoconnect/src/components/BlogList.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import React from "react";

interface Props {
  posts: PostSummary[];
}

export default function BlogList({ posts }: Props) {
  if (!posts.length) {
    return (
      <p className="text-center text-gray-500">No blog posts found.</p>
    );
  }

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
        // Format date, e.g. "June 1, 2025"
        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric",
        });

        return (
          <motion.li
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="border rounded-xl p-4 shadow hover:shadow-md transition-all bg-white dark:bg-gray-800"
          >
            {/* “group” on Link allows group-hover if you want it later */}
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="flex flex-col sm:flex-row gap-4">
                {post.coverImage && (
                  <div
                    className="
                      w-full          /* full width on mobile */
                      sm:w-48         /* 12rem width on ≥sm */
                      h-32            /* fixed 8rem height */
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-md
                    "
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      // Force the image to never exceed the 12rem×8rem box:
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-[#00957F] hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
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
