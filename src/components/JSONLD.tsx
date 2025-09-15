"use client";
import React from "react";

export type JSONLDData =
  | Record<string, any>
  | Record<string, any>[];

interface JSONLDProps {
  data: JSONLDData;
  id?: string; // за уникатен key ако има повеќе script-ови
}

export default function JSONLD({ data, id }: JSONLDProps) {
  // Ако е array => ќе инјектираме повеќе <script>
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((entry, i) => (
          <script
            key={id ? `${id}-${i}` : `jsonld-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
      </>
    );
  }

  return (
    <script
      key={id || "jsonld"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
