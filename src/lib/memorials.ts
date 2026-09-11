import usbCable from "@/assets/usb-cable.jpg";
import leftSock from "@/assets/left-sock.jpg";
import calculator from "@/assets/calculator.jpg";
import chair from "@/assets/chair.jpg";
import mug from "@/assets/mug.jpg";
import pencil from "@/assets/pencil.jpg";
import remote from "@/assets/remote.jpg";
import hairtie from "@/assets/hairtie.jpg";

export const CATEGORIES = [
  "Electronics",
  "Stationery",
  "Clothing",
  "Furniture",
  "Toys",
  "Household",
  "Miscellaneous",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Tribute = {
  id: string;
  text: string;
  at: number;
};

export type Memorial = {
  id: string;
  name: string;
  born: string;
  departed: string;
  cause: string;
  obituary: string;
  category: Category;
  image: string;
  aspect: number; // width / height, used by the masonry grid
  candles: number;
  tributes: Tribute[];
  createdAt: number;
  seed?: boolean;
};

export type MemorialDraft = Omit<
  Memorial,
  "id" | "candles" | "tributes" | "createdAt" | "seed" | "aspect"
> & { aspect?: number };

/* ————— useless statistics (deterministic per memorial) ————— */

const LOCATIONS = [
  "Somewhere in the house.",
  "Behind the sofa, presumably.",
  "A drawer. The drawer.",
  "Last seen near the kettle.",
  "Unknown. Investigation abandoned.",
  "The bag of other bags.",
];

const IMPORTANCE = ["Questionable", "Debatable", "Negligible", "Widely disputed", "None"];

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function statisticsFor(m: Memorial) {
  const h = hash(m.id + m.name);
  const born = parseInt(m.born, 10);
  const departed = parseInt(m.departed, 10);
  const years =
    Number.isFinite(born) && Number.isFinite(departed) && departed >= born
      ? departed - born
      : (h % 14) + 1;
  return [
    { label: "Years served", value: String(years) },
    { label: "Known owners", value: String((h % 3) + 1) },
    { label: "Major incidents", value: String((h >> 3) % 40) },
    { label: "Successful repairs", value: h % 7 === 0 ? "1" : "0" },
    { label: "Last known location", value: LOCATIONS[h % LOCATIONS.length]! },
    { label: "Historical importance", value: IMPORTANCE[(h >> 5) % IMPORTANCE.length]! },
  ];
}

/* ————— tiny deterministic rotation for scattered-paper feel ————— */

export function rotationFor(id: string) {
  const r = (hash(id) % 240) / 100 - 1.2; // -1.2deg .. +1.2deg
  return Math.round(r * 100) / 100;
}

/* ————— seed archive ————— */

const SEEDS: Memorial[] = [
  {
    id: "seed-usb",
    name: "USB Cable",
    born: "2017",
    departed: "2026",
    cause: "Chronic connectivity failure.",
    obituary: "Connected to everyone. Worked with nobody.",
    category: "Electronics",
    image: usbCable,
    aspect: 768 / 1024,
    candles: 84,
    createdAt: Date.parse("2026-09-08T10:00:00Z"),
    seed: true,
    tributes: [
      { id: "t1", text: "Never worked when I needed it.", at: Date.parse("2026-09-08T12:00:00Z") },
      { id: "t2", text: "F.", at: Date.parse("2026-09-09T08:15:00Z") },
    ],
  },
  {
    id: "seed-sock",
    name: "The Left Sock",
    born: "2018",
    departed: "2026",
    cause: "Separated from its partner under mysterious circumstances.",
    obituary:
      "It entered the machine as one of two. It emerged alone. No inquiry was ever concluded.",
    category: "Clothing",
    image: leftSock,
    aspect: 1024 / 768,
    candles: 231,
    createdAt: Date.parse("2026-09-07T09:00:00Z"),
    seed: true,
    tributes: [
      { id: "t3", text: "Gone too soon.", at: Date.parse("2026-09-07T18:00:00Z") },
      { id: "t4", text: "Thank you for your service.", at: Date.parse("2026-09-08T07:40:00Z") },
    ],
  },
  {
    id: "seed-calculator",
    name: "The Old Calculator",
    born: "2004",
    departed: "2025",
    cause: "Was replaced despite functioning perfectly.",
    obituary: "It never made a single mistake. That was, in the end, held against it.",
    category: "Electronics",
    image: calculator,
    aspect: 768 / 960,
    candles: 147,
    createdAt: Date.parse("2026-09-05T11:30:00Z"),
    seed: true,
    tributes: [{ id: "t5", text: "A quiet professional.", at: Date.parse("2026-09-06T09:00:00Z") }],
  },
  {
    id: "seed-chair",
    name: "Chair #17",
    born: "1998",
    departed: "2026",
    cause: "Dropped exactly once.",
    obituary: "It held everyone who ever sat on it, and complained only in the final years.",
    category: "Furniture",
    image: chair,
    aspect: 768 / 1024,
    candles: 62,
    createdAt: Date.parse("2026-09-04T15:20:00Z"),
    seed: true,
    tributes: [],
  },
  {
    id: "seed-mug",
    name: "The Office Mug",
    born: "2013",
    departed: "2026",
    cause: "Destroyed by younger sibling.",
    obituary: "Held eleven thousand disappointing coffees without ever once being praised.",
    category: "Household",
    image: mug,
    aspect: 1024 / 820,
    candles: 118,
    createdAt: Date.parse("2026-09-03T08:10:00Z"),
    seed: true,
    tributes: [{ id: "t6", text: "It knew things.", at: Date.parse("2026-09-03T20:00:00Z") }],
  },
  {
    id: "seed-pencil",
    name: "Pencil Stub",
    born: "2024",
    departed: "2026",
    cause: "Sharpened beyond the point of dignity.",
    obituary: "Wrote three shopping lists and one apology. Refused to be sharpened again.",
    category: "Stationery",
    image: pencil,
    aspect: 768 / 900,
    candles: 3,
    createdAt: Date.parse("2026-09-02T13:00:00Z"),
    seed: true,
    tributes: [],
  },
  {
    id: "seed-remote",
    name: "The Living Room Remote",
    born: "2009",
    departed: "2026",
    cause: "Lost during a house move.",
    obituary: "Commanded an entire household for seventeen years. Then simply was not there.",
    category: "Electronics",
    image: remote,
    aspect: 768 / 1024,
    candles: 96,
    createdAt: Date.parse("2026-09-01T17:45:00Z"),
    seed: true,
    tributes: [{ id: "t7", text: "Still under the cushion somewhere.", at: Date.parse("2026-09-02T10:00:00Z") }],
  },
  {
    id: "seed-hairtie",
    name: "Hair Tie & Paperclip",
    born: "2021",
    departed: "2026",
    cause: "Cable developed trust issues.",
    obituary: "Two strangers, bound by a drawer. Neither was ever asked how they got there.",
    category: "Miscellaneous",
    image: hairtie,
    aspect: 1024 / 760,
    candles: 1,
    createdAt: Date.parse("2026-08-30T12:00:00Z"),
    seed: true,
    tributes: [],
  },
];

export const SEED_IMAGES: Record<string, string> = Object.fromEntries(
  SEEDS.map((s) => [s.id, s.image]),
);

export function seedMemorials(): Memorial[] {
  return SEEDS.map((s) => ({ ...s, tributes: [...s.tributes] }));
}

/* ————— sections ————— */

export const RIDICULOUS_CAUSE_HINTS = [
  "lost",
  "sibling",
  "dropped",
  "trust",
  "unknown",
  "replaced",
  "mysterious",
  "dignity",
];

export function recentlyDeparted(all: Memorial[]) {
  return [...all].sort((a, b) => b.createdAt - a.createdAt);
}

export function mostMourned(all: Memorial[]) {
  return [...all].sort((a, b) => b.candles - a.candles);
}

export function forgottenSouls(all: Memorial[]) {
  return [...all]
    .filter((m) => m.candles + m.tributes.length <= 10)
    .sort((a, b) => a.candles - b.candles);
}

export function questionableDeaths(all: Memorial[]) {
  return all.filter((m) =>
    RIDICULOUS_CAUSE_HINTS.some((h) => m.cause.toLowerCase().includes(h)),
  );
}

export function objectOfTheDay(all: Memorial[]) {
  if (all.length === 0) return undefined;
  const day = Math.floor(Date.now() / 86_400_000);
  return all[day % all.length];
}

export function searchMemorials(all: Memorial[], query: string, category: Category | "All") {
  const q = query.trim().toLowerCase();
  return all.filter((m) => {
    if (category !== "All" && m.category !== category) return false;
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.cause.toLowerCase().includes(q) ||
      m.obituary.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    );
  });
}
