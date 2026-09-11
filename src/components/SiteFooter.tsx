import { Rule } from "./Rule";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-8">
      <Rule className="opacity-60" />
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="label-type">The Object Funeral Service — we take useless things seriously</p>
        <p className="hand text-xl text-muted-foreground">no refunds on grief</p>
      </div>
    </footer>
  );
}
