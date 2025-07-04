"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/common/EmptyState";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function TeamProfitRecordsList() {
  const t = useTranslations("finance");
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data: records,
    error,
    isPending,
  } = api.finance.getTeamEarningsRecords.useQuery(
    {
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

  const recordsList = records?.rows || [];

  const virtualizer = useVirtualizer({
    count: recordsList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160,
    overscan: 5,
  });

  return (
    <>
      {isPending ? (
        <div className="flex flex-col gap-4 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-[#1E1E1E] border border-[#303030] rounded-xl">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-[#303030] rounded animate-pulse" />
                  <div className="h-5 w-20 bg-[#303030] rounded animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-5 w-32 bg-[#303030] rounded animate-pulse" />
                  <div className="h-5 w-16 bg-[#303030] rounded animate-pulse" />
                </div>
                <div className="mt-2 pt-2 border-t border-[#303030]">
                  <div className="h-4 w-40 bg-[#303030] rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !recordsList.length ? (
        <EmptyState text={t("no_records")} className="h-[300px]" />
      ) : (
        <div className="overflow-hidden rounded-xl bg-[#1E1E1E] border border-[#303030]">
          <div className="p-4 border-b border-[#303030] flex items-center justify-between text-sm text-gray-400">
            <div className="font-medium">{t("title.team_earnings_records")}</div>
            <div className="text-xs">{recordsList.length} {t("records")}</div>
          </div>
          <div ref={parentRef} className="h-[calc(100vh-300px)] overflow-auto p-4">
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
                    padding: "0 4px",
                  }}
                >
                  <RecordItem record={recordsList[virtualItem.index]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface RecordItemProps {
  record: {
    amount?: number;
    base_amount?: number;
    earning_date?: Date;
    earning_type?: string;
    claimed_date?: Date;
    source_user?: {
      email?: string;
      id?: string;
      level?: number;
    };
  };
}

function RecordItem({ record }: RecordItemProps) {
  const t = useTranslations("finance");
  
  const formatDateTime = (dateString: string | Date | undefined) => {
    if (!dateString) return { date: "-", time: "" };
    
    try {
      const date = new Date(dateString);
      return {
        date: date.toLocaleDateString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
        }),
        time: date.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      };
    } catch {
      return { date: "-", time: "" };
    }
  };

  const earningDateTime = formatDateTime(record.earning_date);
  const claimedDateTime = record.claimed_date ? formatDateTime(record.claimed_date) : null;

  return (
    <div className="w-full mb-3 overflow-hidden bg-[#252525] border border-[#303030] hover:border-[#404040] transition-colors rounded-xl">
      <div className="p-4">
        {/* Top section with date and amount */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <span className="text-sm">{earningDateTime.date}</span>
              <span className="text-xs text-gray-500 ml-2">{earningDateTime.time}</span>
            </div>
          </div>
          <div className="text-[#02E2E2] font-medium text-right">
            <div className="text-sm">{formatNumber(record.amount || 0)}</div>
            <div className="text-xs text-gray-400">{t("earnings")}</div>
          </div>
        </div>
        
        {/* Middle section with user info and output */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#303030] text-gray-300">
                  H{record.source_user?.level || 0}
                </span>
              </div>
              <div className="text-xs text-gray-300 mt-1 max-w-[180px] truncate">
                {record.source_user?.email || "-"}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-white">
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-sm">{formatNumber(record.base_amount || 0)}</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{t("daily_hi_output")}</div>
          </div>
        </div>
        
        {/* Bottom section with claimed time */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#303030]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t("claimed_time")}</span>
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
}
