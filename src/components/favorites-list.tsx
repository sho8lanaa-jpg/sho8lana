"use client";

import { CompanyCard } from "@/components/company-card";
import { EmptyState } from "@/components/empty-state";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { FavoriteCompany } from "@/types";

interface FavoritesListProps {
  favorites: FavoriteCompany[];
  onToggleFavorite: (company: FavoriteCompany) => void;
}

export function FavoritesList({ favorites, onToggleFavorite }: FavoritesListProps) {
  const { t } = useLanguage();

  if (favorites.length === 0) {
    return <EmptyState title={t.favorites.emptyTitle} description={t.favorites.emptyDesc} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((company, i) => (
        <CompanyCard
          key={company.id}
          company={company}
          isFavorite
          onToggleFavorite={() => onToggleFavorite(company)}
          index={i}
        />
      ))}
    </div>
  );
}
