// src/components/Team.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Member {
  id: number;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  twitter: string;
  linkedin: string;
}

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    import("../../content/team.json")
      .then((mod) => setMembers(mod.default))
      .catch((err) => console.error("Could not load team JSON:", err));
  }, []);

  if (members.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading team...</p>
      </div>
    );
  }

  return (
    <section id="team" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-gray-100">
          Meet the Team
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={m.photoUrl}
                  alt={`${m.name} headshot`}
                  fill
                  sizes="96px"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {m.name}
              </h3>
              <p className="text-sm text-primary mb-2">{m.role}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {m.bio}
              </p>
              <div className="flex space-x-4">
                <a
                  href={m.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.36 8.54 8.54 0 0 1-2.7 1.03 4.27 4.27 0 0 0-7.28 3.9 12.1 12.1 0 0 1-8.78-4.45 4.27 4.27 0 0 0 1.32 5.7A4.26 4.26 0 0 1 2.8 9.7v.05a4.27 4.27 0 0 0 3.42 4.2 4.28 4.28 0 0 1-1.92.07 4.27 4.27 0 0 0 3.99 2.97 8.57 8.57 0 0 1-5.3 1.83A8.67 8.67 0 0 1 2 18.44a12.07 12.07 0 0 0 6.56 1.92c7.87 0 12.17-6.52 12.17-12.17 0-.19 0-.38-.01-.57A8.7 8.7 0 0 0 24 5.5a8.48 8.48 0 0 1-2.54.7A4.26 4.26 0 0 0 22.46 6z" />
                  </svg>
                </a>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3.5v-11h3.5v11zm-1.75-12.3c-1.12 0-2.03-.91-2.03-2.03s.91-2.03 2.03-2.03 2.03 .91 2.03 2.03-.91 2.03-2.03 2.03zm13.5 12.3h-3.5v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6h-3.5v-11h3.36v1.5h.05c.47-.89 1.63-1.83 3.35-1.83 3.58 0 4.24 2.36 4.24 5.42v6.91z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
