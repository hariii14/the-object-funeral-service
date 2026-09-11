/**
 * Generates an absurdly solemn obituary from the details the mourner provided.
 * Deliberately local + deterministic so the prototype needs no backend.
 */

const OPENERS = [
  (n: string) => `It spent its entire life being called "the ${n.toLowerCase()}", and never objected.`,
  (n: string) => `${n} asked for nothing and received slightly less.`,
  (n: string) => `For years, ${n} was exactly where it was left. That was its whole contribution.`,
  (n: string) => `${n} was present for everything important and involved in none of it.`,
  (n: string) => `Nobody remembers acquiring ${n}. Everybody remembers losing it.`,
];

const MIDDLES = [
  (c: string) => `The end came by way of ${trimPeriod(c).toLowerCase()} — swiftly, and without ceremony.`,
  (c: string) => `Cause of departure: ${trimPeriod(c).toLowerCase()}. It had been coming for some time.`,
  (c: string) => `In the end it was ${trimPeriod(c).toLowerCase()}, which surprised no one.`,
];

const CLOSERS = [
  "It searched for the correct orientation for years. It never found it.",
  "It is survived by a drawer that no longer closes properly.",
  "It will be replaced by Thursday.",
  "No one clapped. No one ever did.",
  "It leaves behind a small dust-free rectangle.",
  "There will be no service. There is only this.",
];

function trimPeriod(s: string) {
  return s.trim().replace(/[.!]+$/, "");
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function generateObituary(input: {
  name: string;
  cause: string;
  story?: string;
}): string {
  const name = input.name.trim() || "The Object";
  const cause = input.cause.trim();
  const h = hash(name + cause + (input.story ?? ""));

  const parts = [OPENERS[h % OPENERS.length](name)];
  if (cause) parts.push(MIDDLES[(h >> 3) % MIDDLES.length](cause));
  parts.push(CLOSERS[(h >> 6) % CLOSERS.length]);
  return parts.join(" ");
}
