import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-white/40">
        <WifiOff className="h-8 w-8" />
      </span>
      <h1 className="font-display text-xl font-bold">مفيش اتصال بالإنترنت</h1>
      <p className="max-w-sm text-sm text-white/50">
        يبدو إنك أوفلاين دلوقتي. اتأكد من اتصالك بالإنترنت وحاول تاني.
      </p>
    </div>
  );
}
