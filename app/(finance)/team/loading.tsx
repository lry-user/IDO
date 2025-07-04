"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function TeamLoading() {
  return (
    <div className="space-y-4">
      {/* 团队总收益 Skeleton */}
      <div className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border rounded-2xl p-4">
        <div className="flex flex-col items-center">
          <Skeleton className="h-4 w-32 rounded-lg mb-2 bg-[#ffffff20] backdrop-blur-md" />
          <Skeleton className="h-8 w-28 rounded-lg mb-2 bg-[#ffffff20] backdrop-blur-md" />
          <div className="w-full bg-[#ffffff15] h-2 rounded-full mb-2">
            <Skeleton className="h-2 w-3/4 rounded-full bg-[#ffffff20] backdrop-blur-md" />
          </div>
          <Skeleton className="h-4 w-64 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
        </div>
      </div>

      {/* 直推销毁收益 Skeleton */}
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
          <Skeleton className="h-4 w-48 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
        </div>
        
        <div className="space-y-3 mb-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-16 rounded-lg bg-[#ffffff20] backdrop-blur-md" />
                <Skeleton className="h-5 w-12 rounded-lg ml-2 bg-[#ffffff20] backdrop-blur-md" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Skeleton className="h-5 w-48 rounded-lg bg-[#ffffff15] backdrop-blur-md" />
        </div>
      </div>

      {/* 战队销毁收益 Skeleton */}
      <div className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="h-6 w-24 bg-orange-600 rounded-full flex items-center justify-center backdrop-blur-md">
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
                <Skeleton className="h-5 w-12 rounded-lg ml-2 bg-[#ffffff20] backdrop-blur-md" />
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