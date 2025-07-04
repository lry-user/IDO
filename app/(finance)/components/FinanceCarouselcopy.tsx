"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { api as trpc } from "@/trpc/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export function FinanceCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, playOnInit: true })
  );

  const { data: userInfo } = useSession();

  const imageLoader = useCallback(
    ({ src }: { src: string; width: number }) => {
      return `https://server.heavenhk.com/assets/${src}?access_token=${userInfo?.accessToken}`;
    },
    [userInfo?.accessToken]
  );

  const { data: carousel } = trpc.common.getCarousel.useQuery();

  const carouselItems = carousel?.data?.length ? carousel.data : [];

  useEffect(() => {
    if (!api) return;

    const onSelect = (currentApi: CarouselApi) => {
      if (!currentApi) return;
      setSelectedIndex(currentApi.selectedScrollSnap());
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
  }, [api]);

  return (
    <div className="relative w-full mx-auto mb-4">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="w-full"
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent className="-ml-0">
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "px-0 transition-opacity duration-300 overflow-hidden",
                index === selectedIndex
                  ? "border border-white rounded-[23px]"
                  : "opacity-75 blur-sm",
                "rounded-[23px]"
              )}
            >
              <div className="w-full h-[137px] rounded-[23px] overflow-hidden relative">
                {item.img?.startsWith("/") ? (
                  <Image
                    src={item.img || "/images/figma/carousel-1.png"}
                    alt={item.title || ""}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src={item.img || ""}
                    alt={item.title || ""}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Slide indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-[6px] h-[6px] rounded-full border border-white",
              index === selectedIndex ? "bg-[#00F6F6]" : "bg-transparent"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
