export function Rule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`rule-hand ${className}`} />;
}

export function SectionHeading({
  title,
  note,
  count,
}: {
  title: string;
  note?: string;
  count?: number;
}) {
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-type text-[0.78rem] tracking-[0.22em] uppercase">{title}</h2>
        {count !== undefined && (
          <span className="label-type">
            {count} {count === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>
      {note && <p className="hand mt-1 text-xl text-muted-foreground">{note}</p>}
      <Rule className="mt-1.5 opacity-70" />
    </div>
  );
}
