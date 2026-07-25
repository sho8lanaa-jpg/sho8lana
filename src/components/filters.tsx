"use client";

import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { SearchFilters, SortOption } from "@/types";

interface FiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  resultCount: number;
}

const RATING_OPTIONS = [0, 3, 4, 4.5];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "rating", label: "الأعلى تقييمًا" },
  { value: "alphabetical", label: "أبجديًا" },
];

export function Filters({ filters, onChange, resultCount }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-border bg-white/[0.02] px-4 py-3 text-sm">
      <div className="flex items-center gap-1.5 text-white/50">
        <SlidersHorizontal className="h-4 w-4" />
        <span>{resultCount} نتيجة</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-white/50">الحد الأدنى للتقييم</span>
        <div className="flex gap-1">
          {RATING_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: r })}
              className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${
                filters.minRating === r
                  ? "bg-primary text-white"
                  : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
              }`}
            >
              {r === 0 ? "الكل" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-white/70">
        <Checkbox
          checked={filters.hasWebsite}
          onCheckedChange={(v) => onChange({ ...filters, hasWebsite: v === true })}
        />
        عندها موقع
      </label>

      <label className="flex cursor-pointer items-center gap-2 text-white/70">
        <Checkbox
          checked={filters.hasPhone}
          onCheckedChange={(v) => onChange({ ...filters, hasPhone: v === true })}
        />
        عندها تليفون
      </label>

      <div className="flex items-center gap-2 sm:mr-auto">
        <span className="text-white/50">ترتيب حسب</span>
        <div className="flex gap-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, sortBy: opt.value })}
              className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${
                filters.sortBy === opt.value
                  ? "bg-primary text-white"
                  : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
