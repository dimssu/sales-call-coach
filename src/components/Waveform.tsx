"use client";

import { useMemo } from "react";

// Deterministic pseudo-random
const seedRand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export function Waveform({
  durationLabel,
  positionLabel,
  progress,
  markers = [],
  bars = 96,
}: {
  durationLabel: string;
  positionLabel: string;
  progress: number; // 0..1
  markers?: { progress: number; color: string; label: string }[];
  bars?: number;
}) {
  const heights = useMemo(() => {
    const r = seedRand(42);
    return Array.from({ length: bars }, (_, i) => {
      // Mix of envelope + noise
      const env =
        0.4 +
        0.45 *
          Math.sin((i / bars) * Math.PI * 1.6) *
          Math.cos((i / bars) * Math.PI * 0.6);
      const noise = (r() - 0.4) * 0.7;
      return Math.max(0.12, Math.min(1, env + noise));
    });
  }, [bars]);

  return (
    <div className="relative h-24 w-full">
      <div className="absolute inset-0 flex items-center gap-[2px]">
        {heights.map((h, i) => {
          const before = i / bars < progress;
          return (
            <div
              key={i}
              className="flex-1 rounded-[2px]"
              style={{
                height: `${h * 80}%`,
                background: before ? "var(--accent)" : "var(--border-strong)",
                opacity: before ? 1 : 0.7,
              }}
            />
          );
        })}
      </div>

      {/* Markers */}
      {markers.map((m, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 flex items-start"
          style={{ left: `${m.progress * 100}%` }}
          title={m.label}
        >
          <div
            className="w-px h-full -translate-x-px"
            style={{ background: m.color, opacity: 0.5 }}
          />
          <div
            className="absolute -top-1.5 left-0 -translate-x-1/2 size-1.5 rounded-full"
            style={{ background: m.color }}
          />
        </div>
      ))}

      {/* Playhead */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-text/80 -translate-x-px"
        style={{ left: `${progress * 100}%` }}
      >
        <div className="absolute -top-1 -left-1 size-2 rounded-full bg-text" />
      </div>

      {/* Time labels */}
      <div className="absolute -bottom-5 inset-x-0 flex justify-between text-[10px] font-mono tabular text-text-faint">
        <span>0:00</span>
        <span className="text-text">{positionLabel}</span>
        <span>{durationLabel}</span>
      </div>
    </div>
  );
}
