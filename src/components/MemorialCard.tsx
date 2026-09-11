import { Link } from "@tanstack/react-router";
import { rotationFor, type Memorial } from "@/lib/memorials";

export function MemorialCard({ memorial }: { memorial: Memorial }) {
  const rotation = rotationFor(memorial.id);

  return (
    <Link
      to="/memorial/$id"
      params={{ id: memorial.id }}
      className="group mb-5 block break-inside-avoid transition-transform duration-300 ease-out will-change-transform hover:z-10"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <article
        className="paper paper-grain border border-border p-3 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-0 group-hover:shadow-[0_16px_28px_-22px_oklch(0.24_0.012_60/0.85)]"
        style={{ transform: `rotate(${-rotation}deg)` }}
      >
        <div className="overflow-hidden border border-border bg-paper-deep">
          <img
            src={memorial.image}
            alt={memorial.name}
            loading="lazy"
            className="w-full object-cover saturate-[0.72] transition-[filter] duration-500 group-hover:saturate-100"
            style={{ aspectRatio: memorial.aspect }}
          />
        </div>

        <div className="px-1 pt-3">
          <h3 className="hand text-[1.65rem] leading-none">{memorial.name}</h3>
          <p className="label-type mt-1.5">
            {memorial.born} — {memorial.departed}
          </p>

          <p className="mt-2.5 text-[0.95rem] leading-snug italic text-foreground/85">
            &ldquo;{memorial.obituary}&rdquo;
          </p>

          <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
            <p className="label-type">Cause of death</p>
            <p className="text-[0.9rem] leading-snug text-muted-foreground">{memorial.cause}</p>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2">
            <span className="font-type text-[0.72rem] tracking-[0.1em]">
              🕯 {memorial.candles}
            </span>
            <span className="label-type">{memorial.category}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
