export type AnnotationType =
  | "discovery"
  | "filler"
  | "objection"
  | "talkover"
  | "value"
  | "next-step"
  | "competitor"
  | "champion";

export type Annotation = {
  type: AnnotationType;
  text: string;
};

export type TranscriptTurn = {
  id: string;
  speaker: "rep" | "prospect";
  speakerName: string;
  text: string;
  timestamp: number; // seconds
  annotations?: Annotation[];
};

export const FOCAL_CALL_ID = "c-2840";

export const TRANSCRIPT: TranscriptTurn[] = [
  {
    id: "t1",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Thanks for making the time, Devika. I know your week looks rough — I saw the press release about the Frankfurt warehouse opening. Congrats on that.",
    timestamp: 4,
    annotations: [
      { type: "discovery", text: "Personalized opener — referenced recent news" },
    ],
  },
  {
    id: "t2",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Thank you. Yeah, it's been three months of fire drills, but we're live. So — fair warning — my head is half in operations today.",
    timestamp: 18,
  },
  {
    id: "t3",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Totally fair. Let's keep it tight. Before I show anything, can you tell me a bit about what triggered you to take this call? You mentioned routing inefficiencies on the intake form.",
    timestamp: 32,
    annotations: [
      { type: "discovery", text: "Discovery question landed — open ended" },
    ],
  },
  {
    id: "t4",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Right. So our dispatch team is still half manual. We've got six regional planners and they're swivel-chairing between two different TMS instances. Carriers are getting double-booked roughly twice a week.",
    timestamp: 51,
  },
  {
    id: "t5",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Got it. Twice a week double-booking — what does that translate to in dollars when it happens?",
    timestamp: 78,
    annotations: [
      { type: "discovery", text: "Quantified pain — strong follow-up" },
    ],
  },
  {
    id: "t6",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "We pay a deadhead fee plus a re-booking premium. Last quarter we logged about 84 thousand in avoidable costs. And that's before customer credits.",
    timestamp: 96,
  },
  {
    id: "t7",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Um, that's significant. Um, and on the customer credits side — is that, um, tracked anywhere central, or is it living in account managers' inboxes?",
    timestamp: 120,
    annotations: [
      { type: "filler", text: "Filler word: 'um' x3 in one turn" },
    ],
  },
  {
    id: "t8",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Account managers' inboxes, mostly. Which is exactly why I can't tell you the real number with confidence.",
    timestamp: 142,
  },
  {
    id: "t9",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Right. And who else inside Northwind feels that pain? Beyond the regional planners.",
    timestamp: 158,
    annotations: [
      { type: "discovery", text: "Mapping stakeholders — multi-threading" },
    ],
  },
  {
    id: "t10",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Our COO. She's the one who told me to find a unified platform by end of Q3. And our CFO has been asking why we have two TMS contracts.",
    timestamp: 178,
    annotations: [
      { type: "champion", text: "Executive sponsor identified: COO" },
    ],
  },
  {
    id: "t11",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Perfect. That helps. I'm going to share my screen and walk through how a typical Northbeam deployment compresses two TMS instances into one source of truth — sound good?",
    timestamp: 198,
  },
  {
    id: "t12",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Sure, but please skip the marketing intro. I've seen the website.",
    timestamp: 215,
  },
  {
    id: "t13",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Already skipped. Here's a live tenant from a customer your size — Atlas Freight. Notice the unified dispatch board and the carrier-collision warning right here.",
    timestamp: 222,
    annotations: [
      { type: "value", text: "Anchored demo to a peer — Atlas Freight" },
    ],
  },
  {
    id: "t14",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Hold on — that warning, is it real-time or batch? Because we tried something like this with FleetIQ and it ran on a fifteen minute lag, which made it useless.",
    timestamp: 252,
    annotations: [
      { type: "competitor", text: "Competitor mentioned: FleetIQ" },
    ],
  },
  {
    id: "t15",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Real-time. We stream from your carrier APIs and our internal event bus — sub-second propagation. FleetIQ batches because they're built on top of a relational store.",
    timestamp: 274,
  },
  {
    id: "t16",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Okay. That's actually a meaningful difference.",
    timestamp: 296,
  },
  {
    id: "t17",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Let me show you what happens when a planner overrides a route — you'll see the audit trail attached automatically, which I imagine your CFO will care about—",
    timestamp: 305,
  },
  {
    id: "t18",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Wait, before that — what does this cost? I keep getting pulled back to budget conversations and I need a number to bring to my COO this week.",
    timestamp: 326,
    annotations: [
      { type: "objection", text: "Pricing objection raised — handled" },
    ],
  },
  {
    id: "t19",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Fair — let me give you a directional band. For a fleet your size, customers land between 78 and 110 thousand annually, depending on connector count and SLA tier. I'll send a tailored quote tomorrow once I confirm carrier count.",
    timestamp: 340,
    annotations: [
      { type: "value", text: "Anchored a price band — strong response" },
    ],
  },
  {
    id: "t20",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Okay. That's, frankly, more than I was hoping. We're paying about 50 to FleetIQ today.",
    timestamp: 366,
  },
  {
    id: "t21",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Right, and you're paying it twice — once for FleetIQ, once for the second TMS. Combined contracts plus the 84K in avoidable deadhead, you're at 200K in run-rate cost today. We're at 110 plus you reclaim those losses.",
    timestamp: 374,
    annotations: [
      { type: "value", text: "Reframed price using customer's own numbers" },
    ],
  },
  {
    id: "t22",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "I — yeah, that math actually—",
    timestamp: 402,
  },
  {
    id: "t23",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "And the procurement side is straightforward — we're on most major paper, including yours if you use Coupa.",
    timestamp: 408,
    annotations: [
      { type: "talkover", text: "Talked over prospect mid-sentence" },
    ],
  },
  {
    id: "t24",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "We do use Coupa. Sorry — go on.",
    timestamp: 422,
  },
  {
    id: "t25",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Apologies, I cut you off. You were saying the math was working out — what part landed?",
    timestamp: 430,
    annotations: [
      { type: "value", text: "Repaired interruption — strong recovery" },
    ],
  },
  {
    id: "t26",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "The combined-cost framing. That's what my COO will need to see. Can you put that on a single slide?",
    timestamp: 446,
  },
  {
    id: "t27",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Absolutely. I'll send a one-pager tomorrow with the run-rate today, the proposed structure, and the breakeven month — which I'm estimating around month four.",
    timestamp: 462,
    annotations: [
      { type: "next-step", text: "Concrete next step — one-pager + breakeven model" },
    ],
  },
  {
    id: "t28",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Good. And I'd like our IT lead, Pradeep, on the next call. He'll want to dig into the API piece.",
    timestamp: 484,
    annotations: [
      { type: "champion", text: "Multi-thread to IT lead — Pradeep" },
    ],
  },
  {
    id: "t29",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Done. I'll propose three slots Thursday and Friday and copy Pradeep. Anything else I should bring?",
    timestamp: 500,
  },
  {
    id: "t30",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "A reference. Someone running a fleet around 400 trucks. If you can get me a 20-minute call, that's worth more than another demo.",
    timestamp: 516,
  },
  {
    id: "t31",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "I'll set up a call with the head of dispatch at Atlas Freight. He's on a similar fleet size. Expect an intro by Wednesday.",
    timestamp: 532,
    annotations: [
      { type: "next-step", text: "Reference call promised — Atlas Freight" },
    ],
  },
  {
    id: "t32",
    speaker: "prospect",
    speakerName: "Devika Patel",
    text: "Perfect. Thanks Marcus. Look forward to the one-pager.",
    timestamp: 552,
  },
  {
    id: "t33",
    speaker: "rep",
    speakerName: "Marcus Reyes",
    text: "Thanks Devika. Talk Thursday.",
    timestamp: 561,
  },
];

export type SummaryBlock = {
  keyMoments: { timestamp: number; label: string; type: AnnotationType }[];
  objections: string[];
  nextSteps: { id: string; text: string; owner: string; due: string }[];
  highlights: string[];
};

export const CALL_SUMMARY: SummaryBlock = {
  highlights: [
    "Strong discovery — quantified pain at $84K avoidable cost / quarter.",
    "Executive sponsor surfaced (COO) with end-of-Q3 mandate.",
    "Pricing objection handled by reframing run-rate cost.",
  ],
  keyMoments: [
    { timestamp: 32, label: "Open-ended discovery question", type: "discovery" },
    { timestamp: 178, label: "Executive sponsor identified", type: "champion" },
    { timestamp: 252, label: "Competitor: FleetIQ raised", type: "competitor" },
    { timestamp: 326, label: "Pricing objection", type: "objection" },
    { timestamp: 374, label: "Run-rate reframe", type: "value" },
    { timestamp: 422, label: "Talkover repaired", type: "talkover" },
    { timestamp: 462, label: "Concrete next step", type: "next-step" },
  ],
  objections: [
    "Pricing — landed 80% above incumbent FleetIQ contract",
    "Past disappointment with batch-mode dispatch tools",
    "Budget discussion gating procurement intro",
  ],
  nextSteps: [
    {
      id: "n1",
      text: "Send tailored quote with carrier-count breakdown",
      owner: "Marcus Reyes",
      due: "Tue, May 5",
    },
    {
      id: "n2",
      text: "One-pager: combined run-rate + breakeven month",
      owner: "Marcus Reyes",
      due: "Tue, May 5",
    },
    {
      id: "n3",
      text: "Schedule follow-up with Pradeep (IT lead)",
      owner: "Marcus Reyes",
      due: "Wed, May 6",
    },
    {
      id: "n4",
      text: "Reference call with Atlas Freight dispatch lead",
      owner: "Marcus Reyes",
      due: "Wed, May 6",
    },
    {
      id: "n5",
      text: "Confirm Coupa procurement workflow with Devika",
      owner: "Devika Patel",
      due: "Thu, May 7",
    },
    {
      id: "n6",
      text: "Loop in solutions engineer for API deep-dive",
      owner: "Marcus Reyes",
      due: "Thu, May 7",
    },
  ],
};
