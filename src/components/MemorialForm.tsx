import { useState } from "react";
import { CATEGORIES, type Category, type MemorialDraft } from "@/lib/memorials";
import { generateObituary } from "@/lib/obituary";
import { Rule } from "./Rule";

const field =
  "w-full border-b border-border bg-transparent px-1 py-2 font-serif text-base placeholder:italic placeholder:text-muted-foreground/80 focus:border-foreground focus:outline-none";

export function MemorialForm({
  image,
  aspect,
  onChangePhotograph,
  onSubmit,
}: {
  image: string;
  aspect: number;
  onChangePhotograph: () => void;
  onSubmit: (draft: MemorialDraft) => void;
}) {
  const [name, setName] = useState("");
  const [cause, setCause] = useState("");
  const [story, setStory] = useState("");
  const [born, setBorn] = useState("");
  const [departed, setDeparted] = useState("");
  const [category, setCategory] = useState<Category>("Miscellaneous");
  const [useAi, setUseAi] = useState(false);
  const [stamping, setStamping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("An object must be named before it can be mourned.");
      return;
    }
    setError(null);
    setStamping(true);
    const obituary = useAi
      ? generateObituary({ name, cause, story })
      : story.trim() || generateObituary({ name, cause, story });

    window.setTimeout(() => {
      onSubmit({
        name: name.trim(),
        born: born.trim() || "Unknown",
        departed: departed.trim() || String(new Date().getFullYear()),
        cause: cause.trim() || "Unknown circumstances.",
        obituary,
        category,
        image,
        aspect,
      });
    }, 320);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      <div>
        <div className="paper border border-border p-3" style={{ transform: "rotate(-0.8deg)" }}>
          <img
            src={image}
            alt="The object to be memorialized"
            className="w-full border border-border object-cover"
            style={{ aspectRatio: aspect }}
          />
          <p className="hand mt-2 text-center text-xl text-muted-foreground">the deceased</p>
        </div>
        <button
          type="button"
          onClick={onChangePhotograph}
          className="mt-3 font-type text-[0.64rem] tracking-[0.14em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Use a different photograph
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="label-type">
            Object&rsquo;s name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Old USB Cable"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="cause" className="label-type">
            Cause of death
          </label>
          <input
            id="cause"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            placeholder="Stopped working at the worst possible moment."
            className={field}
          />
        </div>

        <div>
          <label htmlFor="story" className="label-type">
            Its final story
          </label>
          <textarea
            id="story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={3}
            placeholder="Write something unnecessarily emotional…"
            className={`${field} resize-none`}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="born" className="label-type">
              Born
            </label>
            <input
              id="born"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
              placeholder="2019"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="departed" className="label-type">
              Departed
            </label>
            <input
              id="departed"
              value={departed}
              onChange={(e) => setDeparted(e.target.value)}
              placeholder="2026"
              className={field}
            />
          </div>
        </div>

        <div>
          <span className="label-type">Category</span>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`font-type text-[0.64rem] tracking-[0.13em] uppercase transition-colors ${
                  category === c
                    ? "text-foreground underline underline-offset-4 decoration-border-strong"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Rule className="opacity-60" />

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={useAi}
            onChange={(e) => setUseAi(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 appearance-none border border-border-strong checked:bg-foreground"
          />
          <span>
            <span className="font-type text-[0.68rem] tracking-[0.12em] uppercase">
              Let the AI write the obituary
            </span>
            <span className="hand block text-lg text-muted-foreground">
              it is not qualified, but it is willing
            </span>
          </span>
        </label>

        {error && <p className="text-sm text-seal">{error}</p>}

        <button
          type="submit"
          className={`w-full border border-border-strong px-5 py-3.5 font-type text-[0.74rem] tracking-[0.2em] uppercase transition-colors hover:bg-foreground hover:text-primary-foreground sm:w-auto ${
            stamping ? "animate-stamp" : ""
          }`}
        >
          🕯 Create memorial
        </button>
      </div>
    </form>
  );
}
