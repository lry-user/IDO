"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/common/EmptyState";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import { formatToUserTimezone } from "@/utils/time";

export default function DirectProfitRecordsList() {
  const t = useTranslations("finance");
  const parentRef = useRef<HTMLDivElement>(null);

  const { data: records, error, isPending } = api.finance.getPersonalBurnRecords.useQuery(
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
    estimateSize: () => 88,
    overscan: 5,
  });

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spinner />
        </div>
      ) : !recordsList.length ? (
        <EmptyState text={t("no_records")} className="h-[300px]" />
      ) : (
        <div className="overflow-hidden rounded-xl bg-[#1E1E1E] border border-[#303030]">
          <div className="grid grid-cols-4 text-gray-400 text-sm p-4 border-b border-[#303030]">
            <div>{t("time")}</div>
            <div>{t("user_id")}</div>
            <div className="text-center">{t("hi_burn_amount")}</div>
            <div className="text-right">{t("earnings")} (5%)</div>
          </div>
          <div
            ref={parentRef}
            className="h-[calc(100vh-300px)] overflow-auto"
          >
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
    date_created?: Date;
    earning_date?: Date;
    earning_type?: string;
    reward_rate?: number;
    source_user?: {
      email?: string;
      id?: string;
    };
    status?: string;
  };
}

function RecordItem({ record }: RecordItemProps) {
  return (
    <div className="grid grid-cols-4 px-4 py-5 border-b border-[#303030] text-sm items-center">
      <div className="text-gray-400">
        {record.date_created ? formatToUserTimezone(record.date_created.toString()) : "-"}
      </div>
      <div className="text-white truncate">
        {record.source_user?.email || "-"}
      </div>
      <div className="text-center text-white">
        {formatNumber(record.base_amount || 0)}
      </div>
      <div className="text-right text-[#02E2E2]">
        {formatNumber(record.amount || 0)}
      </div>
    </div>
  );
} 