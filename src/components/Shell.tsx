"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Headphones,
  ListChecks,
  BarChart3,
  Search,
  Bell,
  Sparkles,
  CircleUserRound,
  Plus,
  Command,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Call queue", icon: ListChecks },
  { href: "/scorecard", label: "Rep scorecard", icon: BarChart3 },
];

const LIBRARIES = [
  { label: "Discovery", count: 28 },
  { label: "Demo", count: 19 },
  { label: "Pricing & close", count: 14 },
  { label: "Renewals", count: 9 },
  { label: "Objection handling", count: 22 },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCallDetail = pathname?.startsWith("/call/");

  return (
    <div className="min-h-dvh flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[244px] shrink-0 flex-col border-r border-border bg-bg-elev/40">
        <div className="h-14 px-4 flex items-center gap-2 border-b border-border">
          <div className="size-7 rounded-md bg-accent text-white grid place-items-center shadow-sm">
            <Headphones className="size-4" strokeWidth={2.4} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-semibold text-[15px]">
              CallCoach
            </span>
            <span className="text-[10.5px] text-text-mute font-mono">
              v0.4 — pulse
            </span>
          </div>
        </div>

        <nav className="px-2 py-3 flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname?.startsWith("/call/")
                : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "h-8 px-2.5 rounded-md flex items-center gap-2.5 text-[13px] transition-colors duration-200",
                  active
                    ? "bg-bg-sunk text-text font-medium"
                    : "text-text-mute hover:bg-bg-sunk hover:text-text",
                ].join(" ")}
              >
                <Icon className="size-4" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-2 mb-1.5 flex items-center justify-between">
          <span className="text-[10.5px] uppercase tracking-[0.12em] text-text-faint font-medium">
            Libraries
          </span>
          <button className="size-4 grid place-items-center text-text-faint hover:text-text">
            <Plus className="size-3.5" />
          </button>
        </div>
        <div className="px-2 flex flex-col gap-0.5">
          {LIBRARIES.map((l) => (
            <button
              key={l.label}
              className="h-7 px-2.5 rounded-md flex items-center justify-between text-[12.5px] text-text-mute hover:bg-bg-sunk hover:text-text transition-colors"
            >
              <span className="truncate">{l.label}</span>
              <span className="font-mono text-[10.5px] text-text-faint tabular">
                {l.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-3 border-t border-border">
          <div className="rounded-lg border border-border bg-bg-elev p-3">
            <div className="flex items-center gap-2 text-[12px] font-medium">
              <Sparkles className="size-3.5 text-accent" />
              Coach AI
            </div>
            <p className="text-[11.5px] text-text-mute mt-1 leading-snug">
              23 new moments flagged across your team this week.
            </p>
            <button className="mt-2 w-full h-7 rounded-md bg-text text-bg-elev text-[11.5px] font-medium hover:bg-text/85 transition-colors">
              Review all
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 px-4 lg:px-6 flex items-center gap-3 border-b border-border bg-bg/80 glass sticky top-0 z-30">
          <div className="flex items-center gap-1.5 text-[12.5px] text-text-mute">
            <span className="text-text-faint">Workspace</span>
            <span className="text-text-faint">/</span>
            <span className="text-text font-medium">Northbeam Sales</span>
            {isCallDetail && (
              <>
                <span className="text-text-faint">/</span>
                <span className="text-text-mute">Call</span>
              </>
            )}
          </div>

          <div className="flex-1 max-w-md mx-auto hidden md:flex items-center h-8 px-2.5 rounded-md border border-border bg-bg-elev">
            <Search className="size-3.5 text-text-faint" />
            <input
              placeholder="Search calls, reps, accounts..."
              className="flex-1 bg-transparent text-[12.5px] outline-none px-2 placeholder:text-text-faint"
            />
            <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-text-faint border border-border rounded px-1 py-[1px]">
              <Command className="size-2.5" />K
            </kbd>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <button className="size-8 grid place-items-center rounded-md hover:bg-bg-sunk text-text-mute relative">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />
            </button>
            <div className="ml-2 flex items-center gap-2 pl-2 border-l border-border h-8">
              <CircleUserRound className="size-5 text-text-mute" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-[12px] font-medium">Jana Werner</span>
                <span className="text-[10px] text-text-faint">
                  Sales manager
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
