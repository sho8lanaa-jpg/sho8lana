"use client";

import type { Ref } from "react";
import { Loader2 } from "lucide-react";

type InfiniteScrollSentinelProps = {
  hasMore: boolean;
  sentinelRef: Ref<HTMLDivElement>;
};

export function InfiniteScrollSentinel({
  hasMore,
  sentinelRef,
}: InfiniteScrollSentinelProps) {
  if (!hasMore) return null;

  return (
    <div
      ref={sentinelRef}
      className="flex items-center justify-center gap-2 py-8 text-white/40"
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">بيحمل نتائج تانية…</span>
    </div>
  );
}
