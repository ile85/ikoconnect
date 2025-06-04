"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PostSummary } from "@/lib/blog";

interface Props {
  posts: PostSummary[];
}

export default function BlogList({ posts }: Props) {
  if (!posts.length) {
    return <p className="text-center text-gray-500">No blog posts found.</p>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post) => {
        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <motion.div
            key={post.slug}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col border rounded-xl shadow bg-white dark:bg-gray-800 hover:shadow-lg transition overflow-hidden h-full"
            >
              {/* Logo */}
              {post.coverImage && (
                <div className="w-full h-36 flex items-center justify-center bg-gray-100 p-6 border-b">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                {/* Optional tag */}
                {post.tags?.length > 0 && (
                  <span className="text-xs bg-[#E0F7F2] text-[#00957F] rounded-full px-2 py-0.5 mb-2 w-fit font-medium">
                    {post.tags[0]}
                  </span>
                )}

                <h2 className="text-lg font-semibold text-[#00957F] leading-snug group-hover:underline line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>

                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3 flex-grow">
                  {post.excerpt || "No description available."}
                </p>

                <span className="text-sm text-[#00957F] font-medium mt-4 group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
