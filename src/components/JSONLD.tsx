// src/components/JSONLD.tsx
import React from "react";

interface JSONLDProps {
  data: Record<string, any>;
}

export default function JSONLD({ data }: JSONLDProps) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML е безбедно тука бидејќи data доаѓа од вашиот код
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
