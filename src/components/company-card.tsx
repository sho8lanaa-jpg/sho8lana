"use client";

import { motion } from "framer-motion";
import { Building2, Heart, MapPin, Phone, Star, Globe, Navigation, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatRating, normalizePhone } from "@/lib/utils";
import { copyToClipboard } from "@/utils/share";
import { toast } from "sonner";
import type { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
  isFavorite: boolean;
  onToggleFavorite: (company: Company) => void;
  index?: number;
}

export function CompanyCard({ company, isFavorite, onToggleFavorite, index = 0 }: CompanyCardProps) {
  const phone = normalizePhone(company.phone);

  async function handleCopyAddress() {
    const ok = await copyToClipboard(company.address);
    toast(ok ? "تم نسخ العنوان" : "تعذر نسخ العنوان");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -3 }}
    >
      <Card className="group flex h-full flex-col gap-4 p-5 hover:bg-card-hover">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary-400">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold leading-snug">
                {company.company_name}
              </h3>
              {company.rating !== null && (
                <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {formatRating(company.rating)}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(company)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            className="shrink-0 rounded-lg p-2 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-red-400"
          >
            <Heart className={cn("h-[1.125rem] w-[1.125rem]", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopyAddress}
          className="flex items-start gap-2 text-right text-sm text-white/60 transition-colors hover:text-white/80"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
          <span className="flex-1">{company.address}</span>
          <Copy className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
        </button>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {phone && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${phone}`} aria-label={`اتصل بـ ${company.company_name}`}>
                <Phone className="h-3.5 w-3.5" />
                اتصال
              </a>
            </Button>
          )}
          {company.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-3.5 w-3.5" />
                الموقع
              </a>
            </Button>
          )}
          <Button variant="default" size="sm" asChild>
            <a href={company.maps_url} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-3.5 w-3.5" />
              الاتجاهات
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
