"use client";

import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoritesList } from "@/components/favorites-list";
import { useFavorites } from "@/hooks/use-favorites";

export default function FavoritesPage() {
  const { favorites, hydrated, toggleFavorite, clearFavorites } = useFavorites();

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold">
            <Heart className="h-5 w-5 text-red-500" />
            المفضلة
          </h1>
          <p className="mt-1 text-sm text-white/40">الشركات اللي حفظتها عشان ترجعلها بسهولة.</p>
        </div>
        {favorites.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearFavorites}>
            <Trash2 className="h-3.5 w-3.5" />
            مسح الكل
          </Button>
        )}
      </div>

      {hydrated && <FavoritesList favorites={favorites} onToggleFavorite={toggleFavorite} />}
    </div>
  );
}
