"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GOVERNORATES } from "@/lib/governorates";

interface GovernorateSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function GovernorateSelect({ value, onChange, disabled }: GovernorateSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger aria-label="اختر المحافظة">
        <SelectValue placeholder="اختر المحافظة" />
      </SelectTrigger>
      <SelectContent>
        {GOVERNORATES.map((gov) => (
          <SelectItem key={gov.value} value={gov.value}>
            {gov.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
