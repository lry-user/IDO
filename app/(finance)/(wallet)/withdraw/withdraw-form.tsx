"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { bignumber } from "@/utils/bignumber";
import { api } from "@/trpc/react";
import Link from "next/link";

interface WithdrawFormProps {
  walletInfo: WalletInfoResponse;
  config: AppConfigResponse;
}

export function WithdrawForm({ walletInfo, config }: WithdrawFormProps) {
  const [selectedCoin, setSelectedCoin] = useState(
    walletInfo.assetList.length > 0 ? walletInfo.assetList[0] : null
  );

  const withdrawFeeRate = useMemo(() => {
    return selectedCoin?.coinName === "USDT"
      ? config.withdrawal_fee_rate
      : config.withdrawal_fee_rate_hi;
  }, [
    selectedCoin?.coinName,
    config.withdrawal_fee_rate,
    config.withdrawal_fee_rate_hi,
  ]);
  const minWithdrawalAmount = useMemo(() => {
    return selectedCoin?.coinName === "USDT"
      ? config.min_withdrawal_amount
      : config.min_withdrawal_amount_hi;
  }, [
    selectedCoin?.coinName,
    config.min_withdrawal_amount,
    config.min_withdrawal_amount_hi,
  ]);
  const maxWithdrawalAmount = useMemo(() => {
    return selectedCoin?.coinName === "USDT"
      ? config.max_withdrawal_amount
      : config.max_withdrawal_amount_hi;
  }, [
    selectedCoin?.coinName,
    config.max_withdrawal_amount,
    config.max_withdrawal_amount_hi,
  ]);


  const withdrawSchema = z.object({
    amount: z
      .string()
      .refine((val) => !isNaN(Number(val)), "Amount must be a number")
      .refine(
        (val) => bignumber(val).isGreaterThanOrEqualTo(minWithdrawalAmount),
        `Minimum withdrawal amount is ${minWithdrawalAmount} ${
          selectedCoin?.coinSymbol || "USDT"
        }`
      )
      .refine(
        (val) => bignumber(val).isLessThanOrEqualTo(maxWithdrawalAmount),
        `Maximum withdrawal amount is ${maxWithdrawalAmount} ${
          selectedCoin?.coinSymbol || "USDT"
        }`
      )
      .refine(
        (val) =>
          selectedCoin &&
          bignumber(val).isLessThanOrEqualTo(selectedCoin.available_balance),
        `Insufficient balance`
      ),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const t = useTranslations("wallet");
  const withdrawMutation = api.wallet.withdraw.useMutation({
    onSuccess: () => {
      toast.success(t("withdraw_success"));
      router.push("/wallet");
    },
    onError: (error) => {
      toast.error(error.message || t("withdraw_failed"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCoin) {
      toast.error("Please select a coin");
      return;
    }

    try {
      withdrawSchema.parse({ amount, password: userPassword });

      withdrawMutation.mutate({
        amount: bignumber(amount).toNumber(),
        coin_key: selectedCoin.coinKey,
        password: userPassword,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
      toast.error(t("withdraw_failed"));
    }
  };

  const handleMaxAmount = () => {
    if (!selectedCoin) return;

    setAmount(
      bignumber(selectedCoin.available_balance).isGreaterThan(
        maxWithdrawalAmount
      )
        ? bignumber(maxWithdrawalAmount).toFixed(2)
        : bignumber(selectedCoin.available_balance).toFixed(2)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-[#FEFEFE]">{t("select_coin")}</label>
        <div className="h-14 rounded-2xl bg-[#ffffff1a] backdrop-blur-md shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] overflow-hidden">
          <select
            className="w-full h-full bg-transparent px-4 appearance-none focus:outline-none text-white"
            value={selectedCoin?.coinKey || ""}
            onChange={(e) => {
              const selected = walletInfo.assetList.find(
                (coin) => coin.coinKey === e.target.value
              );
              setSelectedCoin(selected || null);
              setAmount("");
            }}
          >
            {walletInfo.assetList.map((coin) => (
              <option key={coin.coinKey} value={coin.coinKey}>
                {coin.coinSymbol} -{" "}
                {bignumber(coin.available_balance).toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-[#FEFEFE]">{t("withdraw_amount")}</label>
        <div className="relative">
          <Input
            type="text"
            value={amount}
            onChange={(e) => {
              if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value)) {
                setAmount(e.target.value);
              }
            }}
            placeholder={`${minWithdrawalAmount}~${maxWithdrawalAmount} ${
              selectedCoin?.coinSymbol || "USDT"
            }`}
            className="h-14 rounded-2xl bg-[#ffffff1a] backdrop-blur-md shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] text-white pr-16 placeholder:text-white/50 border-none"
          />
          <button
            type="button"
            onClick={handleMaxAmount}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00F6F6]"
          >
            Max
          </button>
        </div>
        {selectedCoin && (
          <div className="text-sm text-gray-300">
            {t("available_balance")}:{" "}
            {bignumber(selectedCoin.available_balance).toFixed(2)}{" "}
            {selectedCoin.coinSymbol}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-[#ffffff1a] backdrop-blur-md shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#FEFEFE]">{t("min_withdraw_amount")}</span>
          <span className="text-[#00F6F6]">
            {bignumber(minWithdrawalAmount).toFixed(2)}{" "}
            {selectedCoin?.coinSymbol || "USDT"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#FEFEFE]">{t("withdrawal_fee_rate")}</span>
          <span className="text-[#00F6F6]">
            {bignumber(withdrawFeeRate || 0)
              .multipliedBy(100)
              .toFixed(2)}
            %
          </span>
        </div>
      </div>
      {walletInfo.is_payment_password_set ? (
        <div className="space-y-2">
          <label className="text-sm text-[#FEFEFE]">{t("user_password")}</label>
          <Input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder={t("user_password")}
            className="h-14 rounded-2xl bg-[#ffffff1a] backdrop-blur-md shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] text-white placeholder:text-white/50 border-none"
          />
        </div>
      ) : (
        <div className="text-sm text-[#FEFEFE]">
          {t("payment_password_not_set")}
          <Link href="/settings/payment-password" className="text-pink-500">
            {t("set_payment_password")}
          </Link>
        </div>
      )}
      <div className="py-4">
        <Button
          type="submit"
          disabled={withdrawMutation.isPending || !selectedCoin || !walletInfo.is_payment_password_set}
          className="w-full bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black font-medium py-6 rounded-xl hover:shadow-[0_0_10px_rgba(245,227,184,0.3)] transition-all duration-300"
        >
          {withdrawMutation.isPending ? t("withdrawing") : t("withdraw")}
        </Button>
      </div>
    </form>
  );
}
