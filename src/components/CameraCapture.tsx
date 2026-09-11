import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  onCapture: (dataUrl: string, aspect: number) => void;
};

export function CameraCapture({ onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<"idle" | "starting" | "live" | "denied" | "unsupported">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [shot, setShot] = useState<{ url: string; aspect: number } | null>(null);
  const [flash, setFlash] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  async function start() {
    setError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setStatus("live");
    } catch (err) {
      setStatus("denied");
      setError(err instanceof Error ? err.message : "The camera declined to participate.");
    }
  }

  function takePhotograph() {
    const video = videoRef.current;
    if (!video) return;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 960;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const url = canvas.toDataURL("image/jpeg", 0.85);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 220);
    setShot({ url, aspect: w / h });
    stop();
    setStatus("idle");
  }

  if (shot) {
    return (
      <div className="animate-ink-fade">
        <div className="border border-border bg-paper p-3">
          <img src={shot.url} alt="Captured object" className="w-full border border-border" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setShot(null);
              void start();
            }}
            className="border border-border px-4 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase hover:bg-accent"
          >
            Retake
          </button>
          <button
            type="button"
            onClick={() => onCapture(shot.url, shot.aspect)}
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
      <div className="relative overflow-hidden border border-border bg-paper-deep">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`aspect-[4/3] w-full bg-foreground/5 object-cover ${
            status === "live" ? "" : "hidden"
          }`}
        />
        {status !== "live" && (
          <div className="flex aspect-[4/3] flex-col items-center justify-center px-6 text-center">
            <p className="hand text-2xl">
              {status === "denied"
                ? "The camera refused to attend."
                : status === "unsupported"
                  ? "This device has no camera we may address."
                  : "The chamber is dark."}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {status === "denied"
                ? error ?? "Permission was not granted. You may upload a photograph instead."
                : "We require permission to observe the object."}
            </p>
            {status !== "unsupported" && (
              <button
                type="button"
                onClick={() => void start()}
                className="mt-4 border border-border-strong px-4 py-2 font-type text-[0.68rem] tracking-[0.14em] uppercase hover:bg-foreground hover:text-primary-foreground"
              >
                {status === "starting" ? "Opening…" : "Open the camera"}
              </button>
            )}
          </div>
        )}
        {flash && <div aria-hidden className="absolute inset-0 bg-paper" />}
      </div>

      {status === "live" && (
        <button
          type="button"
          onClick={takePhotograph}
          className="mt-4 w-full border border-border-strong px-4 py-3.5 font-type text-[0.72rem] tracking-[0.2em] uppercase transition-colors hover:bg-foreground hover:text-primary-foreground"
        >
          Take photograph
        </button>
      )}
    </div>
  );
}
