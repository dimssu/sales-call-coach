export type Rep = {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  role: string;
  region: string;
  hireDate: string;
};

const seed = (name: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name,
  )}&backgroundType=gradientLinear&fontFamily=Inter&fontWeight=600`;

export const REPS: Rep[] = [
  {
    id: "r1",
    name: "Jana Werner",
    initials: "JW",
    avatar: seed("Jana Werner"),
    role: "Senior AE",
    region: "EMEA",
    hireDate: "2022-03-14",
  },
  {
    id: "r2",
    name: "Marcus Reyes",
    initials: "MR",
    avatar: seed("Marcus Reyes"),
    role: "Account executive",
    region: "AMER East",
    hireDate: "2023-01-09",
  },
  {
    id: "r3",
    name: "Priya Shah",
    initials: "PS",
    avatar: seed("Priya Shah"),
    role: "Senior AE",
    region: "APAC",
    hireDate: "2021-08-02",
  },
  {
    id: "r4",
    name: "Tomás Aguilar",
    initials: "TA",
    avatar: seed("Tomas Aguilar"),
    role: "Mid-market AE",
    region: "AMER West",
    hireDate: "2023-06-19",
  },
  {
    id: "r5",
    name: "Saoirse O'Donnell",
    initials: "SO",
    avatar: seed("Saoirse ODonnell"),
    role: "Strategic AE",
    region: "EMEA",
    hireDate: "2020-11-30",
  },
  {
    id: "r6",
    name: "Daniel Kovács",
    initials: "DK",
    avatar: seed("Daniel Kovacs"),
    role: "Account executive",
    region: "EMEA",
    hireDate: "2024-02-12",
  },
  {
    id: "r7",
    name: "Amaya Okafor",
    initials: "AO",
    avatar: seed("Amaya Okafor"),
    role: "Mid-market AE",
    region: "AMER East",
    hireDate: "2022-09-26",
  },
  {
    id: "r8",
    name: "Lukas Brandt",
    initials: "LB",
    avatar: seed("Lukas Brandt"),
    role: "Renewals lead",
    region: "EMEA",
    hireDate: "2021-04-11",
  },
];

export const repById = (id: string) => REPS.find((r) => r.id === id);
