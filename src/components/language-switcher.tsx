"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";

export function LanguageSwitcher() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربي"}
      className="gap-1.5 px-3"
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-semibold uppercase">{lang === "ar" ? "EN" : "AR"}</span>
    </Button>
  );
}
