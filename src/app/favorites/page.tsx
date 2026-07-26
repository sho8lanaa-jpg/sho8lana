"use client";

import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoritesList } from "@/components/favorites-list";
import { useFavorites } from "@/hooks/use-favorites";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function FavoritesPage() {
  const { favorites, hydrated, toggleFavorite, clearFavorites } = useFavorites();
  const { t } = useLanguage();

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold">
            <Heart className="h-5 w-5 text-red-500" />
            {t.favorites.title}
          </h1>
          <p className="mt-1 text-sm text-white/40">{t.favorites.subtitle}</p>
        </div>
        {favorites.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearFavorites}>
            <Trash2 className="h-3.5 w-3.5" />
            {t.favorites.clearAll}
          </Button>
        )}
      </div>

      {hydrated && <FavoritesList favorites={favorites} onToggleFavorite={toggleFavorite} />}
    </div>
  );
}
