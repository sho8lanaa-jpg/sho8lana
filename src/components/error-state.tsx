"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 py-20 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold">{t.errorState.title}</h3>
        <p className="mt-1 max-w-sm text-sm text-white/50">{message ?? t.errorState.defaultMessage}</p>
      </div>
      {onRetry && (
        <Button variant="default" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" />
          {t.errorState.retry}
        </Button>
      )}
    </motion.div>
  );
}
