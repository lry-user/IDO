"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/common/EmptyState";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";

export function EarningsList({ type }: { type: "STAKE" | "BURN" }) {
  const t = useTranslations("finance");
  const parentRef = useRef<HTMLDivElement>(null);

  const { data: earnings, error, isPending } = api.finance.getPersonalEarningsRecords.useQuery(
    {
      earning_type: type === "STAKE" ? "stake" : "burn",
      limit: 1000,
      page: 1,
    },
    {
      select: (data) => data.data,
    }
  );

  if (error) {
    console.log(error.message);
    toast.error(error.message);
  }

  const earningsList = earnings?.rows || [];
  
  const virtualizer = useVirtualizer({
    count: earningsList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Increased height to accommodate two rows
    overscan: 5,
  });

  const EarningItem = ({
    earning,
  }: {
    earning: {
      amount?: number;
      date?: Date;
      earning_type?: string;
      order_count?: number;
      status?: string;
      claimed_date?: Date;
    };
  }) => {
    // Format the date to show only date and time
    const formatDateTime = (dateString: string | Date | undefined) => {
      if (!dateString) return { date: "unknown", time: "" };
      
      const date = new Date(dateString);
      return {
        date: date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\//g, '/'),
        time: date.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      };
    };

    const { date, time } = formatDateTime(earning?.date);
    const claimedDateTime = earning?.claimed_date ? formatDateTime(earning.claimed_date) : null;

    // Get the earning type text
    const getEarningTypeText = () => {
      switch (earning?.earning_type) {
        case "stake":
          return t("personal.stake_reward");
        case "burn":
          return t("personal.burn_reward");
        default:
          return type === "STAKE" ? t("personal.stake_reward") : t("personal.burn_reward");
      }
    };

    return (
      <div className="bg-[#ffffff20] backdrop-blur-md rounded-xl p-4">
        {/* First row: Main info */}
        <div className="grid grid-cols-[2fr_2fr_3fr] items-center mb-2">
          <div className="text-gray-400">
            <div className="text-xs">{t("earn_date")}</div>
            <div className="text-sm">{date}</div>
            <div className="text-xs text-gray-500">{time}</div>
          </div>
          <div className="text-center flex-1 px-2">
            <div className="text-white text-sm">
              {getEarningTypeText()}
            </div>
          </div>
          <div className="text-[#02E2E2] text-right">
            <div className="text-lg font-medium">{formatNumber(earning?.amount || 0)} HI</div>
          </div>
        </div>
        
        {/* Second row: Claimed date */}
        <div className="border-t border-[#ffffff10] pt-2">
          <div className="flex justify-between items-center text-xs">
            <div className="text-gray-500">
              {t("claimed_time")}:
            </div>
            <div className="text-gray-400">
              {claimedDateTime ? (
                <span>
                  {claimedDateTime.date} {claimedDateTime.time}
                </span>
              ) : (
                <span className="text-gray-500">{t("not_claimed")}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-[calc(100vh-280px)]">
          <Spinner />
        </div>
      ) : !earningsList.length ? (
        <EmptyState text={t("no_records")} className="h-[calc(100vh-280px)]" />
      ) : (
        <div
          ref={parentRef}
          className="h-[calc(100vh-280px)] overflow-auto mt-4"
        >
          <div className="text-gray-400 text-sm mb-4 px-2">
            <div className="text-center">{t("title.personal_earnings_records")}</div>
          </div>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                  paddingBottom: "16px",
                }}
              >
                <EarningItem earning={earningsList[virtualItem.index]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 