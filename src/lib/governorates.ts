import type { Governorate } from "@/types";

// المحافظات المصرية الـ27 — تُستخدم في نموذج البحث وصفحة SEO
export const GOVERNORATES: Governorate[] = [
  { value: "cairo", label: "القاهرة" },
  { value: "giza", label: "الجيزة" },
  { value: "alexandria", label: "الإسكندرية" },
  { value: "qalyubia", label: "القليوبية" },
  { value: "sharqia", label: "الشرقية" },
  { value: "dakahlia", label: "الدقهلية" },
  { value: "beheira", label: "البحيرة" },
  { value: "gharbia", label: "الغربية" },
  { value: "monufia", label: "المنوفية" },
  { value: "kafr-el-sheikh", label: "كفر الشيخ" },
  { value: "damietta", label: "دمياط" },
  { value: "port-said", label: "بورسعيد" },
  { value: "ismailia", label: "الإسماعيلية" },
  { value: "suez", label: "السويس" },
  { value: "north-sinai", label: "شمال سيناء" },
  { value: "south-sinai", label: "جنوب سيناء" },
  { value: "beni-suef", label: "بني سويف" },
  { value: "fayoum", label: "الفيوم" },
  { value: "minya", label: "المنيا" },
  { value: "assiut", label: "أسيوط" },
  { value: "sohag", label: "سوهاج" },
  { value: "qena", label: "قنا" },
  { value: "luxor", label: "الأقصر" },
  { value: "aswan", label: "أسوان" },
  { value: "red-sea", label: "البحر الأحمر" },
  { value: "new-valley", label: "الوادي الجديد" },
  { value: "matrouh", label: "مطروح" },
];

export function getGovernorateLabel(value: string): string {
  return GOVERNORATES.find((g) => g.value === value)?.label ?? value;
}
