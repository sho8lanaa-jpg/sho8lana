"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SearchForm } from "@/components/search-form";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { CompanyCard } from "@/components/company-card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { Filters } from "@/components/filters";
import { ShareSearchButton } from "@/components/share-search-button";
import { InfiniteScrollSentinel } from "@/components/infinite-scroll-sentinel";
import { useSearch } from "@/hooks/use-search";
import { useFavorites } from "@/hooks/use-favorites";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useInfiniteList } from "@/hooks/use-infinite-list";
import { getGovernorateLabel } from "@/lib/governorates";
import { DEFAULT_FILTERS } from "@/constants";
import type { SearchFilters } from "@/types";
import type { SearchFormValues } from "@/lib/schemas";

export function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialJobTitle = searchParams.get("job") ?? "";
  const initialGovernorate = searchParams.get("gov") ?? "";

  const { status, results, count, cached, error, runSearch } = useSearch();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addSearch } = useSearchHistory();
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [lastQuery, setLastQuery] = useState({ jobTitle: initialJobTitle, governorate: initialGovernorate });

  const performSearch = useCallback(
    (jobTitle: string, governorate: string) => {
      setLastQuery({ jobTitle, governorate });
      runSearch(jobTitle, governorate);
      addSearch(jobTitle, governorate);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSearch]
  );

  useEffect(() => {
    if (initialJobTitle && initialGovernorate) {
      runSearch(initialJobTitle, initialGovernorate);
      addSearch(initialJobTitle, initialGovernorate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(values: SearchFormValues) {
    const params = new URLSearchParams({ job: values.jobTitle, gov: values.governorate });
    router.replace(`/search?${params.toString()}`);
    performSearch(values.jobTitle, values.governorate);
  }

  const filteredResults = useMemo(() => {
    let list = results.filter((c) => (c.rating ?? 0) >= filters.minRating);
    if (filters.hasWebsite) list = list.filter((c) => !!c.website);
    if (filters.hasPhone) list = list.filter((c) => !!c.phone);

    list = [...list].sort((a, b) => {
      if (filters.sortBy === "alphabetical") {
        return a.company_name.localeCompare(b.company_name, "ar");
      }
      return (b.rating ?? 0) - (a.rating ?? 0);
    });

    return list;
  }, [results, filters]);

  const { visibleItems, hasMore, sentinelRef } = useInfiniteList(filteredResults);

  return (
    <div className="container py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <SearchForm
          defaultValues={{ jobTitle: initialJobTitle, governorate: initialGovernorate }}
          loading={status === "loading"}
          onSearch={handleSubmit}
        />
      </motion.div>

      {status === "loading" && <LoadingSkeleton />}

      {status === "error" && (
        <ErrorState
          message={error ?? undefined}
          onRetry={() => performSearch(lastQuery.jobTitle, lastQuery.governorate)}
        />
      )}

      {status === "empty" && (
        <EmptyState
          description={`مفيش شركات لـ "${lastQuery.jobTitle}" في ${getGovernorateLabel(
            lastQuery.governorate
          )} دلوقتي. جرب مسمى وظيفي تاني.`}
        />
      )}

      {status === "success" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold">
                نتائج البحث عن &quot;{lastQuery.jobTitle}&quot;
              </h2>
              <p className="text-sm text-white/40">
                {getGovernorateLabel(lastQuery.governorate)} · {count} نتيجة
                {cached ? " · من الكاش" : ""}
              </p>
            </div>
            <ShareSearchButton jobTitle={lastQuery.jobTitle} governorate={lastQuery.governorate} />
          </div>

          <Filters filters={filters} onChange={setFilters} resultCount={filteredResults.length} />

          {filteredResults.length === 0 ? (
            <EmptyState
              title="مفيش نتائج مطابقة للفلاتر"
              description="جرب تشيل بعض الفلاتر عشان تشوف نتائج أكتر."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((company, i) => (
                  <CompanyCard
                    key={`${company.company_name}-${company.address}`}
                    company={company}
                    isFavorite={isFavorite(company)}
                    onToggleFavorite={toggleFavorite}
                    index={i}
                  />
                ))}
              </div>
              <InfiniteScrollSentinel hasMore={hasMore} sentinelRef={sentinelRef} />
            </>
          )}
        </div>
      )}

      {status === "idle" && (
        <EmptyState
          title="ابدأ بحثك الأول"
          description="اكتب المسمى الوظيفي واختار المحافظة عشان نعرضلك الشركات المناسبة."
        />
      )}
    </div>
  );
}
