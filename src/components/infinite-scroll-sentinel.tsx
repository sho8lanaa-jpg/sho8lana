"use client";

import type { RefObject } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

export function InfiniteScrollSentinel({
  hasMore,
  sentinelRef,
}: {
  hasMore: boolean;
  sentinelRef: RefObject<HTMLDivElement>;
}) {
  const { t } = useLanguage();

  if (!hasMore) return null;

  return (
    <div ref={sentinelRef} className="flex items-center justify-center gap-2 py-8 text-foreground/40">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">{t.search.loadingMore}</span>
    </div>
  );
}
