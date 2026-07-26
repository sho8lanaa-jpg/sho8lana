"use client";

import { Hero } from "@/components/hero";
import { Building2, MapPin, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

export function HomeContent() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t.features.instantTitle, description: t.features.instantDesc },
    { icon: MapPin, title: t.features.nearTitle, description: t.features.nearDesc },
    { icon: Building2, title: t.features.dataTitle, description: t.features.dataDesc },
  ];

  return (
    <>
      <Hero />

      <section className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-colors hover:bg-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
