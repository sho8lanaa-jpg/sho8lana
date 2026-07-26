import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white/[0.05] bg-[length:200%_100%] bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05] animate-shimmer",
        className
      )}
      {...props}
    />
  );
}
