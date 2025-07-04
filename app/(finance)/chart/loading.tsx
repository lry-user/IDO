"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function ChartLoading() {
  return (
    <div className="p-4">
      <div className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border rounded-2xl p-4">
        <div className="flex flex-col items-center mb-6">
          <Skeleton className="h-8 w-28 rounded-lg mb-2 bg-[#ffffff20] backdrop-blur-md" />
          <Skeleton className="h-4 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
        </div>
        
        {/* Chart Skeleton */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="h-full w-full rounded-full bg-[#ffffff20] backdrop-blur-md" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 backdrop-blur-lg bg-[#ffffff10] rounded-full flex items-center justify-center">
                <Skeleton className="h-4 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Income Items Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center backdrop-blur-md bg-[#ffffff15] p-3 rounded-xl">
              <Skeleton className="h-4 w-20 rounded-lg mb-2 bg-[#ffffff20] backdrop-blur-md" />
              <Skeleton className="h-6 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 