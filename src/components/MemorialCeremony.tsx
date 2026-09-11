import { useEffect, useState } from "react";

/** A short, unnecessarily ceremonial interlude shown after a memorial is created. */
export function MemorialCeremony({
  image,
  name,
  onDone,
}: {
  image: string;
  name: string;
  onDone: () => void;
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 700),
      window.setTimeout(() => setStage(2), 1400),
      window.setTimeout(onDone, 2100),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6">
      <div className="animate-place-photo paper border border-border p-3">
        <img
          src={image}
          alt={name}
          className="max-h-[42vh] w-auto max-w-[78vw] border border-border object-contain"
        />
      </div>

      <div className="mt-8 h-20 text-center">
        {stage === 0 && <p className="hand animate-ink-fade text-3xl">Preparing the memorial…</p>}
        {stage === 1 && (
          <p aria-hidden className="animate-flicker text-4xl">
            🕯
          </p>
        )}
        {stage >= 2 && (
          <p className="hand animate-ink-fade text-3xl">They will be remembered.</p>
        )}
      </div>
    </div>
  );
}
