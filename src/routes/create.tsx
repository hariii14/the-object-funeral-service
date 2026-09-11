import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { CameraCapture } from "@/components/CameraCapture";
import { ImageUploader } from "@/components/ImageUploader";
import { MemorialForm } from "@/components/MemorialForm";
import { MemorialCeremony } from "@/components/MemorialCeremony";
import { Rule } from "@/components/Rule";
import { SiteFooter } from "@/components/SiteFooter";
import { createMemorial, useHydrateStore } from "@/lib/store";
import type { MemorialDraft } from "@/lib/memorials";

const TITLE = "Memorialize an Object — The Object Funeral Service™";
const DESCRIPTION =
  "Photograph an ordinary object, name it, record its cause of death and lay it to rest in the archive.";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  useHydrateStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const [photo, setPhoto] = useState<{ url: string; aspect: number } | null>(null);
  const [ceremony, setCeremony] = useState<{ id: string; image: string; name: string } | null>(
    null,
  );

  function handleSubmit(draft: MemorialDraft) {
    const created = createMemorial(draft);
    setCeremony({ id: created.id, image: created.image, name: created.name });
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
        <header className="text-center">
          <p className="label-type">Admissions</p>
          <h1 className="hand mt-3 text-6xl leading-none sm:text-7xl">Let us remember them.</h1>
          <p className="mx-auto mt-4 max-w-lg text-base italic text-muted-foreground">
            Present the object. The Service will handle the rest with entirely unwarranted gravity.
          </p>
          <Rule className="mx-auto mt-5 max-w-[200px]" />
        </header>

        <div className="mt-12">
          {photo ? (
            <MemorialForm
              image={photo.url}
              aspect={photo.aspect}
              onChangePhotograph={() => setPhoto(null)}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="mx-auto max-w-2xl">
              <div className="mb-5 flex justify-center gap-6 border-b border-border pb-3">
                {(["camera", "upload"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`font-type text-[0.68rem] tracking-[0.16em] uppercase transition-colors ${
                      mode === m
                        ? "text-foreground underline underline-offset-[6px] decoration-border-strong"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "camera" ? "Option I — Live camera" : "Option II — Upload"}
                  </button>
                ))}
              </div>

              {mode === "camera" ? (
                <CameraCapture onCapture={(url, aspect) => setPhoto({ url, aspect })} />
              ) : (
                <ImageUploader onSelect={(url, aspect) => setPhoto({ url, aspect })} />
              )}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      {ceremony && (
        <MemorialCeremony
          image={ceremony.image}
          name={ceremony.name}
          onDone={() => void navigate({ to: "/memorial/$id", params: { id: ceremony.id } })}
        />
      )}
    </div>
  );
}
