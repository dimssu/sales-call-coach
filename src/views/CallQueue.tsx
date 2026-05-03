"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Flag,
  Download,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
  Inbox,
  Users,
  Activity,
  Headphones,
} from "lucide-react";
import { CALLS } from "@/data/calls";
import { REPS, repById } from "@/data/reps";
import { Avatar } from "@/components/Avatar";
import { SentimentChip } from "@/components/SentimentChip";
import { ScorePill } from "@/components/ScorePill";
import { TalkRatioBar } from "@/components/TalkRatioBar";
import { formatDuration, formatRelativeDate } from "@/lib/format";

type FilterKey = "mine" | "team" | "flagged";

const FILTERS: { key: FilterKey; label: string; icon: typeof Inbox; count: number }[] = [
  { key: "mine", label: "My calls", icon: Inbox, count: 4 },
  { key: "team", label: "Team", icon: Users, count: CALLS.length },
  { key: "flagged", label: "Flagged", icon: Flag, count: CALLS.filter((c) => c.flagged).length },
];

const TYPE_STYLE: Record<string, string> = {
  Discovery: "bg-sky-50 text-sky-700 ring-sky-200",
  Demo: "bg-violet-50 text-violet-700 ring-violet-200",
  Close: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Renewal: "bg-amber-50 text-amber-700 ring-amber-200",
};

const STATS = [
  { label: "Calls today", value: "9", sub: "+2 vs yest." },
  { label: "Avg score", value: "78", sub: "team / week" },
  { label: "Avg talk ratio", value: "47%", sub: "rep speech" },
  { label: "Flagged moments", value: "23", sub: "needs review" },
];

export function CallQueue() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("team");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let rows = CALLS;
    if (activeFilter === "mine") rows = rows.filter((c) => c.repId === "r1");
    if (activeFilter === "flagged") rows = rows.filter((c) => c.flagged);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((c) => {
        const rep = repById(c.repId);
        return (
          c.account.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          rep?.name.toLowerCase().includes(q)
        );
      });
    }
    return rows;
  }, [activeFilter, query]);

  return (
    <div className="px-4 lg:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-text-faint font-medium">
            <Activity className="size-3" />
            Live queue
            <span className="size-1.5 rounded-full bg-good pulse-dot ml-1" />
          </div>
          <h1 className="font-display text-[28px] font-semibold mt-1 tracking-tight">
            Call queue
          </h1>
          <p className="text-[13px] text-text-mute mt-0.5">
            16 recent calls across 8 reps. Reviewed by Coach AI in the last 4 hours.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] hover:bg-bg-sunk transition-colors">
            <Download className="size-3.5" />
            Export
          </button>
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md bg-text text-bg-elev text-[12.5px] font-medium hover:bg-text/85 transition-colors">
            <Sparkles className="size-3.5" />
            Run AI review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-lg border border-border bg-bg-elev p-3.5"
          >
            <div className="text-[11px] uppercase tracking-[0.1em] text-text-faint font-medium">
              {s.label}
            </div>
            <div className="font-display text-[22px] font-semibold mt-1 tabular leading-none">
              {s.value}
            </div>
            <div className="text-[11px] text-text-mute mt-1.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 p-0.5 rounded-md border border-border bg-bg-elev">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={[
                  "h-7 px-2.5 inline-flex items-center gap-1.5 rounded-[5px] text-[12px] transition-colors duration-200",
                  active
                    ? "bg-bg-sunk text-text font-medium"
                    : "text-text-mute hover:text-text",
                ].join(" ")}
              >
                <Icon className="size-3.5" />
                {f.label}
                <span
                  className={[
                    "ml-0.5 px-1 h-4 rounded text-[10px] font-mono tabular",
                    active ? "bg-text text-bg-elev" : "bg-bg-sunk text-text-faint",
                  ].join(" ")}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center h-8 px-2.5 rounded-md border border-border bg-bg-elev w-[280px]">
          <Search className="size-3.5 text-text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search account, rep, type..."
            className="flex-1 bg-transparent text-[12.5px] outline-none px-2 placeholder:text-text-faint"
          />
        </div>

        <button className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12px] text-text-mute hover:bg-bg-sunk transition-colors">
          <Filter className="size-3.5" />
          Add filter
        </button>

        <div className="ml-auto flex items-center gap-2 text-[11.5px] text-text-mute">
          <span>Sort by</span>
          <button className="h-7 px-2 inline-flex items-center gap-1 rounded-md border border-border bg-bg-elev hover:bg-bg-sunk transition-colors">
            Newest
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-xl border border-border bg-bg-elev overflow-hidden">
        <div className="grid grid-cols-[minmax(220px,1.5fr)_minmax(140px,1fr)_110px_84px_140px_120px_84px_120px] px-4 h-9 items-center text-[10.5px] uppercase tracking-[0.1em] text-text-faint font-medium border-b border-border bg-bg-sunk/40">
          <div className="flex items-center gap-1">Rep <ArrowUpDown className="size-2.5 text-text-faint/70" /></div>
          <div>Account</div>
          <div>Type</div>
          <div className="text-right tabular">Duration</div>
          <div>Talk ratio</div>
          <div>Sentiment</div>
          <div className="text-right">Score</div>
          <div className="text-right">Date</div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Headphones className="size-6 text-text-faint mx-auto" />
            <p className="text-[13px] text-text-mute mt-2">No calls match your filters.</p>
          </div>
        ) : (
          filtered.map((call, idx) => {
            const rep = repById(call.repId)!;
            return (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.02 * idx,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Link
                  href={`/call/${call.id}`}
                  className="grid grid-cols-[minmax(220px,1.5fr)_minmax(140px,1fr)_110px_84px_140px_120px_84px_120px] px-4 h-[58px] items-center text-[12.5px] border-b border-border last:border-b-0 hover:bg-bg-sunk/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar name={rep.name} size="md" />
                    <div className="flex flex-col min-w-0 leading-tight">
                      <span className="font-medium truncate">{rep.name}</span>
                      <span className="text-[11px] text-text-faint truncate">{rep.role}</span>
                    </div>
                  </div>

                  <div className="flex flex-col leading-tight min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-medium truncate">{call.account}</span>
                      {call.flagged && (
                        <Flag className="size-3 text-accent shrink-0" fill="currentColor" />
                      )}
                    </div>
                    <span className="text-[11px] text-text-faint truncate">
                      {call.accountIndustry} · {call.outcome}
                    </span>
                  </div>

                  <div>
                    <span
                      className={[
                        "inline-flex h-5 items-center px-1.5 rounded-md text-[10.5px] font-medium ring-1 ring-inset",
                        TYPE_STYLE[call.type],
                      ].join(" ")}
                    >
                      {call.type}
                    </span>
                  </div>

                  <div className="text-right font-mono tabular text-[12px] text-text-mute">
                    {formatDuration(call.duration)}
                  </div>

                  <div>
                    <TalkRatioBar value={call.talkRatio} />
                  </div>

                  <div>
                    <SentimentChip sentiment={call.sentiment} />
                  </div>

                  <div className="text-right">
                    <ScorePill score={call.score} />
                  </div>

                  <div className="text-right font-mono tabular text-[11.5px] text-text-mute">
                    {formatRelativeDate(call.date, new Date("2026-05-04T10:00:00Z"))}
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}

        <div className="h-11 px-4 flex items-center justify-between border-t border-border text-[11.5px] text-text-mute bg-bg-sunk/40">
          <div>
            Showing <span className="text-text font-medium">{filtered.length}</span> of {CALLS.length} calls
          </div>
          <div className="flex items-center gap-1">
            <button className="h-6 px-2 rounded border border-border bg-bg-elev hover:bg-bg-sunk transition-colors">
              Previous
            </button>
            <button className="h-6 px-2 rounded border border-border bg-bg-elev font-medium">
              1
            </button>
            <button className="h-6 px-2 rounded border border-border bg-bg-elev hover:bg-bg-sunk text-text-mute transition-colors">
              2
            </button>
            <button className="h-6 px-2 rounded border border-border bg-bg-elev hover:bg-bg-sunk text-text-mute transition-colors">
              3
            </button>
            <button className="h-6 px-2 rounded border border-border bg-bg-elev hover:bg-bg-sunk transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-text-faint">
        <div>
          Last sync <span className="font-mono">2m ago</span> ·{" "}
          {REPS.length} reps connected
        </div>
        <div className="font-mono">queue/v3 · live</div>
      </div>
    </div>
  );
}
