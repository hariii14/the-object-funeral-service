export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <label htmlFor="search-deceased" className="sr-only">
        Search the deceased
      </label>
      <input
        id="search-deceased"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the deceased…"
        className="w-full border-b border-border-strong bg-transparent px-1 pb-2 pt-1 text-center font-serif text-lg placeholder:italic placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
      />
      <span aria-hidden className="pointer-events-none absolute right-1 bottom-2 font-type text-xs text-muted-foreground">
        ⌕
      </span>
    </div>
  );
}
