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

export function EmptyState({ title, onRetry }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-foreground/[0.02] py-20 text-center"
    >
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/[0.04] text-foreground/30"
      >
        <SearchX className="h-8 w-8" />
      </motion.span>
      <div>
        <h3 className="font-display text-lg font-semibold">
          {title ?? t.emptyState.defaultTitle}
        </h3>
        {/* شيلنا الـ description خالص عشان مفيش أي سطر إيرور يظهر للمستخدم */}
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {t.emptyState.retry}
        </Button>
      )}
    </motion.div>
  );
}