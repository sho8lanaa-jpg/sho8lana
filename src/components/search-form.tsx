"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GovernorateSelect } from "@/components/governorate-select";
import { searchSchema, type SearchFormValues } from "@/lib/schemas";

interface SearchFormProps {
  defaultValues?: Partial<SearchFormValues>;
  loading?: boolean;
  onSearch: (values: SearchFormValues) => void;
}

const SUGGESTIONS = ["مطور برمجيات", "محاسب", "مندوب مبيعات", "مصمم جرافيك", "أخصائي تسويق"];

export function SearchForm({ defaultValues, loading, onSearch }: SearchFormProps) {
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
        <div className="flex-[1.3]">
          <label htmlFor="jobTitle" className="sr-only">
            المسمى الوظيفي
          </label>
          <Input
            id="jobTitle"
            placeholder="اكتب المسمى الوظيفي… مثلاً مطور برمجيات"
            aria-invalid={!!errors.jobTitle}
            aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
            {...register("jobTitle")}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="governorate" className="sr-only">
            المحافظة
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
              بيدور…
            </span>
          ) : (
            <>
              <Search className="h-4 w-4" />
              دور دلوقتي
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
        {SUGGESTIONS.map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setValue("jobTitle", s, { shouldValidate: true })}
            className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.form>
  );
}
