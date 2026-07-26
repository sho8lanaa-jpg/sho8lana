"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/error-state";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // In production, report to your error-tracking service here.
    console.error(error);
  }, [error]);

  return (
    <div className="container py-20">
      <ErrorState message={t.errorPage.message} onRetry={reset} />
    </div>
  );
}
