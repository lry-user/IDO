import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-[#ffffff20] backdrop-blur-md animate-pulse", className)} />
  );
}
