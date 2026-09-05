"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// Drives a modal's open/active state from a URL query param instead of local
// React state, so the browser Back button closes the modal (and forward
// re-opens it) for free — no history/popstate wiring required.
export function useQueryModal(paramKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeId = searchParams.get(paramKey);

  const open = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, id);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [paramKey, pathname, router, searchParams]
  );

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [paramKey, pathname, router, searchParams]);

  return { activeId, open, close };
}
