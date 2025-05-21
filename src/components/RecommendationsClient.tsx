// src/components/RecommendationsClient.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { Recommendation } from "@/lib/recommendations";

// Lazy‐load вистинскиот RecommendationsList
const RecommendationsList = dynamic(
  () => import("./RecommendationsList"),
  {
    loading: () => <p className="text-center py-8">Loading recommendations…</p>,
    ssr: false,
  }
);

interface Props {
  items: Recommendation[];
}

export default function RecommendationsClient({ items }: Props) {
  return <RecommendationsList items={items} />;
}
