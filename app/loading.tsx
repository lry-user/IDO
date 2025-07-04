"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="min-h-screen p-4 relative">
      <div className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/bg.png')",
          backgroundAttachment: "fixed"
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#00000080] to-[#00000095] backdrop-blur-md" />
      <div className="relative z-10">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-32 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
          <Skeleton className="h-8 w-8 rounded-full bg-[#ffffff20] backdrop-blur-md" />
        </div>

        {/* Content Skeletons */}
        <div className="space-y-4">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 rounded-xl bg-[#ffffff20] backdrop-blur-md" />
            <Skeleton className="h-20 rounded-xl bg-[#ffffff20] backdrop-blur-md" />
            <Skeleton className="h-20 rounded-xl bg-[#ffffff20] backdrop-blur-md" />
          </div>

          {/* Card List */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl bg-[#ffffff15] backdrop-blur-lg border border-[#ffffff30]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

