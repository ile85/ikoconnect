// /var/www/ikoconnect/src/components/BlogComments.tsx
"use client";

import React from "react";
import Giscus from "@giscus/react";

interface BlogCommentsProps {
  /** We pass the page's URL path so giscus can map to a unique thread */
  urlPath: string;
}

export default function BlogComments({ urlPath }: BlogCommentsProps) {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <Giscus
        repo="ile85/ikoconnect"
        repoId="R_kgDOExampleID"
        category="Q&A"
        categoryId="DIC_kwDOExampleCategoryID"
        mapping="pathname"
        term={urlPath}
        reactionsEnabled="1"
        emitMetadata="0"
        theme="light"
        lang="en"
      />
    </div>
  );
}
