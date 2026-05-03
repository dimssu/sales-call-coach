"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Share2,
  Bookmark,
  Sparkles,
  ListTodo,
  AlertTriangle,
  TrendingUp,
  CalendarClock,
  CheckCircle2,
  Circle,
  Mic2,
  Target,
  Crown,
  Megaphone,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import type { Call } from "@/data/calls";
import { repById } from "@/data/reps";
import {
  TRANSCRIPT,
  CALL_SUMMARY,
  type AnnotationType,
} from "@/data/transcripts";
import { Avatar } from "@/components/Avatar";
import { SentimentChip } from "@/components/SentimentChip";
import { ScorePill } from "@/components/ScorePill";
import { Waveform } from "@/components/Waveform";
import { formatDateLong, formatDuration, formatTimestamp } from "@/lib/format";

const ANNO_STYLE: Record<
  AnnotationType,
  { icon: typeof Target; color: string; bg: string; ring: string; label: string }
> = {
  discovery: {
    icon: Target,
    color: "text-sky-700",
    bg: "bg-sky-50",
    ring: "ring-sky-200",
    label: "Discovery",
  },
  filler: {
    icon: AlertTriangle,
    color: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    label: "Filler",
  },
  objection: {
    icon: ShieldAlert,
    color: "text-rose-700",
    bg: "bg-rose-50",
    ring: "ring-rose-200",
    label: "Objection",
  },
  talkover: {
    icon: Megaphone,
    color: "text-orange-700",
    bg: "bg-orange-50",
    ring: "ring-orange-200",
    label: "Talkover",
  },
  value: {
    icon: TrendingUp,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    label: "Value",
  },
  "next-step": {
    icon: ArrowRight,
    color: "text-violet-700",
    bg: "bg-violet-50",
    ring: "ring-violet-200",
    label: "Next step",
  },
  competitor: {
    icon: AlertTriangle,
    color: "text-fuchsia-700",
    bg: "bg-fuchsia-50",
    ring: "ring-fuchsia-200",
    label: "Competitor",
  },
  champion: {
    icon: Crown,
    color: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    label: "Champion",
  },
};

const ICONS_BY_TYPE: Record<AnnotationType, string> = {
  discovery: "🎯",
  filler: "⚠️",
  objection: "💰",
  talkover: "🚩",
  value: "💎",
  "next-step": "✅",
  competitor: "🏷️",
  champion: "👑",
};

export function CallDetail({ call }: { call: Call }) {
  const rep = repById(call.repId)!;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.32);
  const [donesteps, setDoneSteps] = useState<Record<string, boolean>>({
    n1: true,
    n2: false,
    n3: false,
    n4: false,
    n5: false,
    n6: false,
  });

  const positionSec = Math.round(progress * call.duration);

  const scrollToTurn = useCallback((id: string) => {
    const el = document.getElementById(`turn-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-accent/60");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-accent/60");
      }, 1400);
    }
  }, []);

  const seekTo = (sec: number) => {
    const p = Math.max(0, Math.min(1, sec / call.duration));
    setProgress(p);
  };

  const markers = CALL_SUMMARY.keyMoments.map((m) => ({
    progress: m.timestamp / call.duration,
    color: ANNO_STYLE[m.type].color.replace("text-", "").includes("amber")
      ? "#d97706"
      : ANNO_STYLE[m.type].color.replace("text-", "").includes("rose")
        ? "#e11d48"
        : ANNO_STYLE[m.type].color.replace("text-", "").includes("emerald")
          ? "#059669"
          : ANNO_STYLE[m.type].color.replace("text-", "").includes("sky")
            ? "#0284c7"
            : ANNO_STYLE[m.type].color.replace("text-", "").includes("violet")
              ? "#7c3aed"
              : ANNO_STYLE[m.type].color.replace("text-", "").includes("orange")
                ? "#ea580c"
                : "#ec4899",
    label: m.label,
  }));

  return (
    <div className="px-4 lg:px-6 py-6 max-w-[1500px] mx-auto">
      {/* Back */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] text-text-mute hover:text-text transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to queue
        </Link>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] hover:bg-bg-sunk transition-colors">
            <Bookmark className="size-3.5" />
            Save
          </button>
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] hover:bg-bg-sunk transition-colors">
            <Share2 className="size-3.5" />
            Share
          </button>
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md bg-text text-bg-elev text-[12.5px] font-medium hover:bg-text/85 transition-colors">
            <Sparkles className="size-3.5" />
            Coach
          </button>
        </div>
      </div>

      {/* Header / Player */}
      <div className="rounded-xl border border-border bg-bg-elev overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-start gap-3 min-w-0">
            <Avatar name={rep.name} size="xl" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11.5px] text-text-mute">
                <span className="font-mono tabular">{call.id.toUpperCase()}</span>
                <span className="text-text-faint">·</span>
                <span>{call.type} call</span>
                <span className="text-text-faint">·</span>
                <span>{formatDateLong(call.date)}</span>
              </div>
              <h1 className="font-display text-[24px] font-semibold mt-0.5 tracking-tight truncate">
                {call.account} <span className="text-text-mute font-normal">×</span>{" "}
                Northbeam
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-[12px] text-text-mute flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <Mic2 className="size-3" />
                  {rep.name}
                </span>
                <span className="text-text-faint">·</span>
                <span>{call.attendees} attendees</span>
                <span className="text-text-faint">·</span>
                <span className="font-mono tabular">{formatDuration(call.duration)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint">
                AI Score
              </span>
              <ScorePill score={call.score} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint">
                Sentiment
              </span>
              <SentimentChip sentiment={call.sentiment} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint">
                Talk ratio
              </span>
              <span className="text-[12.5px] font-mono tabular">
                <span className="text-accent font-semibold">{call.talkRatio}</span>
                <span className="text-text-faint"> : </span>
                <span>{100 - call.talkRatio}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Waveform */}
        <div className="px-5 pt-2 pb-7">
          <Waveform
            progress={progress}
            durationLabel={formatDuration(call.duration)}
            positionLabel={formatDuration(positionSec)}
            markers={markers}
          />
        </div>

        {/* Player bar */}
        <div className="h-12 px-5 flex items-center gap-3 border-t border-border bg-bg-sunk/50">
          <div className="flex items-center gap-1">
            <button className="size-7 grid place-items-center rounded-md hover:bg-bg-elev text-text-mute">
              <SkipBack className="size-3.5" />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="size-8 grid place-items-center rounded-md bg-text text-bg-elev hover:bg-text/85 transition-colors"
            >
              {playing ? (
                <Pause className="size-3.5" fill="currentColor" />
              ) : (
                <Play className="size-3.5" fill="currentColor" />
              )}
            </button>
            <button className="size-7 grid place-items-center rounded-md hover:bg-bg-elev text-text-mute">
              <SkipForward className="size-3.5" />
            </button>
          </div>

          <div className="font-mono tabular text-[11.5px] text-text-mute min-w-[88px]">
            {formatDuration(positionSec)} / {formatDuration(call.duration)}
          </div>

          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(e) => setProgress(Number(e.target.value) / 1000)}
            className="flex-1 h-1 accent-[var(--accent)]"
          />

          <div className="flex items-center gap-2 text-text-mute">
            <Volume2 className="size-3.5" />
            <span className="font-mono text-[11px] tabular">1.0x</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">
        {/* Transcript */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-[16px] font-semibold tracking-tight">
                Transcript
              </h2>
              <span className="px-1.5 h-5 inline-flex items-center rounded-md bg-bg-sunk font-mono text-[10.5px] tabular text-text-mute">
                {TRANSCRIPT.length} turns
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11.5px] text-text-mute">
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-accent" /> Rep
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-text/40" /> Prospect
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-elev p-4 lg:p-5 flex flex-col gap-4">
            {TRANSCRIPT.map((turn, idx) => {
              const isRep = turn.speaker === "rep";
              return (
                <motion.div
                  id={`turn-${turn.id}`}
                  key={turn.id}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.25, delay: idx * 0.01 }}
                  className={[
                    "flex gap-3 rounded-lg p-3 transition-shadow",
                    isRep
                      ? "bg-accent-soft/40"
                      : "bg-bg-sunk/40",
                  ].join(" ")}
                >
                  <div className="shrink-0 pt-0.5">
                    <Avatar name={turn.speakerName} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11.5px]">
                      <span
                        className={[
                          "font-medium",
                          isRep ? "text-accent-strong" : "text-text",
                        ].join(" ")}
                      >
                        {turn.speakerName}
                      </span>
                      <span className="text-text-faint">·</span>
                      <span className="text-text-faint">
                        {isRep ? "Rep" : "Prospect"}
                      </span>
                      <button
                        onClick={() => seekTo(turn.timestamp)}
                        className="ml-auto font-mono tabular text-[10.5px] text-text-mute hover:text-text transition-colors"
                      >
                        {formatTimestamp(turn.timestamp)}
                      </button>
                    </div>
                    <p className="text-[13.5px] leading-relaxed mt-1 text-text">
                      {turn.text}
                    </p>
                    {turn.annotations && turn.annotations.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {turn.annotations.map((a, i) => {
                          const s = ANNO_STYLE[a.type];
                          return (
                            <button
                              key={i}
                              onClick={() => seekTo(turn.timestamp)}
                              className={[
                                "inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[11px] font-medium ring-1 ring-inset transition-colors",
                                s.bg,
                                s.color,
                                s.ring,
                              ].join(" ")}
                            >
                              <span className="text-[11px] leading-none">
                                {ICONS_BY_TYPE[a.type]}
                              </span>
                              {a.text}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-20 self-start">
          {/* AI summary */}
          <div className="rounded-xl border border-border bg-bg-elev p-4">
            <div className="flex items-center gap-2 text-[12.5px] font-medium">
              <Sparkles className="size-3.5 text-accent" />
              AI summary
              <span className="ml-auto font-mono text-[10px] text-text-faint">
                v3 · 2h ago
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {CALL_SUMMARY.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-[12.5px] leading-relaxed text-text-mute flex gap-2"
                >
                  <span className="size-1 rounded-full bg-accent mt-2 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Key moments */}
          <div className="rounded-xl border border-border bg-bg-elev p-4">
            <div className="flex items-center gap-2 text-[12.5px] font-medium">
              <CalendarClock className="size-3.5 text-text-mute" />
              Key moments
              <span className="ml-auto font-mono text-[10px] text-text-faint">
                {CALL_SUMMARY.keyMoments.length}
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              {CALL_SUMMARY.keyMoments.map((m, i) => {
                const s = ANNO_STYLE[m.type];
                const Icon = s.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      seekTo(m.timestamp);
                      const turn = TRANSCRIPT.find(
                        (t) => t.timestamp === m.timestamp,
                      );
                      if (turn) scrollToTurn(turn.id);
                    }}
                    className="group h-9 px-1 -mx-1 rounded-md flex items-center gap-2.5 hover:bg-bg-sunk transition-colors text-left"
                  >
                    <span
                      className={[
                        "size-5 rounded-md grid place-items-center ring-1 ring-inset shrink-0",
                        s.bg,
                        s.color,
                        s.ring,
                      ].join(" ")}
                    >
                      <Icon className="size-3" />
                    </span>
                    <span className="flex-1 text-[12px] truncate">{m.label}</span>
                    <span className="font-mono tabular text-[10.5px] text-text-faint group-hover:text-text-mute">
                      {formatTimestamp(m.timestamp)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Objections */}
          <div className="rounded-xl border border-border bg-bg-elev p-4">
            <div className="flex items-center gap-2 text-[12.5px] font-medium">
              <ShieldAlert className="size-3.5 text-text-mute" />
              Objections raised
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {CALL_SUMMARY.objections.map((o, i) => (
                <li
                  key={i}
                  className="text-[12px] leading-snug text-text-mute pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-bad/60"
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Action items */}
          <div className="rounded-xl border border-border bg-bg-elev p-4">
            <div className="flex items-center gap-2 text-[12.5px] font-medium">
              <ListTodo className="size-3.5 text-text-mute" />
              Action items
              <span className="ml-auto font-mono text-[10px] text-text-faint">
                {Object.values(donesteps).filter(Boolean).length}/
                {CALL_SUMMARY.nextSteps.length}
              </span>
            </div>
            <ul className="mt-2 flex flex-col">
              {CALL_SUMMARY.nextSteps.map((n) => {
                const done = !!donesteps[n.id];
                return (
                  <li key={n.id}>
                    <button
                      onClick={() =>
                        setDoneSteps((d) => ({ ...d, [n.id]: !d[n.id] }))
                      }
                      className="w-full text-left flex items-start gap-2.5 py-2 border-b border-border last:border-b-0 hover:bg-bg-sunk/40 transition-colors -mx-2 px-2 rounded"
                    >
                      <span className="pt-0.5">
                        {done ? (
                          <CheckCircle2 className="size-3.5 text-good" fill="currentColor" />
                        ) : (
                          <Circle className="size-3.5 text-text-faint" />
                        )}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={[
                            "block text-[12.5px] leading-snug",
                            done ? "line-through text-text-faint" : "text-text",
                          ].join(" ")}
                        >
                          {n.text}
                        </span>
                        <span className="block text-[10.5px] text-text-faint mt-0.5">
                          {n.owner} · due {n.due}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
