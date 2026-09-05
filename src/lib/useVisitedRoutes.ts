"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const KEY = "salihy-visited-routes";
const EMPTY: Set<string> = new Set();

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: Set<string> | null = null;

function read(): Set<string> {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    cache = new Set();
  }
  return cache;
}

function record(pathname: string) {
  const current = read();
  if (current.has(pathname)) return;
  const next = new Set(current);
  next.add(pathname);
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(next)));
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Tracks which top-level pages a visitor has already opened this browser, so
// the Dojo Map menu can show quiet "visited" dots — purely a per-visitor
// convenience, never shared or read back by the app in any other way.
// Backed by localStorage as the external store: `useSyncExternalStore` reads
// it, and the effect below only ever calls `record()` (a plain write to that
// store), never React's own setState directly.
export function useVisitedRoutes() {
  const pathname = usePathname();
  const visited = useSyncExternalStore(subscribe, read, () => EMPTY);

  useEffect(() => {
    record(pathname);
  }, [pathname]);

  return visited;
}
