export type CoachingClipType =
  | "discovery"
  | "filler"
  | "objection"
  | "talkover"
  | "value"
  | "next-step"
  | "competitor"
  | "champion";

export type CoachingClip = {
  id: string;
  callId: string;
  account: string;
  timestamp: number; // seconds
  duration: number; // seconds
  type: CoachingClipType;
  note: string;
  severity: "low" | "med" | "high";
};

export type ScorecardMetric = {
  label: string;
  value: number;
  unit?: string;
  delta: number; // pct
  goal?: number;
  format?: "pct" | "num" | "decimal";
};

export type RepScorecard = {
  repId: string;
  metrics: {
    avgScore: ScorecardMetric;
    talkRatio: ScorecardMetric;
    discoveryQs: ScorecardMetric;
    demosCompleted: ScorecardMetric;
    winRate: ScorecardMetric;
  };
  // 12 weeks for each line series
  trends: {
    week: string;
    avgScore: number;
    talkRatio: number;
    discoveryQs: number;
  }[];
  clips: CoachingClip[];
};

const WEEKS = [
  "W6", "W7", "W8", "W9", "W10", "W11",
  "W12", "W13", "W14", "W15", "W16", "W17",
];

const buildTrend = (
  scores: number[],
  ratios: number[],
  qs: number[],
) =>
  WEEKS.map((week, i) => ({
    week,
    avgScore: scores[i],
    talkRatio: ratios[i],
    discoveryQs: qs[i],
  }));

export const SCORECARDS: Record<string, RepScorecard> = {
  r1: {
    repId: "r1",
    metrics: {
      avgScore: { label: "Avg score", value: 84, delta: 4.2, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 41, unit: "%", delta: -2.1, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 9.4, delta: 1.6, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 18, delta: 12.5, format: "num" },
      winRate: { label: "Win rate", value: 38, unit: "%", delta: 5.4, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [76, 78, 81, 79, 82, 83, 80, 82, 84, 86, 85, 84],
      [49, 47, 46, 48, 45, 44, 43, 42, 44, 41, 40, 41],
      [6.1, 6.4, 7.2, 7.0, 7.5, 7.9, 8.2, 8.4, 8.6, 9.0, 9.1, 9.4],
    ),
    clips: [
      { id: "cl-1", callId: "c-2841", account: "Acme Industries", timestamp: 184, duration: 42, type: "discovery", severity: "low", note: "Layered four discovery questions in two minutes — peer-best example." },
      { id: "cl-2", callId: "c-2833", account: "Patagonia Mills", timestamp: 612, duration: 28, type: "value", severity: "low", note: "Reframed ROI using customer's own retail margins. Reuse this." },
      { id: "cl-3", callId: "c-2841", account: "Acme Industries", timestamp: 1102, duration: 35, type: "objection", severity: "med", note: "Pricing objection handled, but missed an upsell signal afterward." },
      { id: "cl-4", callId: "c-2833", account: "Patagonia Mills", timestamp: 1408, duration: 31, type: "talkover", severity: "med", note: "Cut prospect off mid-question on champion identification." },
      { id: "cl-5", callId: "c-2841", account: "Acme Industries", timestamp: 1796, duration: 22, type: "next-step", severity: "low", note: "Locked specific next step with date and owner — model behavior." },
    ],
  },
  r2: {
    repId: "r2",
    metrics: {
      avgScore: { label: "Avg score", value: 71, delta: -2.8, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 61, unit: "%", delta: 3.4, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 5.2, delta: -1.1, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 14, delta: 0, format: "num" },
      winRate: { label: "Win rate", value: 24, unit: "%", delta: -3.2, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [74, 73, 72, 70, 69, 71, 73, 70, 68, 70, 72, 71],
      [56, 58, 60, 59, 62, 64, 63, 65, 60, 62, 61, 61],
      [6.4, 6.0, 5.8, 5.5, 5.4, 5.6, 5.3, 5.0, 5.1, 5.4, 5.2, 5.2],
    ),
    clips: [
      { id: "cl-6", callId: "c-2840", account: "Northwind Logistics", timestamp: 120, duration: 24, type: "filler", severity: "med", note: "Three filler 'um's in single objection response. Practice silence." },
      { id: "cl-7", callId: "c-2840", account: "Northwind Logistics", timestamp: 326, duration: 38, type: "objection", severity: "low", note: "Strong reframe of pricing using customer's own run-rate numbers." },
      { id: "cl-8", callId: "c-2840", account: "Northwind Logistics", timestamp: 408, duration: 18, type: "talkover", severity: "high", note: "Talked over a buying signal. Repaired, but lost momentum." },
      { id: "cl-9", callId: "c-2832", account: "Brightline Energy", timestamp: 884, duration: 41, type: "discovery", severity: "med", note: "Skipped quantification — never asked dollar impact." },
      { id: "cl-10", callId: "c-2832", account: "Brightline Energy", timestamp: 2104, duration: 26, type: "next-step", severity: "med", note: "Next step was vague — 'circle back next week'. Anchor a date." },
    ],
  },
  r3: {
    repId: "r3",
    metrics: {
      avgScore: { label: "Avg score", value: 89, delta: 2.1, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 39, unit: "%", delta: 0.8, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 11.1, delta: 0.4, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 22, delta: 18.5, format: "num" },
      winRate: { label: "Win rate", value: 44, unit: "%", delta: 2.4, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [85, 86, 87, 86, 88, 87, 89, 90, 88, 91, 89, 89],
      [42, 41, 40, 38, 39, 39, 40, 38, 37, 38, 39, 39],
      [9.5, 9.8, 10.1, 10.4, 10.6, 10.8, 11.0, 11.2, 10.9, 11.3, 11.0, 11.1],
    ),
    clips: [
      { id: "cl-11", callId: "c-2839", account: "Vercel Inc", timestamp: 244, duration: 35, type: "champion", severity: "low", note: "Multi-threaded to CFO inside 15 minutes. Replicate in week-one playbook." },
      { id: "cl-12", callId: "c-2839", account: "Vercel Inc", timestamp: 698, duration: 28, type: "value", severity: "low", note: "Quoted customer-specific stats they'd shared. Highest signal of preparation." },
      { id: "cl-13", callId: "c-2831", account: "Statera Capital", timestamp: 412, duration: 30, type: "discovery", severity: "low", note: "Used silence to draw out compliance pain. Excellent." },
      { id: "cl-14", callId: "c-2831", account: "Statera Capital", timestamp: 1188, duration: 22, type: "competitor", severity: "med", note: "Mentioned competitor by name — prefer 'legacy alternatives' framing." },
      { id: "cl-15", callId: "c-2839", account: "Vercel Inc", timestamp: 1606, duration: 33, type: "next-step", severity: "low", note: "Mutual action plan handed off with owner per row." },
    ],
  },
  r4: {
    repId: "r4",
    metrics: {
      avgScore: { label: "Avg score", value: 77, delta: 1.4, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 50, unit: "%", delta: -1.2, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 7.6, delta: 0.9, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 16, delta: 6.7, format: "num" },
      winRate: { label: "Win rate", value: 30, unit: "%", delta: 1.1, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [73, 72, 74, 75, 74, 76, 77, 75, 78, 76, 78, 77],
      [54, 53, 52, 51, 53, 50, 51, 49, 50, 51, 50, 50],
      [6.4, 6.6, 6.9, 7.0, 7.2, 7.1, 7.3, 7.4, 7.5, 7.7, 7.5, 7.6],
    ),
    clips: [
      { id: "cl-16", callId: "c-2838", account: "Linear B.V", timestamp: 220, duration: 26, type: "discovery", severity: "med", note: "Stacked two questions in one breath — pick one." },
      { id: "cl-17", callId: "c-2838", account: "Linear B.V", timestamp: 920, duration: 34, type: "value", severity: "low", note: "Live demo paced well, kept under 8 minutes." },
      { id: "cl-18", callId: "c-2830", account: "Dunder Mifflin", timestamp: 480, duration: 24, type: "objection", severity: "med", note: "Conceded price too early before establishing value." },
      { id: "cl-19", callId: "c-2838", account: "Linear B.V", timestamp: 1740, duration: 28, type: "champion", severity: "low", note: "Identified procurement contact and asked for warm intro." },
      { id: "cl-20", callId: "c-2830", account: "Dunder Mifflin", timestamp: 1408, duration: 19, type: "filler", severity: "low", note: "Two 'you know' tics during pricing. Practice slowing down." },
    ],
  },
  r5: {
    repId: "r5",
    metrics: {
      avgScore: { label: "Avg score", value: 86, delta: 1.9, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 36, unit: "%", delta: 0.4, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 10.2, delta: 1.0, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 20, delta: 11.1, format: "num" },
      winRate: { label: "Win rate", value: 41, unit: "%", delta: 3.1, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [82, 84, 83, 85, 86, 84, 87, 86, 88, 86, 87, 86],
      [40, 38, 39, 38, 37, 36, 35, 36, 35, 37, 36, 36],
      [8.6, 8.9, 9.1, 9.3, 9.5, 9.8, 9.9, 10.1, 10.0, 10.2, 10.0, 10.2],
    ),
    clips: [
      { id: "cl-21", callId: "c-2837", account: "Notion Labs", timestamp: 168, duration: 41, type: "discovery", severity: "low", note: "Asked the 'why now' question with great specificity." },
      { id: "cl-22", callId: "c-2837", account: "Notion Labs", timestamp: 940, duration: 27, type: "champion", severity: "low", note: "Got a champion to volunteer their CFO's pain point unprompted." },
      { id: "cl-23", callId: "c-2829", account: "Anvil Cybersec", timestamp: 502, duration: 32, type: "value", severity: "low", note: "Tied feature to security team's audit finding. Surgical." },
      { id: "cl-24", callId: "c-2829", account: "Anvil Cybersec", timestamp: 1326, duration: 24, type: "objection", severity: "med", note: "Did not pre-empt likely SOC2 question — keep on the radar." },
      { id: "cl-25", callId: "c-2837", account: "Notion Labs", timestamp: 1840, duration: 30, type: "next-step", severity: "low", note: "Locked next step on the call. Customer agreed to introduce CTO." },
    ],
  },
  r6: {
    repId: "r6",
    metrics: {
      avgScore: { label: "Avg score", value: 62, delta: -4.5, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 69, unit: "%", delta: 5.1, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 4.1, delta: -0.6, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 12, delta: -7.7, format: "num" },
      winRate: { label: "Win rate", value: 18, unit: "%", delta: -4.0, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [70, 68, 67, 65, 66, 64, 63, 65, 62, 60, 63, 62],
      [60, 62, 64, 65, 67, 66, 68, 67, 70, 71, 69, 69],
      [5.0, 4.8, 4.6, 4.5, 4.3, 4.4, 4.2, 4.0, 4.1, 4.0, 4.2, 4.1],
    ),
    clips: [
      { id: "cl-26", callId: "c-2836", account: "Helio Robotics", timestamp: 92, duration: 44, type: "talkover", severity: "high", note: "Three back-to-back interruptions inside the first 90 seconds." },
      { id: "cl-27", callId: "c-2836", account: "Helio Robotics", timestamp: 412, duration: 38, type: "filler", severity: "high", note: "Excessive filler usage during pricing slide. Coach silence." },
      { id: "cl-28", callId: "c-2827", account: "Atlas Freight", timestamp: 248, duration: 30, type: "discovery", severity: "high", note: "Skipped qualification, jumped to demo. Lost the room." },
      { id: "cl-29", callId: "c-2836", account: "Helio Robotics", timestamp: 1240, duration: 28, type: "objection", severity: "med", note: "Defensive on competitor comparison — pivot to outcomes." },
      { id: "cl-30", callId: "c-2827", account: "Atlas Freight", timestamp: 1604, duration: 22, type: "next-step", severity: "med", note: "Closed without a concrete next step. Always anchor a date." },
    ],
  },
  r7: {
    repId: "r7",
    metrics: {
      avgScore: { label: "Avg score", value: 80, delta: 2.6, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 44, unit: "%", delta: -0.5, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 8.6, delta: 0.7, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 17, delta: 6.3, format: "num" },
      winRate: { label: "Win rate", value: 33, unit: "%", delta: 1.6, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [76, 77, 78, 79, 78, 80, 81, 80, 82, 80, 81, 80],
      [47, 46, 45, 46, 45, 44, 44, 43, 45, 44, 44, 44],
      [7.4, 7.6, 7.8, 8.0, 8.1, 8.2, 8.4, 8.5, 8.4, 8.6, 8.5, 8.6],
    ),
    clips: [
      { id: "cl-31", callId: "c-2835", account: "Ferrymark Bank", timestamp: 184, duration: 30, type: "discovery", severity: "low", note: "Layered compliance questions naturally — strong listen-first." },
      { id: "cl-32", callId: "c-2835", account: "Ferrymark Bank", timestamp: 612, duration: 36, type: "value", severity: "low", note: "Tied features to bank's quarterly audit cadence. Replicate." },
      { id: "cl-33", callId: "c-2828", account: "Wolfram Bio", timestamp: 412, duration: 28, type: "champion", severity: "low", note: "Champion's comp tied to renewal — leveraged tactfully." },
      { id: "cl-34", callId: "c-2835", account: "Ferrymark Bank", timestamp: 1308, duration: 24, type: "talkover", severity: "med", note: "Trampled a buying signal. Slow down at this moment." },
      { id: "cl-35", callId: "c-2828", account: "Wolfram Bio", timestamp: 1024, duration: 32, type: "next-step", severity: "low", note: "Auto-renewal closed in single conversation. Excellent." },
    ],
  },
  r8: {
    repId: "r8",
    metrics: {
      avgScore: { label: "Avg score", value: 88, delta: 1.2, goal: 80, format: "num" },
      talkRatio: { label: "Talk ratio", value: 37, unit: "%", delta: -1.0, goal: 45, format: "pct" },
      discoveryQs: { label: "Discovery questions / call", value: 9.8, delta: 0.3, format: "decimal" },
      demosCompleted: { label: "Demos completed", value: 13, delta: 8.3, format: "num" },
      winRate: { label: "Win rate", value: 47, unit: "%", delta: 4.0, goal: 32, format: "pct" },
    },
    trends: buildTrend(
      [84, 85, 86, 87, 86, 88, 87, 89, 88, 90, 88, 88],
      [40, 39, 38, 39, 38, 37, 37, 38, 37, 36, 38, 37],
      [8.6, 8.8, 9.0, 9.2, 9.3, 9.5, 9.6, 9.7, 9.8, 9.7, 9.6, 9.8],
    ),
    clips: [
      { id: "cl-36", callId: "c-2834", account: "Cobalt Health", timestamp: 142, duration: 34, type: "champion", severity: "low", note: "Anchored value to the customer's outcomes report. Repeatable." },
      { id: "cl-37", callId: "c-2826", account: "Quanta Robotics", timestamp: 524, duration: 28, type: "value", severity: "low", note: "Sold a 2x expansion via usage trend — pure data sell." },
      { id: "cl-38", callId: "c-2834", account: "Cobalt Health", timestamp: 906, duration: 26, type: "objection", severity: "low", note: "Pre-empted likely renewal-uplift objection with usage receipts." },
      { id: "cl-39", callId: "c-2826", account: "Quanta Robotics", timestamp: 1188, duration: 22, type: "discovery", severity: "med", note: "Could probe deeper on roadmap concerns — still surface-level." },
      { id: "cl-40", callId: "c-2834", account: "Cobalt Health", timestamp: 1404, duration: 30, type: "next-step", severity: "low", note: "12-month renewal locked, expansion conversation queued." },
    ],
  },
};

export const scorecardForRep = (id: string) => SCORECARDS[id];
