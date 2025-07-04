"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api as trpc } from "@/trpc/react";
import { useSession } from "next-auth/react";


export function FinanceCarouselry() {
  const { data: userInfo } = useSession();

  const router = useRouter();

  const imageLoader = useCallback(
    ({ src }: { src: string; width: number }) => {
      return `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/assets/${src}?access_token=${userInfo?.accessToken}`;
    },
    [userInfo?.accessToken]
  );
  
  const { data: carousel } = trpc.common.getCarousel.useQuery();
  
  // 使用useMemo包装carouselItems数组，避免每次渲染都重新创建
  const carouselItems = useMemo(() => {
    return carousel?.data?.length ? carousel.data : [];
  }, [carousel?.data]);
  
  console.log(carouselItems)
  
  // 添加状态来跟踪当前轮播顺序
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastLogTimeRef = useRef(0);

  // 触摸滑动相关状态
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 最小滑动距离
  const minSwipeDistance = 50;

  // 切换到上一张
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? carouselItems.length - 1 : newIndex;
    });
  };

  // 切换到下一张
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= carouselItems.length ? 0 : newIndex;
    });
  };

  // 处理banner点击
  const handleBannerClick = (link: string | undefined) => {
    if (link) {
      router.push(link);
    }
  };

  // 触摸开始
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  // 触摸移动
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 触摸结束
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setIsDragging(false);
  };

  // 每3秒自动轮播
  useEffect(() => {
    if (carouselItems.length < 3) return;

    // 清理之前的定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    console.log('创建定时器，carouselItems.length:', carouselItems.length);

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // 改为递增逻辑：0,1,2,0,1,2...
        const newIndex = prevIndex + 1;
        return newIndex >= carouselItems.length ? 0 : newIndex;
      });
    }, 5000);

    return () => {
      if (timerRef.current) {
        console.log('清理定时器');
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [carouselItems]);

  // 静态顺序：中间第1张，左边第3张，右边第2张
  if (carouselItems.length < 3) return null;
  const now = Date.now();
  if (now - lastLogTimeRef.current > 1000) { // 限制1秒内只打印一次
    console.log(currentIndex, 'currentIndex', new Date().toLocaleTimeString());
    lastLogTimeRef.current = now;
  }
  // 根据currentIndex计算left, center, right的位置
  const center = carouselItems[currentIndex];
  const left = carouselItems[(currentIndex - 1 + carouselItems.length) % carouselItems.length];
  const right = carouselItems[(currentIndex + 1) % carouselItems.length];

  return (
    <div className="relative w-full">
      {/* 轮播图容器 */}
      <div 
        className="relative w-full flex justify-center items-center h-[180px] mb-4 select-none overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      >
        {/* 左边第3张 */}
        <div
          className="absolute left-[calc(50%+3rem)] top-1/2 -translate-x-[140%] -translate-y-1/2 rounded-[23px] bg-[#181818] border-2 border-white opacity-70 shadow-md z-10 cursor-pointer"
          style={{ width: 171, height: 105 }}
        >
          <Image
            loader={imageLoader}
            src={left.img || ""}
            alt={left.title || ""}
            width={171}
            height={105}
            className="object-cover rounded-[23px]"
          />
        </div>
        {/* 右边第2张 */}
        <div
          className="absolute right-[calc(50%-8rem)] top-1/2 translate-x-[40%] -translate-y-1/2 rounded-[23px] bg-[#181818] border-2 border-white opacity-70 shadow-md z-10 cursor-pointer"
          style={{ width: 171, height: 105 }}
        >
          <Image
            loader={imageLoader}
            src={right.img || ""}
            alt={right.title || ""}
            width={171}
            height={105}
            className="object-cover rounded-[23px]"
          />
        </div>
        {/* 中间第1张 */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[23px] bg-[#181818] border-4 border-white shadow-2xl z-20 cursor-pointer hover:scale-105 transition-transform duration-200"
          style={{ width: 240, height: 146 }}
          onClick={() => handleBannerClick(center.link)}
        >
          <Image
            loader={imageLoader}
            src={center.img || ""}
            alt={center.title || ""}
            width={240}
            height={143}
            className="object-cover rounded-[23px]"
          />
        </div>
      </div>
    </div>
  );
}
