import type { Sentiment } from "@/data/calls";

const STYLES: Record<Sentiment, { dot: string; text: string; bg: string; label: string }> = {
  positive: {
    dot: "bg-good",
    text: "text-good",
    bg: "bg-good-soft",
    label: "Positive",
  },
  neutral: {
    dot: "bg-text-faint",
    text: "text-text-mute",
    bg: "bg-bg-sunk",
    label: "Neutral",
  },
  negative: {
    dot: "bg-bad",
    text: "text-bad",
    bg: "bg-bad-soft",
    label: "Negative",
  },
};

export function SentimentChip({ sentiment }: { sentiment: Sentiment }) {
  const s = STYLES[sentiment];
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 h-5 px-1.5 rounded-md text-[10.5px] font-medium",
        s.bg,
        s.text,
      ].join(" ")}
    >
      <span className={["size-1.5 rounded-full", s.dot].join(" ")} />
      {s.label}
    </span>
  );
}
