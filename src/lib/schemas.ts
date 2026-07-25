import { z } from "zod";

export const searchSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(2, "المسمى الوظيفي لازم يكون حرفين على الأقل")
    .max(80, "المسمى الوظيفي طويل جدًا"),
  governorate: z
    .string()
    .trim()
    .min(1, "من فضلك اختر المحافظة"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
