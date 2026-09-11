import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { CandleButton } from "@/components/CandleButton";
import { MasonryFeed } from "@/components/MasonryFeed";
import { Rule, SectionHeading } from "@/components/Rule";
import { SiteFooter } from "@/components/SiteFooter";
import { addTribute, lightCandle, useHydrateStore, useMemorial, useMemorials } from "@/lib/store";
import { rotationFor, statisticsFor } from "@/lib/memorials";

export const Route = createFileRoute("/memorial/$id")({
  head: () => ({
    meta: [
      { title: "A Memorial — The Object Funeral Service™" },
      {
        name: "description",
        content:
          "The full memorial record of an ordinary object: its years, its cause of death, its obituary and the candles lit in its memory.",
      },
      { property: "og:title", content: "A Memorial — The Object Funeral Service™" },
      {
        property: "og:description",
        content: "An ordinary object, remembered with entirely unwarranted gravity.",
      },
    ],
  }),
  component: MemorialDetail,
});

function MemorialDetail() {
  const { id } = Route.useParams();
  useHydrateStore();
  const memorial = useMemorial(id);
  const all = useMemorials();
  const [note, setNote] = useState("");

  if (!memorial) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <p className="hand text-4xl">No such deceased object.</p>
          <p className="hand mt-2 text-2xl text-muted-foreground">
            Perhaps it is still alive.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block border border-border-strong px-4 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase"
          >
            Return to the archive
          </Link>
        </main>
      </div>
    );
  }

  const stats = statisticsFor(memorial);
  const others = all.filter((m) => m.id !== memorial.id && m.category === memorial.category);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8">
        <Link
          to="/"
          className="label-type inline-block hover:text-foreground"
        >
          ← Back to the archive
        </Link>

        <article className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
          <div>
            <div
              className="paper paper-grain tape border border-border p-3 sm:p-4"
              style={{ transform: `rotate(${rotationFor(memorial.id)}deg)` }}
            >
              <img
                src={memorial.image}
                alt={memorial.name}
                className="w-full border border-border object-cover saturate-[0.78]"
                style={{ aspectRatio: memorial.aspect }}
              />
              <p className="label-type mt-3 text-center">
                Photographic evidence — filed, catalogued, unremarkable
              </p>
            </div>

            <section className="mt-8 border border-border p-5">
              <h2 className="font-type text-[0.72rem] tracking-[0.22em] uppercase">
                Object statistics
              </h2>
              <Rule className="my-3 opacity-60" />
              <dl className="space-y-2">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 border-b border-dashed border-border pb-1.5"
                  >
                    <dt className="label-type">{s.label}</dt>
                    <dd className="hand text-xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <div>
            <p className="label-type">{memorial.category}</p>
            <h1 className="hand mt-2 text-6xl leading-[0.92] sm:text-7xl">{memorial.name}</h1>
            <Rule className="my-5 max-w-[260px] opacity-70" />

            <dl className="space-y-3">
              <div className="flex gap-4">
                <dt className="label-type w-24 shrink-0 pt-1">Born</dt>
                <dd className="text-lg">{memorial.born}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="label-type w-24 shrink-0 pt-1">Departed</dt>
                <dd className="text-lg">{memorial.departed}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="label-type w-24 shrink-0 pt-1">Cause</dt>
                <dd className="text-lg">{memorial.cause}</dd>
              </div>
            </dl>

            <blockquote className="hand mt-8 border-l border-border-strong pl-5 text-3xl leading-snug">
              {memorial.obituary}
            </blockquote>

            <section className="mt-10 border-t border-border pt-6">
              <h2 className="font-type text-[0.72rem] tracking-[0.22em] uppercase">
                Leave a tribute
              </h2>
              <p className="hand mt-1 text-xl text-muted-foreground">
                {memorial.candles} people have remembered this object.
              </p>

              <div className="mt-4">
                <CandleButton count={memorial.candles} onLight={() => lightCandle(memorial.id)} />
              </div>

              <form
                className="mt-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!note.trim()) return;
                  addTribute(memorial.id, note);
                  setNote("");
                }}
              >
                <label htmlFor="tribute" className="label-type">
                  A few words
                </label>
                <div className="mt-1 flex flex-wrap items-end gap-3">
                  <input
                    id="tribute"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Gone too soon."
                    className="min-w-0 flex-1 border-b border-border bg-transparent px-1 py-2 placeholder:italic placeholder:text-muted-foreground/80 focus:border-foreground focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="border border-border px-4 py-2 font-type text-[0.66rem] tracking-[0.14em] uppercase hover:bg-foreground hover:text-primary-foreground"
                  >
                    Sign the book
                  </button>
                </div>
              </form>

              <ul className="mt-6 space-y-3">
                {memorial.tributes.length === 0 && (
                  <li className="hand text-xl text-muted-foreground">
                    The book of condolences is empty.
                  </li>
                )}
                {memorial.tributes.map((t) => (
                  <li key={t.id} className="animate-ink-fade border-b border-dashed border-border pb-2">
                    <p className="hand text-2xl">{t.text}</p>
                    <p className="label-type mt-0.5">
                      an anonymous mourner ·{" "}
                      {new Date(t.at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        {others.length > 0 && (
          <section className="mt-16">
            <SectionHeading
              title={`Also in ${memorial.category}`}
              note="they knew each other, probably"
              count={others.length}
            />
            <MasonryFeed memorials={others.slice(0, 8)} />
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
