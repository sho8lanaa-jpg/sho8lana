"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RESULTS_PAGE_SIZE } from "@/constants";

/**
 * Client-side "infinite scroll" over an already-fetched results array
 * (the webhook returns the full result set in one call; this hook
 * progressively reveals it as the user scrolls, keeping first paint fast).
 */
export function useInfiniteList<T>(items: T[]) {
  const [visibleCount, setVisibleCount] = useState(RESULTS_PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(RESULTS_PAGE_SIZE);
  }, [items]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + RESULTS_PAGE_SIZE, items.length));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [items.length]);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const hasMore = visibleCount < items.length;

  return { visibleItems, hasMore, sentinelRef };
}
