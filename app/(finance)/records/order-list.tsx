"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/common/EmptyState";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
export function OrderList({ type }: { type: "STAKE" | "BURN" }) {
  const t = useTranslations("finance");
  const parentRef = useRef<HTMLDivElement>(null);

  const { data: orders, error ,isPending} = api.finance.getStakeBurnOrders.useQuery(
    {
      product_type: type,
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

  const virtualizer = useVirtualizer({
    count: orders?.rows?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88,
    overscan: 5,
  });

  const OrderItem = ({
    order,
  }: {
    order: StakeBurnOrderResponse["rows"][number];
  }) => {
    // Format the date to show only date and time
    const formatDateTime = (dateString: string) => {
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

    const { date, time } = formatDateTime(order.date_created);

    // Get the order type text
    const getOrderTypeText = () => {
      if (type === "STAKE") {
        return t("stake_days", { days: order.product_id?.lock_days || '' });
      } else {
        return t("burn");
      }
    };

    // Get the status text in parentheses
    const getStatusText = () => {
      if (order.status === "pending") {
        return "";
      } else if (order.status === "redeemed") {
        return `(${t("unstaked")})`;
      } else if (order.end_time) {
        const endDate = new Date(order.end_time);
        const formattedDate = endDate.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\//g, '-');
        const formattedTime = endDate.toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        return t("expired_at", { date: formattedDate, time: formattedTime });
      }
      return "";
    };

    return (
      <div className="bg-[#ffffff20] backdrop-blur-md rounded-xl p-4 flex justify-between items-center">
        <div className="text-gray-400">
          <div>{date}</div>
          <div>{time}</div>
        </div>
        <div className="text-center flex-1 px-2">
          <div className="text-gray-400 text-sm flex flex-col">
            <span>
            {getOrderTypeText()}
            </span>
            <span className="text-gray-400 text-sm ml-1">{getStatusText()}</span>
          </div>
        </div>
        <div className="text-[#02E2E2] text-right">
          {formatNumber(order.amount)} HI
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
      ) : !orders?.rows?.length ? (
        <EmptyState text={t("no_records")} className="h-[calc(100vh-280px)]" />
      ) : (
        <div
          ref={parentRef}
          className="h-[calc(100vh-280px)] overflow-auto mt-4"
        >
          <div className="grid grid-cols-3 text-gray-400 text-sm mb-2 px-4">
            <div>{t("time")}</div>
            <div className="text-center">{t("type")}</div>
            <div className="text-right">{t("amount")}</div>
          </div>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {orders?.rows &&
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
                  <OrderItem order={orders.rows[virtualItem.index]} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
