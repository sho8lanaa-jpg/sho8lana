"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants";
import type { Company, FavoriteCompany } from "@/types";

function makeId(company: Company): string {
  return `${company.company_name}-${company.address}`.replace(/\s+/g, "-");
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCompany[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readStorage(STORAGE_KEYS.FAVORITES, []));
    setHydrated(true);
  }, []);

  const persist = useCallback((next: FavoriteCompany[]) => {
    setFavorites(next);
    writeStorage(STORAGE_KEYS.FAVORITES, next);
  }, []);

  const isFavorite = useCallback(
    (company: Company) => favorites.some((f) => f.id === makeId(company)),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (company: Company) => {
      const id = makeId(company);
      const exists = favorites.some((f) => f.id === id);

      if (exists) {
        persist(favorites.filter((f) => f.id !== id));
      } else {
        persist([{ ...company, id, favoritedAt: Date.now() }, ...favorites]);
      }
    },
    [favorites, persist]
  );

  const removeFavorite = useCallback(
    (id: string) => persist(favorites.filter((f) => f.id !== id)),
    [favorites, persist]
  );

  const clearFavorites = useCallback(() => persist([]), [persist]);

  return { favorites, hydrated, isFavorite, toggleFavorite, removeFavorite, clearFavorites };
}
