import { useRef, useState } from "react";

export function ImageUploader({
  onSelect,
}: {
  onSelect: (dataUrl: string, aspect: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [over, setOver] = useState(false);
  const [preview, setPreview] = useState<{ url: string; aspect: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That is not a photograph. The archive is strict.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      const img = new Image();
      img.onload = () => setPreview({ url, aspect: img.width / img.height || 3 / 4 });
      img.onerror = () => setPreview({ url, aspect: 3 / 4 });
      img.src = url;
    };
    reader.readAsDataURL(file);
  }

  if (preview) {
    return (
      <div className="animate-ink-fade">
        <div className="border border-border bg-paper p-3">
          <img src={preview.url} alt="Selected object" className="w-full border border-border" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="border border-border px-4 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase hover:bg-accent"
          >
            Choose another
          </button>
          <button
            type="button"
            onClick={() => onSelect(preview.url, preview.aspect)}
            className="border border-border-strong px-4 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase hover:bg-foreground hover:text-primary-foreground"
          >
            Use this photograph
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`dashed-frame flex aspect-[4/3] cursor-pointer flex-col items-center justify-center px-6 text-center transition-colors ${
          over ? "bg-accent" : "bg-paper/70 hover:bg-accent/50"
        }`}
      >
        <p className="hand text-3xl">Place the photograph here.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Or select one from your device. It will be handled with reverence.
        </p>
        <span className="mt-4 border border-border-strong px-4 py-2 font-type text-[0.66rem] tracking-[0.14em] uppercase">
          Choose a file
        </span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="mt-3 text-sm text-seal">{error}</p>}
    </div>
  );
}
