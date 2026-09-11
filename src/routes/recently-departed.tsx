import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, MobileCreateButton } from "@/components/SiteHeader";
import { MasonryFeed } from "@/components/MasonryFeed";
import { SectionHeading } from "@/components/Rule";
import { SiteFooter } from "@/components/SiteFooter";
import { useHydrateStore, useMemorials } from "@/lib/store";
import { recentlyDeparted } from "@/lib/memorials";

const TITLE = "Recently Departed — The Object Funeral Service™";
const DESCRIPTION = "The newest objects to be laid to rest in the archive. Grief, freshly filed.";

export const Route = createFileRoute("/recently-departed")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: RecentlyDepartedPage,
});

function RecentlyDepartedPage() {
  useHydrateStore();
  const memorials = recentlyDeparted(useMemorials());

  return (
    <div className="min-h-screen pb-24 sm:pb-16">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8">
        <SectionHeading
          title="Recently Departed"
          note="in order of departure, as is proper"
          count={memorials.length}
        />
        <MasonryFeed memorials={memorials} />
      </main>
      <SiteFooter />
      <MobileCreateButton />
    </div>
  );
}
