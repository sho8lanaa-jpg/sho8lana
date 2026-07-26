import type { Governorate } from "@/types";
import type { Lang } from "@/lib/i18n/translations";

// The 27 Egyptian governorates — powers the search form dropdown and the SEO sitemap.
export const GOVERNORATES: Governorate[] = [
  { value: "cairo", ar: "القاهرة", en: "Cairo" },
  { value: "giza", ar: "الجيزة", en: "Giza" },
  { value: "alexandria", ar: "الإسكندرية", en: "Alexandria" },
  { value: "qalyubia", ar: "القليوبية", en: "Qalyubia" },
  { value: "sharqia", ar: "الشرقية", en: "Sharqia" },
  { value: "dakahlia", ar: "الدقهلية", en: "Dakahlia" },
  { value: "beheira", ar: "البحيرة", en: "Beheira" },
  { value: "gharbia", ar: "الغربية", en: "Gharbia" },
  { value: "monufia", ar: "المنوفية", en: "Monufia" },
  { value: "kafr-el-sheikh", ar: "كفر الشيخ", en: "Kafr El Sheikh" },
  { value: "damietta", ar: "دمياط", en: "Damietta" },
  { value: "port-said", ar: "بورسعيد", en: "Port Said" },
  { value: "ismailia", ar: "الإسماعيلية", en: "Ismailia" },
  { value: "suez", ar: "السويس", en: "Suez" },
  { value: "north-sinai", ar: "شمال سيناء", en: "North Sinai" },
  { value: "south-sinai", ar: "جنوب سيناء", en: "South Sinai" },
  { value: "beni-suef", ar: "بني سويف", en: "Beni Suef" },
  { value: "fayoum", ar: "الفيوم", en: "Fayoum" },
  { value: "minya", ar: "المنيا", en: "Minya" },
  { value: "assiut", ar: "أسيوط", en: "Assiut" },
  { value: "sohag", ar: "سوهاج", en: "Sohag" },
  { value: "qena", ar: "قنا", en: "Qena" },
  { value: "luxor", ar: "الأقصر", en: "Luxor" },
  { value: "aswan", ar: "أسوان", en: "Aswan" },
  { value: "red-sea", ar: "البحر الأحمر", en: "Red Sea" },
  { value: "new-valley", ar: "الوادي الجديد", en: "New Valley" },
  { value: "matrouh", ar: "مطروح", en: "Matrouh" },
];

export function getGovernorateLabel(value: string, lang: Lang = "ar"): string {
  const gov = GOVERNORATES.find((g) => g.value === value);
  if (!gov) return value;
  return lang === "ar" ? gov.ar : gov.en;
}
