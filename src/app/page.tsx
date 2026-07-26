import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: "ابحث عن شغلك في ثواني | Find your job in seconds",
};

export default function HomePage() {
  return <HomeContent />;
}
