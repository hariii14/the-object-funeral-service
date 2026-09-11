import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, MobileCreateButton } from "@/components/SiteHeader";
import { MasonryFeed } from "@/components/MasonryFeed";
import { SectionHeading } from "@/components/Rule";
import { SiteFooter } from "@/components/SiteFooter";
import { useHydrateStore, useMemorials } from "@/lib/store";
import { mostMourned } from "@/lib/memorials";

const TITLE = "Most Mourned — The Object Funeral Service™";
const DESCRIPTION = "The objects with the most candles lit in their memory. Ranked, solemnly.";

export const Route = createFileRoute("/most-mourned")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: MostMournedPage,
});

function MostMournedPage() {
  useHydrateStore();
  const memorials = mostMourned(useMemorials());

  return (
    <div className="min-h-screen pb-24 sm:pb-16">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8">
        <SectionHeading
          title="Most Mourned"
          note="a leaderboard nobody asked for"
          count={memorials.length}
        />
        <MasonryFeed memorials={memorials} />
      </main>
      <SiteFooter />
      <MobileCreateButton />
    </div>
  );
}
