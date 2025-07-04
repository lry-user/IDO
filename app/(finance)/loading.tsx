"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="min-h-screen">
      {/* GlobalParticipationCard Skeleton */}
      {/* <div className="rounded-3xl bg-[#2f2f2f] p-4 border border-[#3f3f3f] mb-4 py-8">
        <div className="flex flex-col items-center">
          <Skeleton className="h-4 w-32 rounded-lg mb-2" />
          <Skeleton className="h-8 w-40 rounded-lg mb-4" />
          <Skeleton className="h-4 w-28 rounded-lg" />
        </div>
      </div> */}

      {/* RecordButton Skeleton */}
      <div className="flex justify-end mb-4">
        <Skeleton className="h-6 w-20 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
      </div>

      {/* StakingCards Skeletons */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border rounded-2xl p-4 mb-4 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-8">
              <Skeleton className="h-6 w-24 rounded-full  bg-[#ffffff20] backdrop-blur-md" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
              </div>
            </div>
            <div className="flex items-baseline">
              <Skeleton className="h-8 w-20 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
              <Skeleton className="h-4 w-32 rounded-lg ml-2 bg-[#ffffff20] backdrop-blur-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

