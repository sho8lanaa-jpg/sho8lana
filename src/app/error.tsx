"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, report to your error-tracking service here.
    console.error(error);
  }, [error]);

  return (
    <div className="container py-20">
      <ErrorState message="حصل خطأ غير متوقع في الصفحة." onRetry={reset} />
    </div>
  );
}
