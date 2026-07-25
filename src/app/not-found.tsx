import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-white/40">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="font-display text-2xl font-bold">الصفحة مش موجودة</h1>
      <p className="max-w-sm text-sm text-white/50">
        الرابط اللي دخلت عليه مش متاح. ممكن يكون اتشال أو الرابط غلط.
      </p>
      <Button asChild>
        <Link href="/">ارجع للرئيسية</Link>
      </Button>
    </div>
  );
}
