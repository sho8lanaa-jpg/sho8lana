"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function EmptyState({ title, description, onRetry }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-white/[0.02] py-20 text-center"
    >
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-white/30"
      >
        <SearchX className="h-8 w-8" />
      </motion.span>
      <div>
        <h3 className="font-display text-lg font-semibold">{title ?? t.emptyState.defaultTitle}</h3>
        <p className="mt-1 max-w-sm text-sm text-white/50">{description ?? t.emptyState.defaultDesc}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {t.emptyState.retry}
        </Button>
      )}
    </motion.div>
  );
}
