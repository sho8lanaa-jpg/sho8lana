"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center gap-4 py-10 text-sm text-white/50 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-medium text-white/70">
          <Briefcase className="h-4 w-4 text-primary-400" />
          {t.common.siteName}
        </div>
        <p>{t.footer.tagline}</p>
        <div className="flex items-center gap-4">
          <Link href="/search" className="hover:text-white">
            {t.nav.search}
          </Link>
          <Link href="/favorites" className="hover:text-white">
            {t.nav.favorites}
          </Link>
        </div>
      </div>
    </footer>
  );
}
