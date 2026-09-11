import { Link } from "@tanstack/react-router";
import type { Memorial } from "@/lib/memorials";
import { Rule } from "./Rule";

export function ObjectOfTheDay({ memorial }: { memorial: Memorial }) {
  return (
    <section className="paper paper-grain border border-border-strong px-4 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border-strong pb-2">
        <p className="font-type text-[0.72rem] tracking-[0.3em] uppercase">Object of the day</p>
        <p className="label-type">The Object Funeral Service — Front Page</p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
        <Link to="/memorial/$id" params={{ id: memorial.id }} className="block">
          <div className="border border-border bg-paper-deep p-2">
            <img
              src={memorial.image}
              alt={memorial.name}
              width={1024}
              height={768}
              className="w-full object-cover saturate-[0.7]"
              style={{ aspectRatio: memorial.aspect }}
            />
          </div>
        </Link>

        <div className="flex flex-col justify-center">
          <h2 className="hand text-5xl leading-[0.95] sm:text-6xl">{memorial.name}</h2>
          <p className="label-type mt-3">
            {memorial.born} — {memorial.departed}
          </p>
          <Rule className="my-4 max-w-[220px] opacity-70" />
          <p className="text-lg italic leading-relaxed">&ldquo;{memorial.obituary}&rdquo;</p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="label-type">Cause — </span>
            {memorial.cause}
          </p>
          <p className="hand mt-5 text-2xl">
            <span className="ink-circle inline-block">Remembered by {memorial.candles} people</span>
          </p>
          <Link
            to="/memorial/$id"
            params={{ id: memorial.id }}
            className="mt-6 self-start border border-border-strong px-4 py-2 font-type text-[0.66rem] tracking-[0.14em] uppercase hover:bg-foreground hover:text-primary-foreground"
          >
            Attend the service
          </Link>
        </div>
      </div>
    </section>
  );
}
