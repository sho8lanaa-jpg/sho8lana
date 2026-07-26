"use client";

import { useRouter } from "next/navigation";
import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchHistoryList } from "@/components/search-history";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function HistoryPage() {
  const router = useRouter();
  const { history, hydrated, removeSearch, clearHistory } = useSearchHistory();
  const { t } = useLanguage();

  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold">
            <History className="h-5 w-5 text-primary-400" />
            {t.history.title}
          </h1>
          <p className="mt-1 text-sm text-foreground/40">{t.history.subtitle}</p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory}>
            <Trash2 className="h-3.5 w-3.5" />
            {t.history.clearAll}
          </Button>
        )}
      </div>

      {hydrated && (
        <SearchHistoryList
          history={history}
          onRemove={removeSearch}
          onSelect={(item) =>
            router.push(`/search?job=${encodeURIComponent(item.jobTitle)}&gov=${item.governorate}`)
          }
        />
      )}
    </div>
  );
}
