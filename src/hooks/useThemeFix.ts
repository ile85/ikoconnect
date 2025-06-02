// src/hooks/useThemeFix.ts
import { useEffect, useState } from "react";

export default function useThemeFix() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
