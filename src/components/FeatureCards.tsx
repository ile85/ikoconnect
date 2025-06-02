// /var/www/ikoconnect/src/components/FeatureCards.tsx
"use client";

import { motion } from "framer-motion";
import {
  LucideRocket,
  LucideSearch,
  LucideShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <LucideSearch className="h-6 w-6 text-primary" />,
    title: "Curated Tools",
    description:
      "Save time by accessing only top-rated AI, productivity, and marketing tools.",
  },
  {
    icon: <LucideShieldCheck className="h-6 w-6 text-primary" />,
    title: "Trusted Reviews",
    description:
      "We test and verify each tool so you don't have to guess what works.",
  },
  {
    icon: <LucideRocket className="h-6 w-6 text-primary" />,
    title: "Freelance Focused",
    description:
      "Everything is tailored for freelancers, remote workers, and digital nomads.",
  },
];

export default function FeatureCards() {
  return (
    <section className="relative overflow-hidden bg-background py-16">
      {/* Animated gradient glow behind cards */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-[#E0FFF9]/40 via-[#D5FAF0]/40 to-[#E0FFF9]/40
          bg-[length:200%_200%]
          animate-gradient-pan
          z-0
        "
      />

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Why Use IkoConnect?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Everything you need to grow your freelance business in one place.
        </motion.p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label={`Feature: ${feature.title}`}
              className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
