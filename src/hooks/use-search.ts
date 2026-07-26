"use client";

import { useCallback, useState } from "react";
import { searchCompanies, SearchServiceError } from "@/services/search-service";
import type { SearchState } from "@/types";

const initialState: SearchState = {
  status: "idle",
  results: [],
  count: 0,
  cached: false,
  error: null,
};

export function useSearch() {
  const [state, setState] = useState<SearchState>(initialState);

  const runSearch = useCallback(async (jobTitle: string, governorate: string) => {
    setState((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      const response = await searchCompanies({ jobTitle, governorate });
      const results = response.results ?? [];

      // إذا كانت الاستجابة غير ناجحة من الـ AI أو النتائج فارغة
      if (!response.success || results.length === 0) {
        setState({
          status: "empty",
          results: [],
          count: 0,
          cached: response.cached ?? false,
          error: response.message || null, // تمرير الرسالة الخاصة بالوظيفة
        });
        return;
      }

      setState({
        status: "success",
        results,
        count: response.count ?? results.length,
        cached: response.cached ?? false,
        error: null,
      });
    } catch (err) {
      const message =
        err instanceof SearchServiceError ? err.message : "حصل خطأ غير متوقع.";
      setState({ ...initialState, status: "error", error: message });
    }
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  return { ...state, runSearch, reset };
}