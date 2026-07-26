"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildSearchShareUrl, copyToClipboard } from "@/utils/share";
import { useLanguage } from "@/lib/i18n/language-provider";

export function ShareSearchButton({ jobTitle, governorate }: { jobTitle: string; governorate: string }) {
  const { t } = useLanguage();

  async function handleShare() {
    const url = buildSearchShareUrl(jobTitle, governorate);
    const ok = await copyToClipboard(url);
    toast(ok ? t.search.shareCopied : t.search.shareCopyFailed);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="h-3.5 w-3.5" />
      {t.search.shareSearch}
    </Button>
  );
}
