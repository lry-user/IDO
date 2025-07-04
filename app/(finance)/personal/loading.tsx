"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function PersonalLoading() {
  return (
    <div className="space-y-4">
      {/* 销毁预期总收益 Skeleton */}
      <div className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="h-6 w-24 bg-blue-600 rounded-full flex items-center justify-center backdrop-blur-md">
              <div className="h-4 w-20 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
        </div>
        
        <div className="mb-4">
          <Skeleton className="h-8 w-28 rounded-lg mb-2 bg-[#ffffff20] backdrop-blur-md" />
        </div>
        
        <div className="space-y-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
                {i === 3 && <Skeleton className="h-6 w-12 rounded-lg ml-2 bg-[#ffffff20] backdrop-blur-md" />}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Skeleton className="h-5 w-48 rounded-lg bg-[#ffffff15] backdrop-blur-md" />
        </div>
      </div>

      {/* 质押预期总收益 Skeleton */}
      <div className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="h-6 w-24 bg-purple-600 rounded-full flex items-center justify-center backdrop-blur-md">
              <div className="h-4 w-20 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
        </div>
        
        <div className="mb-4">
          <Skeleton className="h-8 w-28 rounded-lg mb-2 bg-[#ffffff20] backdrop-blur-md" />
        </div>
        
        <div className="space-y-3 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
                {i === 4 && <Skeleton className="h-6 w-12 rounded-lg ml-2 bg-[#ffffff20] backdrop-blur-md" />}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Skeleton className="h-5 w-48 rounded-lg bg-[#ffffff15] backdrop-blur-md" />
        </div>
      </div>
    </div>
  );
} 