import { api } from "@/trpc/server";
import { StakingCard } from "./components/StakingCard";
import { getTranslations } from "next-intl/server";
import { bignumber } from "@/utils/bignumber";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FinanceCarousel } from "./components/FinanceCarousel";
import { CarouselIndicators } from "./components/CarouselIndicators";

export default async function UniversePage() {
  const t = await getTranslations("finance");
  const { data } = await api.finance.getFinanceInfo();
  const { data: userInfo } = await api.user.getUserInfo();
  const user = userInfo;
  
  if (!user) {
    redirect("/login");
  }
  if (!user.jc_openid) {
    redirect("/login");
  }

  // Group products by type and lockdays
  const burnProduct = data?.rows?.find(product => product.type === "BURN");
  const day7Product = data?.rows?.find(product => product.type === "STAKE" && product.lock_days === 7);
  const day30Product = data?.rows?.find(product => product.type === "STAKE" && product.lock_days === 30);
  const day15Product = data?.rows?.find(product => product.type === "STAKE" && product.lock_days === 15);

  return (
    <>
      <div className="flex items-center text-[#02E2E2] justify-end cursor-pointer mb-4">
        <Link href="/records" className="flex items-center">
          <span className="text-sm mr-1">
            {t("stake_form.record")}
          </span>
        </Link>
      </div>
      
      <div
          className="rounded-[10px] overflow-hidden h-[230px] w-full pt-[2px]"
          style={{
            boxShadow:
              "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          <FinanceCarousel pageType="home" />
        </div>
        
        {/* 客户端组件处理轮播图indicators */}
        <CarouselIndicators pageType="home" />
        
      {/* Bento grid layout */}
      <div className="grid grid-cols-12 gap-4 mt-6">
        {/* First row */}
        <div className="col-span-8">
          {burnProduct && (
            <StakingCard
              key={burnProduct.id}
              product_id={burnProduct.id!}
              row={burnProduct}
              label={burnProduct.name || ""}
              participants={burnProduct.participant_count || 0}
              percentage={bignumber(burnProduct.year_rate || 0)
                .times(100)
                .toNumber()}
              description={t("over_year_rate", {
                max: bignumber(burnProduct.max_ratio || 0).toFixed(0),
              })}
            />
          )}
        </div>
        <div className="col-span-4">
          {day7Product && (
            <StakingCard
              key={day7Product.id}
              product_id={day7Product.id!}
              row={day7Product}
              label={day7Product.name || ""}
              participants={day7Product.participant_count || 0}
              percentage={bignumber(day7Product.year_rate || 0)
                .times(100)
                .toNumber()}
              description={t("year_rate")}
            />
          )}
        </div>
        {/* Second row */}
        <div className="col-span-6">
          {day30Product && (
            <StakingCard
              key={day30Product.id}
              product_id={day30Product.id!}
              row={day30Product}
              label={day30Product.name || ""}
              participants={day30Product.participant_count || 0}
              percentage={bignumber(day30Product.year_rate || 0)
                .times(100)
                .toNumber()}
              description={t("year_rate")}
            />
          )}
        </div>
        <div className="col-span-6">
          {day15Product && (
            <StakingCard
              key={day15Product.id}
              product_id={day15Product.id!}
              row={day15Product}
              label={day15Product.name || ""}
              participants={day15Product.participant_count || 0}
              percentage={bignumber(day15Product.year_rate || 0)
                .times(100)
                .toNumber()}
              description={t("year_rate")}
            />
          )}
        </div>
      </div>
    </>
  );
}
