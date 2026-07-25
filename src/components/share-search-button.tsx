"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { buildSearchShareUrl, copyToClipboard } from "@/utils/share";

export function ShareSearchButton({ jobTitle, governorate }: { jobTitle: string; governorate: string }) {
  async function handleShare() {
    const url = buildSearchShareUrl(jobTitle, governorate);
    const ok = await copyToClipboard(url);
    toast(ok ? "تم نسخ رابط البحث" : "تعذر نسخ الرابط");
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="h-3.5 w-3.5" />
      شارك البحث
    </Button>
  );
}
