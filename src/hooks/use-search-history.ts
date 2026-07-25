"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/utils/storage";
import { MAX_HISTORY_ITEMS, STORAGE_KEYS } from "@/constants";
import { getGovernorateLabel } from "@/lib/governorates";
import type { SearchHistoryItem } from "@/types";

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHistory(readStorage(STORAGE_KEYS.SEARCH_HISTORY, []));
    setHydrated(true);
  }, []);

  const persist = useCallback((next: SearchHistoryItem[]) => {
    setHistory(next);
    writeStorage(STORAGE_KEYS.SEARCH_HISTORY, next);
  }, []);

  const addSearch = useCallback(
    (jobTitle: string, governorate: string) => {
      const item: SearchHistoryItem = {
        id: `${governorate}-${jobTitle}-${Date.now()}`,
        jobTitle,
        governorate,
        governorateLabel: getGovernorateLabel(governorate),
        timestamp: Date.now(),
      };

      const deduped = history.filter(
        (h) => !(h.jobTitle === jobTitle && h.governorate === governorate)
      );

      persist([item, ...deduped].slice(0, MAX_HISTORY_ITEMS));
    },
    [history, persist]
  );

  const removeSearch = useCallback(
    (id: string) => persist(history.filter((h) => h.id !== id)),
    [history, persist]
  );

  const clearHistory = useCallback(() => persist([]), [persist]);

  return { history, hydrated, addSearch, removeSearch, clearHistory };
}
