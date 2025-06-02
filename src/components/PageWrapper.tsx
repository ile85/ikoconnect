// src/components/PageWrapper.tsx
import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <section className={`max-w-screen-lg mx-auto px-4 sm:px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}
