"use client";

import { WifiOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function OfflinePage() {
  const { t } = useLanguage();

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/[0.04] text-foreground/40">
        <WifiOff className="h-8 w-8" />
      </span>
      <h1 className="font-display text-xl font-bold">{t.offline.title}</h1>
      <p className="max-w-sm text-sm text-foreground/50">{t.offline.desc}</p>
    </div>
  );
}
