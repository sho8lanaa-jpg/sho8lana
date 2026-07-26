"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Heart, History } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import { SITE_NAME_AR } from "@/constants";

const links = [
  { href: "/search", label: "بحث", icon: Briefcase },
  { href: "/favorites", label: "المفضلة", icon: Heart },
  { href: "/history", label: "السجل", icon: History },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow">
            <Briefcase className="h-[1.125rem] w-[1.125rem] text-white" />
          </span>
          <span>{SITE_NAME_AR}</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="التنقل الرئيسي">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>

      <nav
        className="flex items-center justify-around border-t border-border sm:hidden"
        aria-label="التنقل الرئيسي للموبايل"
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                active ? "text-primary-400" : "text-white/50"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
