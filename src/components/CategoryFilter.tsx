import { CATEGORIES, type Category } from "@/lib/memorials";

export function CategoryFilter({
  value,
  onChange,
}: {
  value: Category | "All";
  onChange: (v: Category | "All") => void;
}) {
  const options: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`font-type text-[0.66rem] tracking-[0.14em] uppercase transition-colors ${
              active
                ? "text-foreground underline underline-offset-4 decoration-border-strong"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option === "All" ? "All departed" : option}
          </button>
        );
      })}
    </div>
  );
}
