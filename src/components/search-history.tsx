"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getGovernorateLabel } from "@/lib/governorates";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { SearchHistoryItem } from "@/types";

interface SearchHistoryListProps {
  history: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onRemove: (id: string) => void;
}

export function SearchHistoryList({ history, onSelect, onRemove }: SearchHistoryListProps) {
  const { t, lang } = useLanguage();

  if (history.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-white/40">
        {t.history.empty}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {history.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.03 }}
        >
          <Card className="group flex items-center justify-between gap-3 p-4 hover:bg-card-hover">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="flex flex-1 items-center gap-3 text-right"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
                <Clock className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-medium">{item.jobTitle}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-white/40">
                  <MapPin className="h-3 w-3" />
                  {getGovernorateLabel(item.governorate, lang)}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={t.history.remove}
              className="rounded-lg p-1.5 text-white/30 opacity-0 transition-opacity hover:bg-white/[0.06] hover:text-white group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
