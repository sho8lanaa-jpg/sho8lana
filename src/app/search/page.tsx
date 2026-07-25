import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/search-page-client";
import { LoadingSkeleton } from "@/components/loading-skeleton";

export const metadata: Metadata = {
  title: "نتائج البحث",
  description: "شركات بتوظف قريبة منك حسب المسمى الوظيفي والمحافظة.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-14">
          <LoadingSkeleton />
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
