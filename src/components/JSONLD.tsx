import React from "react";

interface JSONLDProps {
  data: Record<string, any>;
}

export default function JSONLD({ data }: JSONLDProps) {
  return (
    <script
      key="jsonld"
      type="application/ld+json"
      // БЕЗБЕДНО: content доаѓа само од backend или строго дефинирани објекти
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}
