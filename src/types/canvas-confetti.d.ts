// src/types/canvas-confetti.d.ts
declare module "canvas-confetti" {
  // If you want a quick-and-dirty any-typed import:
  const confetti: any;
  export default confetti;

  // Optionally, you can type the most-common API:
  // export interface ConfettiOptions {
  //   particleCount?: number;
  //   spread?: number;
  //   startVelocity?: number;
  //   gravity?: number;
  //   origin?: { x?: number; y?: number };
  //   // …etc (see canvas-confetti docs for full API)…
  // }
  //
  // export default function confetti(
  //   opts?: ConfettiOptions
  // ): void;
}
