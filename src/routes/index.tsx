import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader, MobileCreateButton } from "@/components/SiteHeader";
import { ActivityTicker } from "@/components/ActivityTicker";
import { ObjectOfTheDay } from "@/components/ObjectOfTheDay";
import { MasonryFeed } from "@/components/MasonryFeed";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Rule, SectionHeading } from "@/components/Rule";
import { SiteFooter } from "@/components/SiteFooter";
import { useHydrateStore, useMemorials } from "@/lib/store";
import {
  forgottenSouls,
  mostMourned,
  objectOfTheDay,
  questionableDeaths,
  recentlyDeparted,
  searchMemorials,
  type Category,
} from "@/lib/memorials";

const TITLE = "The Object Funeral Service™ — Memorials for ordinary objects";
const DESCRIPTION =
  "A quiet place to remember objects that once meant absolutely nothing to anyone. Photograph an object, write its obituary, light a candle.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  useHydrateStore();
  const memorials = useMemorials();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const searching = query.trim().length > 0 || category !== "All";
  const results = useMemo(
    () => searchMemorials(memorials, query, category),
    [memorials, query, category],
  );
  const featured = objectOfTheDay(memorials);

  return (
    <div className="min-h-screen pb-24 sm:pb-16">
      <SiteHeader />
      <ActivityTicker memorials={memorials} />

      <main className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <section className="py-12 text-center sm:py-16">
          <p className="label-type">Established for no particular reason</p>
          <h1 className="hand mx-auto mt-4 max-w-3xl text-6xl leading-[0.92] sm:text-8xl">
            Gone, but unnecessary.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg italic text-muted-foreground">
            A quiet place to remember objects that once meant absolutely nothing to anyone.
          </p>
          <Rule className="mx-auto mt-6 max-w-[240px]" />

          <div className="mt-8">
            <SearchBar value={query} onChange={setQuery} />
            <div className="mt-4">
              <CategoryFilter value={category} onChange={setCategory} />
            </div>
          </div>
        </section>

        {searching ? (
          <section className="pb-16">
            <SectionHeading
              title="Search results"
              note={`for “${query || category}”`}
              count={results.length}
            />
            <MasonryFeed memorials={results} />
          </section>
        ) : (
          <>
            {featured && (
              <section className="pb-14">
                <ObjectOfTheDay memorial={featured} />
              </section>
            )}

            <section className="pb-14">
              <SectionHeading
                title="Recently Departed"
                note="fresh grief, still drying"
                count={recentlyDeparted(memorials).length}
              />
              <MasonryFeed memorials={recentlyDeparted(memorials).slice(0, 12)} />
              <Link
                to="/recently-departed"
                className="font-type text-[0.66rem] tracking-[0.14em] uppercase underline underline-offset-4"
              >
                View the full register →
              </Link>
            </section>

            <section className="pb-14">
              <SectionHeading
                title="Most Mourned"
                note="objects that were, briefly, loved"
                count={mostMourned(memorials).length}
              />
              <MasonryFeed memorials={mostMourned(memorials).slice(0, 8)} />
              <Link
                to="/most-mourned"
                className="font-type text-[0.66rem] tracking-[0.14em] uppercase underline underline-offset-4"
              >
                View the full register →
              </Link>
            </section>

            <section className="pb-14">
              <SectionHeading
                title="Forgotten Souls"
                note="nobody has come to these"
                count={forgottenSouls(memorials).length}
              />
              <MasonryFeed
                memorials={forgottenSouls(memorials).slice(0, 8)}
                emptyTitle="Everyone has been mourned."
                emptyNote="Suspicious."
              />
            </section>

            <section className="pb-14">
              <SectionHeading
                title="Questionable Deaths"
                note="the circumstances do not add up"
                count={questionableDeaths(memorials).length}
              />
              <MasonryFeed
                memorials={questionableDeaths(memorials).slice(0, 8)}
                emptyTitle="All deaths appear legitimate."
                emptyNote="For now."
              />
            </section>
          </>
        )}
      </main>

      <SiteFooter />
      <MobileCreateButton />
    </div>
  );
}
