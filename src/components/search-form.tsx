"use client";

import { useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GovernorateSelect } from "@/components/governorate-select";
import { searchSchema, type SearchFormValues } from "@/lib/schemas";
import { useLanguage } from "@/lib/i18n/language-provider";
import { getLocalizedJobTitles } from "@/lib/job-titles";

interface SearchFormProps {
  defaultValues?: Partial<SearchFormValues>;
  loading?: boolean;
  onSearch: (values: SearchFormValues) => void;
}

const QUICK_SUGGESTIONS_COUNT = 6;

export function SearchForm({ defaultValues, loading, onSearch }: SearchFormProps) {
  const { t, lang } = useLanguage();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout>>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { jobTitle: defaultValues?.jobTitle ?? "", governorate: defaultValues?.governorate ?? "" },
  });

  const governorate = watch("governorate");
  const jobTitleValue = watch("jobTitle");

  const allTitles = useMemo(() => getLocalizedJobTitles(lang), [lang]);
  const quickSuggestions = useMemo(() => allTitles.slice(0, QUICK_SUGGESTIONS_COUNT), [allTitles]);

  const matches = useMemo(() => {
    const query = (jobTitleValue || "").trim().toLowerCase();
    if (!query) return [];
    return allTitles.filter((title) => title.toLowerCase().includes(query)).slice(0, 6);
  }, [allTitles, jobTitleValue]);

  function selectJobTitle(title: string) {
    setValue("jobTitle", title, { shouldValidate: true });
    setShowSuggestions(false);
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSearch)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full rounded-2xl border border-border bg-card p-3 shadow-card backdrop-blur-xl sm:p-4"
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-[1.3]">
          <label htmlFor="jobTitle" className="sr-only">
            {t.searchForm.jobPlaceholder}
          </label>
          <Input
            id="jobTitle"
            placeholder={t.searchForm.jobPlaceholder}
            aria-invalid={!!errors.jobTitle}
            aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
            autoComplete="off"
            {...register("jobTitle", {
              onChange: () => setShowSuggestions(true),
            })}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              blurTimeout.current = setTimeout(() => setShowSuggestions(false), 120);
            }}
          />

          <AnimatePresence>
            {showSuggestions && matches.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-[#0F172A]/95 backdrop-blur-xl shadow-card"
              >
                {matches.map((title) => (
                  <li key={title}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectJobTitle(title)}
                      className="flex w-full items-center px-4 py-2.5 text-right text-sm text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      {title}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1">
          <label htmlFor="governorate" className="sr-only">
            {t.searchForm.governoratePlaceholder}
          </label>
          <GovernorateSelect
            value={governorate}
            onChange={(v) => setValue("governorate", v, { shouldValidate: true })}
          />
        </div>

        <Button type="submit" size="lg" disabled={loading} className="sm:w-40">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t.searchForm.searching}
            </span>
          ) : (
            <>
              <Search className="h-4 w-4" />
              {t.searchForm.searchButton}
            </>
          )}
        </Button>
      </div>

      {(errors.jobTitle || errors.governorate) && (
        <p id="jobTitle-error" role="alert" className="mt-2 px-1 text-xs text-destructive">
          {errors.jobTitle?.message ?? errors.governorate?.message}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
        <Sparkles className="h-3.5 w-3.5 text-white/30" />
        {quickSuggestions.map((title) => (
          <button
            type="button"
            key={title}
            onClick={() => selectJobTitle(title)}
            className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {title}
          </button>
        ))}
      </div>
    </motion.form>
  );
}
