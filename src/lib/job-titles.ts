import type { Lang } from "@/lib/i18n/translations";

export interface JobTitle {
  ar: string;
  en: string;
}

// A broad, curated list covering the most commonly searched roles across
// tech, business, retail, healthcare, education, and skilled trades —
// powers both the quick-suggestion chips and the search input's
// autocomplete dropdown.
export const JOB_TITLES: JobTitle[] = [
  { ar: "مطور برمجيات", en: "Software Developer" },
  { ar: "مطور واجهات أمامية", en: "Frontend Developer" },
  { ar: "مطور باك إند", en: "Backend Developer" },
  { ar: "مطور تطبيقات موبايل", en: "Mobile App Developer" },
  { ar: "مهندس بيانات", en: "Data Engineer" },
  { ar: "محلل بيانات", en: "Data Analyst" },
  { ar: "مصمم جرافيك", en: "Graphic Designer" },
  { ar: "مصمم UI/UX", en: "UI/UX Designer" },
  { ar: "محاسب", en: "Accountant" },
  { ar: "مدير مالي", en: "Financial Manager" },
  { ar: "مندوب مبيعات", en: "Sales Representative" },
  { ar: "مدير مبيعات", en: "Sales Manager" },
  { ar: "أخصائي تسويق", en: "Marketing Specialist" },
  { ar: "مدير تسويق رقمي", en: "Digital Marketing Manager" },
  { ar: "أخصائي موارد بشرية", en: "HR Specialist" },
  { ar: "مدير موارد بشرية", en: "HR Manager" },
  { ar: "خدمة عملاء", en: "Customer Service" },
  { ar: "مندوب توصيل", en: "Delivery Driver" },
  { ar: "سائق", en: "Driver" },
  { ar: "سكرتير تنفيذي", en: "Executive Secretary" },
  { ar: "مدير مكتب", en: "Office Manager" },
  { ar: "مهندس مدني", en: "Civil Engineer" },
  { ar: "مهندس معماري", en: "Architect" },
  { ar: "مهندس كهرباء", en: "Electrical Engineer" },
  { ar: "مهندس ميكانيكا", en: "Mechanical Engineer" },
  { ar: "فني صيانة", en: "Maintenance Technician" },
  { ar: "كهربائي", en: "Electrician" },
  { ar: "سباك", en: "Plumber" },
  { ar: "نجار", en: "Carpenter" },
  { ar: "طباخ / شيف", en: "Chef / Cook" },
  { ar: "نادل", en: "Waiter" },
  { ar: "بائع تجزئة", en: "Retail Sales Associate" },
  { ar: "أمين مخزن", en: "Warehouse Keeper" },
  { ar: "مشرف إنتاج", en: "Production Supervisor" },
  { ar: "عامل مصنع", en: "Factory Worker" },
  { ar: "ممرض", en: "Nurse" },
  { ar: "صيدلي", en: "Pharmacist" },
  { ar: "طبيب", en: "Doctor" },
  { ar: "أخصائي علاج طبيعي", en: "Physical Therapist" },
  { ar: "معلم", en: "Teacher" },
  { ar: "مدرس لغة إنجليزية", en: "English Teacher" },
  { ar: "محامي", en: "Lawyer" },
  { ar: "مستشار قانوني", en: "Legal Consultant" },
  { ar: "مترجم", en: "Translator" },
  { ar: "كاتب محتوى", en: "Content Writer" },
  { ar: "مصور فوتوغرافي", en: "Photographer" },
  { ar: "محرر فيديو", en: "Video Editor" },
  { ar: "مدير مشروع", en: "Project Manager" },
  { ar: "محلل أعمال", en: "Business Analyst" },
  { ar: "أمن وحراسة", en: "Security Guard" },
  { ar: "منظف / عامل نظافة", en: "Cleaner" },
];

export function getLocalizedJobTitles(lang: Lang): string[] {
  return JOB_TITLES.map((j) => j[lang]);
}
