import { useEffect, useState } from "react";
import type { Memorial } from "@/lib/memorials";

function buildLines(memorials: Memorial[]) {
  const names = memorials.map((m) => m.name);
  const pick = (i: number) => names[i % Math.max(names.length, 1)] ?? "An Unnamed Object";
  return [
    `Someone just remembered ${pick(2)}`,
    `3 people are mourning ${pick(0)}`,
    `${pick(3)} received a tribute`,
    `A candle was lit for ${pick(4)} in another timezone`,
    `${pick(1)} has been viewed 12 times without comment`,
    `Two mourners arrived for ${pick(5)}`,
  ];
}

export function ActivityTicker({ memorials }: { memorials: Memorial[] }) {
  const lines = buildLines(memorials);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => i + 1), 3400);
    return () => window.clearInterval(id);
  }, []);

  const line = lines[index % lines.length];

  return (
    <div className="border-y border-border bg-paper-deep/60">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2 sm:px-8">
        <span className="label-type shrink-0 border-r border-border pr-3">Live from the chapel</span>
        <p key={index} className="animate-ink-fade min-w-0 truncate font-type text-[0.7rem] tracking-[0.08em]">
          🕯 {line}
        </p>
      </div>
    </div>
  );
}
