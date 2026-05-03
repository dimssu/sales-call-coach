"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  AlertTriangle,
  Crown,
  ShieldAlert,
  Megaphone,
  ArrowRight,
  Play,
  Filter,
  CalendarRange,
} from "lucide-react";
import { REPS } from "@/data/reps";
import { SCORECARDS, type CoachingClipType } from "@/data/coaching";
import { Avatar } from "@/components/Avatar";
import { TrendChart, type TrendSeries } from "@/components/TrendChart";
import { formatDuration, formatTimestamp } from "@/lib/format";

const CLIP_STYLE: Record<
  CoachingClipType,
  { icon: typeof Target; bg: string; color: string; ring: string; label: string }
> = {
  discovery: { icon: Target, bg: "bg-sky-50", color: "text-sky-700", ring: "ring-sky-200", label: "Discovery" },
  filler: { icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-700", ring: "ring-amber-200", label: "Filler" },
  objection: { icon: ShieldAlert, bg: "bg-rose-50", color: "text-rose-700", ring: "ring-rose-200", label: "Objection" },
  talkover: { icon: Megaphone, bg: "bg-orange-50", color: "text-orange-700", ring: "ring-orange-200", label: "Talkover" },
  value: { icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-700", ring: "ring-emerald-200", label: "Value" },
  "next-step": { icon: ArrowRight, bg: "bg-violet-50", color: "text-violet-700", ring: "ring-violet-200", label: "Next step" },
  competitor: { icon: AlertTriangle, bg: "bg-fuchsia-50", color: "text-fuchsia-700", ring: "ring-fuchsia-200", label: "Competitor" },
  champion: { icon: Crown, bg: "bg-amber-50", color: "text-amber-700", ring: "ring-amber-200", label: "Champion" },
};

const SEVERITY = {
  low: "text-good bg-good-soft",
  med: "text-warn bg-warn-soft",
  high: "text-bad bg-bad-soft",
};

function MetricTile({
  label,
  value,
  unit,
  delta,
  goal,
  format = "num",
}: {
  label: string;
  value: number;
  unit?: string;
  delta: number;
  goal?: number;
  format?: "pct" | "num" | "decimal";
}) {
  const positive = delta >= 0;
  const display =
    format === "decimal" ? value.toFixed(1) : Math.round(value).toString();
  const onTrack = goal !== undefined && value >= goal;
  return (
    <div className="rounded-xl border border-border bg-bg-elev p-4 flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-text-faint font-medium">
        <span className="truncate">{label}</span>
        {goal !== undefined && (
          <span
            className={[
              "px-1.5 h-4 inline-flex items-center rounded text-[9.5px] font-medium font-mono tabular",
              onTrack ? "bg-good-soft text-good" : "bg-bg-sunk text-text-mute",
            ].join(" ")}
          >
            goal {goal}
            {format === "pct" ? "%" : ""}
          </span>
        )}
      </div>
      <div className="flex items-end gap-1.5 leading-none">
        <span className="font-display text-[28px] font-semibold tabular">
          {display}
        </span>
        {unit && (
          <span className="text-[14px] text-text-mute pb-1 font-medium">
            {unit}
          </span>
        )}
      </div>
      <div
        className={[
          "inline-flex items-center gap-1 text-[11px] font-medium",
          positive ? "text-good" : "text-bad",
        ].join(" ")}
      >
        {positive ? (
          <TrendingUp className="size-3" />
        ) : (
          <TrendingDown className="size-3" />
        )}
        {positive ? "+" : ""}
        {delta.toFixed(1)}%
        <span className="text-text-faint font-normal ml-0.5">
          vs prior 12w
        </span>
      </div>
    </div>
  );
}

export function Scorecard() {
  const [activeRepId, setActiveRepId] = useState("r1");
  const rep = REPS.find((r) => r.id === activeRepId)!;
  const sc = SCORECARDS[activeRepId];

  const labels = sc.trends.map((t) => t.week);
  const series: TrendSeries[] = [
    {
      key: "score",
      label: "Avg score",
      color: "#ec4899",
      data: sc.trends.map((t) => t.avgScore),
    },
    {
      key: "talk",
      label: "Talk ratio",
      color: "#0ea5e9",
      data: sc.trends.map((t) => t.talkRatio),
    },
    {
      key: "qs",
      label: "Discovery Qs",
      color: "#7c3aed",
      data: sc.trends.map((t) => t.discoveryQs * 7),
    },
  ];

  return (
    <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-text-faint font-medium">
            <Award className="size-3" />
            Rep performance
          </div>
          <h1 className="font-display text-[28px] font-semibold mt-1 tracking-tight">
            Scorecard
          </h1>
          <p className="text-[13px] text-text-mute mt-0.5">
            12-week trends, AI-flagged coaching clips, and team benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] hover:bg-bg-sunk transition-colors">
            <CalendarRange className="size-3.5" />
            Last 12 weeks
          </button>
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] hover:bg-bg-sunk transition-colors">
            <Filter className="size-3.5" />
            All call types
          </button>
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md bg-text text-bg-elev text-[12.5px] font-medium hover:bg-text/85 transition-colors">
            <Sparkles className="size-3.5" />
            Generate plan
          </button>
        </div>
      </div>

      {/* Rep selector */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto py-1 -my-1">
        {REPS.map((r) => {
          const active = activeRepId === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRepId(r.id)}
              className={[
                "h-9 pl-1 pr-3 inline-flex items-center gap-2 rounded-full border transition-colors duration-200 shrink-0",
                active
                  ? "border-text bg-text text-bg-elev"
                  : "border-border bg-bg-elev text-text-mute hover:text-text hover:border-border-strong",
              ].join(" ")}
            >
              <Avatar name={r.name} size="md" />
              <span className="text-[12.5px] font-medium">{r.name}</span>
              <span
                className={[
                  "font-mono tabular text-[10.5px] px-1 h-4 inline-flex items-center rounded",
                  active ? "bg-bg-elev/15 text-bg-elev" : "bg-bg-sunk text-text-faint",
                ].join(" ")}
              >
                {SCORECARDS[r.id].metrics.avgScore.value}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rep header */}
      <motion.div
        key={rep.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="mt-5 rounded-xl border border-border bg-bg-elev p-5 flex items-center gap-4 flex-wrap"
      >
        <Avatar name={rep.name} size="xl" />
        <div className="min-w-0">
          <div className="text-[11.5px] text-text-mute">
            {rep.role} · {rep.region} · joined{" "}
            {new Date(rep.hireDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>
          <h2 className="font-display text-[22px] font-semibold leading-tight">
            {rep.name}
          </h2>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint font-medium">
              Trend (12w)
            </div>
            <div className="text-[12.5px] font-medium text-good inline-flex items-center gap-1 mt-0.5">
              <TrendingUp className="size-3.5" />
              {sc.metrics.avgScore.delta > 0 ? "+" : ""}
              {sc.metrics.avgScore.delta.toFixed(1)} pts
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint font-medium">
              Team rank
            </div>
            <div className="text-[12.5px] font-medium mt-0.5 font-mono tabular">
              #
              {[...REPS]
                .sort(
                  (a, b) =>
                    SCORECARDS[b.id].metrics.avgScore.value -
                    SCORECARDS[a.id].metrics.avgScore.value,
                )
                .findIndex((r) => r.id === rep.id) + 1}{" "}
              <span className="text-text-faint font-normal">
                of {REPS.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
        {Object.values(sc.metrics).map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
          >
            <MetricTile {...m} />
          </motion.div>
        ))}
      </div>

      {/* Trends */}
      <div className="mt-6 rounded-xl border border-border bg-bg-elev p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-[16px] font-semibold tracking-tight">
              12-week trend
            </h3>
            <p className="text-[12px] text-text-mute mt-0.5">
              Score, talk ratio, and discovery questions per call (scaled).
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11.5px]">
            {series.map((s) => (
              <span key={s.key} className="inline-flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-text-mute">{s.label}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <TrendChart series={series} labels={labels} />
        </div>
      </div>

      {/* Coaching moments */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display text-[16px] font-semibold tracking-tight inline-flex items-center gap-2">
              <Sparkles className="size-3.5 text-accent" />
              Coaching moments
            </h3>
            <p className="text-[12px] text-text-mute mt-0.5">
              Five clips flagged by Coach AI for review with {rep.name}.
            </p>
          </div>
          <button className="h-8 px-3 text-[12.5px] rounded-md border border-border bg-bg-elev text-text-mute hover:text-text hover:bg-bg-sunk transition-colors">
            Send all to 1:1
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {sc.clips.map((clip, i) => {
            const s = CLIP_STYLE[clip.type];
            const Icon = s.icon;
            return (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="rounded-xl border border-border bg-bg-elev p-4 flex flex-col gap-3 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "size-6 rounded-md grid place-items-center ring-1 ring-inset",
                      s.bg,
                      s.color,
                      s.ring,
                    ].join(" ")}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className={["text-[11px] font-medium", s.color].join(" ")}>
                    {s.label}
                  </span>
                  <span
                    className={[
                      "ml-auto px-1.5 h-4 inline-flex items-center rounded text-[9.5px] font-medium uppercase tracking-wider",
                      SEVERITY[clip.severity],
                    ].join(" ")}
                  >
                    {clip.severity}
                  </span>
                </div>

                {/* Mini waveform thumb */}
                <div className="relative h-12 rounded-md bg-bg-sunk overflow-hidden">
                  <div className="absolute inset-0 flex items-center gap-[1.5px] px-1.5">
                    {Array.from({ length: 64 }).map((_, j) => {
                      const seed = j + clip.id.length;
                      const h = 0.25 + Math.abs(Math.sin(seed * 1.91 + i * 0.7)) * 0.7;
                      const inClip = j > 18 && j < 46;
                      return (
                        <div
                          key={j}
                          className="flex-1 rounded-[1.5px]"
                          style={{
                            height: `${h * 70}%`,
                            background: inClip
                              ? "var(--accent)"
                              : "var(--border-strong)",
                            opacity: inClip ? 1 : 0.55,
                          }}
                        />
                      );
                    })}
                  </div>
                  <button className="absolute inset-y-0 left-1/2 -translate-x-1/2 size-7 my-auto rounded-full bg-text text-bg-elev grid place-items-center hover:scale-105 transition-transform shadow-md">
                    <Play className="size-3" fill="currentColor" />
                  </button>
                  <span className="absolute bottom-1 right-1.5 font-mono tabular text-[9.5px] text-text-mute">
                    {formatDuration(clip.duration)}
                  </span>
                </div>

                <p className="text-[12.5px] text-text leading-snug">
                  {clip.note}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-text-mute">
                  <span className="truncate">
                    <span className="font-mono tabular text-text-faint">
                      {formatTimestamp(clip.timestamp)}
                    </span>{" "}
                    · {clip.account}
                  </span>
                  <a
                    href={`/call/${clip.callId}`}
                    className="inline-flex items-center gap-1 text-text font-medium hover:text-accent-strong transition-colors"
                  >
                    Review
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
