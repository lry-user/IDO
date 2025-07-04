"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function IDOButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 处理IDO按钮点击事件
  const handleIDOClick = useCallback(() => {
    // 检查用户是否已登录
    if (status === "loading") {
      // 正在加载中，等待
      return;
    }
    
    if (!session) {
      // 用户未登录，跳转到登录页面
      router.push("/login");
      return;
    }
    
    // 用户已登录，跳转到IDO页面
    router.push("/");
  }, [status, session, router]);

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={handleIDOClick}
        className="bg-gradient-to-r from-[#00F6F6] to-[#02E2E2] text-black font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
      >
        <span>参与IDO</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
} 