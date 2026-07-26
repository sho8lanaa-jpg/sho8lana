"use client";

import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/[0.04] text-foreground/40">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="font-display text-2xl font-bold">{t.notFound.title}</h1>
      <p className="max-w-sm text-sm text-foreground/50">{t.notFound.desc}</p>
      <Button asChild>
        <Link href="/">{t.notFound.backHome}</Link>
      </Button>
    </div>
  );
}
