import { useState } from "react";

export function CandleButton({
  count,
  onLight,
}: {
  count: number;
  onLight: () => void;
}) {
  const [flames, setFlames] = useState<number[]>([]);
  const [stamp, setStamp] = useState(false);

  function handleClick() {
    onLight();
    const id = Date.now() + Math.random();
    setFlames((f) => [...f, id]);
    setStamp(true);
    window.setTimeout(() => setFlames((f) => f.filter((x) => x !== id)), 1200);
    window.setTimeout(() => setStamp(false), 420);
  }

  return (
    <div className="relative inline-block">
      {flames.map((id, i) => (
        <span
          key={id}
          aria-hidden
          className="animate-flame pointer-events-none absolute -top-2 left-1/2 text-lg"
          style={{ marginLeft: `${((i % 3) - 1) * 14}px` }}
        >
          🕯
        </span>
      ))}
      <button
        type="button"
        onClick={handleClick}
        className={`border border-border-strong px-5 py-2.5 font-type text-[0.7rem] tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-primary-foreground ${
          stamp ? "animate-stamp" : ""
        }`}
      >
        🕯 Light a candle
        <span className="ml-3 opacity-70">{count}</span>
      </button>
    </div>
  );
}
