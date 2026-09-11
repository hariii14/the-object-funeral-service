import { MemorialCard } from "./MemorialCard";
import type { Memorial } from "@/lib/memorials";

export function MasonryFeed({
  memorials,
  emptyTitle = "No deceased objects found.",
  emptyNote = "Perhaps they are still alive.",
}: {
  memorials: Memorial[];
  emptyTitle?: string;
  emptyNote?: string;
}) {
  if (memorials.length === 0) {
    return (
      <div className="dashed-frame mx-auto my-10 max-w-md px-6 py-12 text-center">
        <p className="hand text-3xl">{emptyTitle}</p>
        <p className="hand mt-2 text-2xl text-muted-foreground">{emptyNote}</p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-4 sm:columns-2 md:columns-3 md:gap-5 xl:columns-4 2xl:columns-5">
      {memorials.map((m) => (
        <MemorialCard key={m.id} memorial={m} />
      ))}
    </div>
  );
}
