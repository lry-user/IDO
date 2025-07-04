"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api as trpc } from "@/trpc/react";
import { useTranslations } from "next-intl";

// 全局事件系统
const carouselEvents = {
  listeners: new Set<(index: number, api: CarouselApi) => void>(),
  emit(index: number, api: CarouselApi) {
    this.listeners.forEach(listener => listener(index, api));
  },
  subscribe(listener: (index: number, api: CarouselApi) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

export function FinanceCarousel({ 
  onIndexChange,
  onApiChange,
  pageType = ""
}: { 
  onIndexChange?: (index: number) => void;
  onApiChange?: (api: CarouselApi) => void;
  pageType?: string;
}) {
  // const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: true })
  );
  const { data: userInfo } = useSession();
  const t = useTranslations("dashboard");

  const imageLoader = useCallback(
    ({ src }: { src: string; width: number }) => {
      return `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/assets/${src}?access_token=${userInfo?.accessToken}`;
    },
    [userInfo?.accessToken]
  );

  // 固定的轮播图数据
  // const carouselItems = [
  //   { link: "/images/banner1.png", title: "Banner 1", jumpTo: "/ido" },
  //   { link: "/images/banner2.png", title: "Banner 2", jumpTo: "" },
  //   { link: "/images/banner3.png", title: "Banner 3", jumpTo: "" },
  // ];
  const { data: carousel } = trpc.common.getCarousel.useQuery();

  // 筛选banner数据，只保留title开头与pageType相匹配的
  const carouselItems = carousel?.data?.length 
    ? carousel.data.filter(item => {
        if (!pageType) return true; // 如果pageType为空，返回所有数据
        return item.title?.startsWith(pageType);
      })
    : [];

  // 处理banner点击
  const handleBannerClick = (item: CarouselResponse[0]) => {
    // 打印图片信息
    // console.log("Banner clicked - Image info:", {
    //   title: item.title,
    //   img: item.img,
    //   link: item.link,
    //   jumpTo: item.jumpTo,
    //   fullItem: item
    // });
    if (item.title === "home-banner2" || item.title === 'game-banner1') {
      toast.info(t("ido.coming_soon"));
    } else if (item.title === "game-banner2") {
      toast.info(t("ido.coming_hi_soon"));
    }
    // if (jumpTo) {
    //   router.push(jumpTo);
    // }
    // console.log(t("ido.coming_soon"))
    // 显示国际化提示
    
  };

  useEffect(() => {
    if (!api) return;
    const onSelect = (currentApi: CarouselApi) => {
      if (!currentApi) return;
      const newIndex = currentApi.selectedScrollSnap();
      // setSelectedIndex(newIndex);
      onIndexChange?.(newIndex);
      // 发送全局事件
      carouselEvents.emit(newIndex, currentApi);
    };
    api.on("select", onSelect);
    api.on("reInit", (reinitApi) => {
      onSelect(reinitApi);
      const autoplay = autoplayPlugin.current;
      if (autoplay && autoplay.options.playOnInit) {
        autoplay.play();
      }
    });
    onSelect(api);
    return () => {
      api?.off("select", onSelect);
      api?.off("reInit", () => {});
    };
  }, [api, onIndexChange]);

  // useEffect(() => {
  //   setSelectedIndex(0);
  // }, []);

  // 当api变化时，通知父组件
  useEffect(() => {
    if (api) {
      onApiChange?.(api);
    }
  }, [api, onApiChange]);

  return (
    <div className="relative w-full mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="w-full"
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent className="flex">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="w-full">
              <div 
                className="w-full h-[230px] overflow-hidden relative cursor-pointer rounded-[10px]"
                style={{ 
                  borderRadius: pageType==='game' ? '0px' : '10px',
                  height: pageType==='game' ? "19.5rem" : ""
                }}
                onClick={() => handleBannerClick(item)}
              >
                <Image
                  loader={imageLoader}
                  src={item.img || ""}
                  alt={item.title || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* 只在showIndicators为true时显示内部indicators */}
      {/* {showIndicators && carouselItems.length > 0 && (
        <div className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex justify-center gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-[6px] h-[6px] rounded-full border border-white ${
                  index === selectedIndex ? "bg-[#00F6F6]" : "bg-transparent"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

// 导出事件系统供其他组件使用
export { carouselEvents };