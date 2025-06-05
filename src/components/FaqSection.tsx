// /var/www/ikoconnect/src/components/FaqSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    import("../../content/faq.json")
      .then((mod) => setFaqs(mod.default))
      .catch((err) => console.error("Error loading FAQ JSON:", err));
  }, []);

  if (faqs.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading FAQs...</p>
      </div>
    );
  }

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item) => (
            <Disclosure key={item.id} as="div" className="overflow-hidden rounded-lg">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex justify-between items-center w-full px-6 py-4 transition
                      ${
                        open
                          ? "bg-primary/10 border-l-4 border-primary dark:bg-primary/20"
                          : item.id % 2 === 0
                          ? "bg-gray-50 border-l-4 border-transparent dark:bg-gray-800"
                          : "bg-white border-l-4 border-transparent dark:bg-gray-900"
                      }
                      hover:border-l-4 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/20
                      focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  >
                    <span
                      className={`${
                        open
                          ? "text-primary font-semibold"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDownIcon
                        className={`h-6 w-6 ${
                          open
                            ? "text-primary"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                    </motion.div>
                  </Disclosure.Button>

                  <Disclosure.Panel>
                    {({ open }) => (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: open ? 1 : 0,
                          height: open ? "auto" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`px-6 py-4 text-gray-700 dark:text-gray-300 border border-t-0 border-gray-200 dark:border-gray-700
                          ${!open ? "hidden" : ""}
                        `}
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
