"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import MyPageHeader from "@/components/common/MyPageHeader";
import EmptyState from "@/components/common/EmptyState";
import Image from "next/image";
import { bignumber } from "@/utils/bignumber";
import { api } from "@/trpc/react";
import { z } from "zod";
import { useState } from "react";

export default function RechargePage() {
  const t = useTranslations("wallet");
  const [amount, setAmount] = useState("");
  const [minWithdrawalAmount] = useState(0);
  const [maxWithdrawalAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  
  const withdrawSchema = z.object({
    amount: z
      .string()
      .refine((val) => !isNaN(Number(val)), "Amount must be a number")
      .refine(
        (val) => bignumber(val).isGreaterThanOrEqualTo(minWithdrawalAmount),
        `Minimum withdrawal amount is ${minWithdrawalAmount}"USDT"`
      )
      .refine(
        (val) => bignumber(val).isLessThanOrEqualTo(maxWithdrawalAmount),
        `Maximum withdrawal amount is ${maxWithdrawalAmount}"USDT"`
      )
      .refine(
        (val) =>
          selectedCoin &&
          bignumber(val).isLessThanOrEqualTo(selectedCoin),
        `Insufficient balance`
      ),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // 获取钱包信息
  const walletInfoQuery = api.wallet.getWalletInfo.useQuery();
  
  // 获取应用配置
  const configQuery = api.common.getAppConfig.useQuery();

  // 检查是否有错误
  if (configQuery.error || (configQuery.data && !configQuery.data.success && configQuery.data.code !== 200)) {
    return <div className="min-h-screen text-white font-sans flex flex-col p-4 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
      />
      
      <div className="relative z-10">
        <MyPageHeader title={t("recharge")} backUrl="/wallet" titlePosition="left" />
        <main className="flex-1">
          <EmptyState text={t("recharge_error_text")} />
        </main>
      </div>
    </div>
  }

  // 显示加载状态
  if (walletInfoQuery.isLoading || configQuery.isLoading) {
    return <div className="min-h-screen text-white font-sans flex flex-col p-4 relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
      />
      
      <div className="relative z-10">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-white">加载中...</div>
        </main>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen text-white font-sans flex flex-col p-4 relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
      />
      {/* <div 
        className="absolute inset-0 z-1"
      /> */}
      
      <div className="relative z-10">
        <main className="flex-1">
          <div className="mt-6 flex items-center flex-col">
            <div className="text-[1rem]">正在向Hi IDO转账</div>
            <Image src="/images/HIlogo.png" alt="HIlogo" width={150} height={150} />
            <div className="text-[2rem] mb-2">Hi</div>
          </div>
          <div className="space-y-2 mt-6">
            <label className="text-sm text-[#FEFEFE]">转入数量</label>
            <div className="relative">
              <Input
                type="text"
                value={amount}
                onChange={(e) => {
                  if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value)) {
                    setAmount(e.target.value);
                  }
                }}
                className="h-14 rounded-xl bg-[#18171C] border-[#707070] text-white pr-16 placeholder:text-white/50"
                placeholder="请输入充值金额"
              />
            </div>
            {selectedCoin && (
              <div className="text-sm text-gray-300">
                {t("available_balance")}:{" "}
                {bignumber(selectedCoin).toFixed(2)}{" "}
                {selectedCoin}
              </div>
            )}
          </div>
          <div
            className={
                "w-full buy-btn py-3 px-10 rounded-3xl bg-[#1D81CE] text-[#FFFFFF] text-xs font-bold text-center mt-[2rem]"
              }
            >
              转入
            </div>
        </main>
      </div>
    </div>
  );
} 
