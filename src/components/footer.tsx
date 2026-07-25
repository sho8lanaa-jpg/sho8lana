import Link from "next/link";
import { Briefcase } from "lucide-react";
import { SITE_NAME_AR } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center gap-4 py-10 text-sm text-white/50 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-medium text-white/70">
          <Briefcase className="h-4 w-4 text-primary-400" />
          {SITE_NAME_AR}
        </div>
        <p>ابحث عن شغلك في ثواني — كل الشركات القريبة منك في مكان واحد.</p>
        <div className="flex items-center gap-4">
          <Link href="/search" className="hover:text-white">
            بحث
          </Link>
          <Link href="/favorites" className="hover:text-white">
            المفضلة
          </Link>
        </div>
      </div>
    </footer>
  );
}
