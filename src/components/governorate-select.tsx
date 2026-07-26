"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GOVERNORATES } from "@/lib/governorates";
import { useLanguage } from "@/lib/i18n/language-provider";

interface GovernorateSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function GovernorateSelect({ value, onChange, disabled }: GovernorateSelectProps) {
  const { t, lang } = useLanguage();

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger aria-label={t.searchForm.governoratePlaceholder}>
        <SelectValue placeholder={t.searchForm.governoratePlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {GOVERNORATES.map((gov) => (
          <SelectItem key={gov.value} value={gov.value}>
            {lang === "ar" ? gov.ar : gov.en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
