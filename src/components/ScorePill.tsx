import { scoreBand } from "@/lib/format";

const STYLES = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  bad: "bg-bad-soft text-bad",
} as const;

export function ScorePill({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md";
}) {
  const band = scoreBand(score);
  const sz =
    size === "sm" ? "h-5 px-1.5 text-[10.5px]" : "h-6 px-2 text-[11.5px]";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-md font-mono font-semibold tabular",
        sz,
        STYLES[band],
      ].join(" ")}
    >
      {score}
    </span>
  );
}
