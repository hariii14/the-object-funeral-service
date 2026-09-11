import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  seedMemorials,
  SEED_IMAGES,
  type Memorial,
  type MemorialDraft,
  type Tribute,
} from "./memorials";

/**
 * Local prototype persistence. Everything goes through this module so a real
 * backend can replace the four functions below without touching components.
 */

const KEY = "ofs.memorials.v1";

let cache: Memorial[] | null = null;
const listeners = new Set<() => void>();

function read(): Memorial[] {
  if (cache) return cache;
  if (typeof window === "undefined") return (cache = seedMemorials());
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return (cache = seedMemorials());
    const parsed = JSON.parse(raw) as Memorial[];
    // Re-attach bundled seed photographs (their URLs change between builds).
    const next = parsed.map((m) => {
      const seedImage = SEED_IMAGES[m.id];
      return m.seed && seedImage ? { ...m, image: seedImage } : m;
    });
    cache = next;
    return next;
  } catch {
    return (cache = seedMemorials());
  }
}

function write(next: Memorial[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full — the memorial lives on in this session only */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const SERVER_SNAPSHOT = seedMemorials();

export function useMemorials(): Memorial[] {
  return useSyncExternalStore(subscribe, read, () => SERVER_SNAPSHOT);
}

export function useMemorial(id: string): Memorial | undefined {
  return useMemorials().find((m) => m.id === id);
}

/** Rehydrates from localStorage after mount so SSR markup stays stable. */
export function useHydrateStore() {
  useEffect(() => {
    cache = null;
    read();
    listeners.forEach((l) => l());
  }, []);
}

export function createMemorial(draft: MemorialDraft): Memorial {
  const memorial: Memorial = {
    ...draft,
    aspect: draft.aspect ?? 3 / 4,
    id: `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    candles: 0,
    tributes: [],
    createdAt: Date.now(),
  };
  write([memorial, ...read()]);
  return memorial;
}

export function lightCandle(id: string) {
  write(read().map((m) => (m.id === id ? { ...m, candles: m.candles + 1 } : m)));
}

export function addTribute(id: string, text: string) {
  const tribute: Tribute = {
    id: `t-${Date.now().toString(36)}`,
    text: text.trim(),
    at: Date.now(),
  };
  write(read().map((m) => (m.id === id ? { ...m, tributes: [...m.tributes, tribute] } : m)));
}

export function useActions() {
  return {
    createMemorial: useCallback(createMemorial, []),
    lightCandle: useCallback(lightCandle, []),
    addTribute: useCallback(addTribute, []),
  };
}
