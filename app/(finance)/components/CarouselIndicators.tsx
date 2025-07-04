"use client";

import { useState, useEffect } from "react";
import { api as trpc } from "@/trpc/react";
import { type CarouselApi } from "@/components/ui/carousel";
import { carouselEvents } from "./FinanceCarousel";

export function CarouselIndicators({ pageType = "" }: { pageType?: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { data: carousel } = trpc.common.getCarousel.useQuery();

  // 应用与FinanceCarousel相同的筛选逻辑
  const carouselItems = carousel?.data?.length 
    ? carousel.data.filter(item => {
        if (!pageType) return true; // 如果pageType为空，返回所有数据
        return item.title?.startsWith(pageType);
      })
    : [];

  useEffect(() => {
    // 订阅轮播图事件
    const unsubscribe = carouselEvents.subscribe((index, api) => {
      setSelectedIndex(index);
      setCarouselApi(api);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {/* Slide indicators - 显示在轮播图容器外部 */}
      {carouselItems.length > 0 && (
        <div className="flex justify-center gap-2 mt-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-[6px] h-[6px] rounded-full border border-white ${
                index === selectedIndex ? "bg-[#00F6F6]" : "bg-transparent"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
} 