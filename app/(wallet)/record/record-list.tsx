"use client";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { formatToUserTimezone } from "@/utils/time";
import EmptyState from "@/components/common/EmptyState";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import { COIN_KEY } from "@/lib/constant";
export function RecordList({ type }: { type: "withdraw" | "deposit" | "hi_reward" }) {
  const t = useTranslations("wallet");
  const parentRef = useRef<HTMLDivElement>(null);

  const REWARD_TYPE = {
    "stake_reward": t("stake_reward"),
    "burn_reward": t("burn_reward"),
    "direct_reward": t("direct_reward"),
    "team_reward": t("team_reward"),
  } as const; 

  const { data: records, error, isPending } = api.wallet.getRecord.useQuery(
    {
      type,
      limit: 1000,
      page: 1,
    },
    {
      select: (data) => {
        console.log(data.data);
        return data.data;
      },
      refetchInterval: ({ state: { data } }) => {
        const hasPendingTx = data?.data?.rows?.some(
          (record) => record.status === "pending"
        );
        return hasPendingTx ? 5000 : false;
      },
    }
  );

  if (error) {
    console.log(error.message);
    toast.error(error.message);
  }

  const virtualizer = useVirtualizer({
    count: records?.rows.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 5,
  });

  const RecordItem = ({
    record,
  }: {
    record: RecordResponse["rows"][number];
  }) => (
    <div className="backdrop-blur-lg bg-[#ffffff10] rounded-xl p-4 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <span>{COIN_KEY[record.coin_key as keyof typeof COIN_KEY]}</span>
          <span className="text-[#02E2E2]">
            {record.type === "withdraw" ? "-" : "+"}
            {formatNumber(record.amount)}
          </span>
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {formatToUserTimezone(record.date_created)}
        </div>
      </div>
      <div className="text-sm flex items-center flex-col">
        {record.status === "pending" ? (
          <span className="text-[#02E2E2]">{t("pending")}</span>
        ) : record.status === "success" ? (
          <span className="text-[#02E2E2]">{t("success")}</span>
        ) : (
          <span className="text-[#02E2E2]">{t("failed")}</span>
        )}
        {type === "hi_reward" && (
          <span className="text-gray-400 text-xs">({REWARD_TYPE[record.type as keyof typeof REWARD_TYPE]})</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-[calc(100vh-280px)]">
          <Spinner />
        </div>
      ) : !records?.rows?.length ? (
        <EmptyState text={t("no_records")} className="h-[calc(100vh-280px)]" />
      ) : (
        <div ref={parentRef} className="h-[calc(100vh-280px)] overflow-auto">
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {records?.rows &&
              virtualizer.getVirtualItems().map((virtualItem) => (
                <div
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    paddingBottom: "12px",
                  }}
                >
                  <RecordItem record={records.rows[virtualItem.index]} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
