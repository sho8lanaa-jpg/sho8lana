"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchForm } from "@/components/search-form";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { SearchFormValues } from "@/lib/schemas";

export function Hero() {
  const router = useRouter();
  const { t } = useLanguage();

  function handleSearch(values: SearchFormValues) {
    const params = new URLSearchParams({ job: values.jobTitle, gov: values.governorate });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-grid-glow">
      <div className="pointer-events-none absolute inset-0 bg-accent-radial" />

      <div className="container relative flex flex-col items-center gap-8 py-20 text-center sm:py-28">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-full border border-border bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/60"
        >
          {t.hero.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-3xl font-display text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl"
        >
          {t.hero.titlePrefix}{" "}
          <span className="bg-gradient-to-l from-primary-400 to-accent bg-clip-text text-transparent">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl text-balance text-base text-white/60 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <div className="w-full max-w-2xl">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
