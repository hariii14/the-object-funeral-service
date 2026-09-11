import { Link } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Memorials" },
  { to: "/recently-departed", label: "Recently Departed" },
  { to: "/most-mourned", label: "Most Mourned" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-[2px]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-8 md:flex md:justify-between">
        <Link to="/" className="min-w-0 shrink-0">
          <span className="block truncate font-type text-[0.72rem] tracking-[0.22em] uppercase sm:text-[0.8rem]">
            The Object Funeral Service
            <sup className="ml-0.5 text-[0.55em] align-super">TM</sup>
          </span>
          <span className="hand mt-0.5 hidden text-base text-muted-foreground sm:block">
            est. whenever
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "border-b border-border-strong" }}
              className="pb-0.5 font-type text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/create"
            className="hidden border border-border-strong px-4 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-primary-foreground sm:inline-block"
          >
            + Memorialize an Object
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="border border-border px-3 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-ink-fade border-t border-border px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-dashed border-border py-2.5 font-type text-[0.7rem] tracking-[0.16em] uppercase"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/create"
            onClick={() => setOpen(false)}
            className="mt-3 block py-2.5 font-type text-[0.7rem] tracking-[0.16em] uppercase text-seal"
          >
            + Memorialize an Object
          </Link>
        </nav>
      )}
    </header>
  );
}

export function MobileCreateButton() {
  return (
    <Link
      to="/create"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 border border-border-strong bg-paper px-6 py-3 font-type text-[0.7rem] tracking-[0.16em] uppercase shadow-[0_6px_18px_-12px_oklch(0.24_0.012_60/0.9)] sm:hidden"
    >
      🕯 Memorialize an Object
    </Link>
  );
}
