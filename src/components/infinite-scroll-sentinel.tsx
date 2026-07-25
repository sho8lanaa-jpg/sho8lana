"use client";

import type { RefObject } from "react";
import { Loader2 } from "lucide-react";

export function InfiniteScrollSentinel({
  hasMore,
  sentinelRef,
}: {
  hasMore: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
}) {
  if (!hasMore) return null;

  return (
    <div ref={sentinelRef} className="flex items-center justify-center gap-2 py-8 text-white/40">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">بيحمل نتائج تانية…</span>
    </div>
  );
}
