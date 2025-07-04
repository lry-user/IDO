"use client";

import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { bignumber } from "@/utils/bignumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StakingCardProps {
  product_id: number;
  label: string;
  participants: number;
  percentage: number;
  description: string;
  row?: FinanceProductResponse["rows"][number];
}

export function StakingCard({
  product_id,
  label,
  // participants,
  percentage,
  description,
  row,
}: StakingCardProps) {
  const t = useTranslations("finance");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const router = useRouter();
  const { data: walletInfo, refetch } = api.wallet.getWalletInfo.useQuery(
    undefined,
    {
      select: (data) => data.data,
    }
  );
  const createOrderMutation = api.finance.createOrder.useMutation({
    onSuccess: () => {
      toast.success(t("stake_form.success"));
      setOpen(false);
      setAmount("");
      router.refresh();
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || t("stake_form.error"));
    },
  });

  const handleSubmit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error(t("stake_form.invalid_amount"));
      return;
    }
    // 小于最小质押金额
    if (bignumber(amount).lt(bignumber(row?.min_amount || 0))) {
      toast.error(
        t("stake_form.min_amount", {
          min: bignumber(row?.min_amount || 0).toFixed(2),
        })
      );
      return;
    }

    createOrderMutation.mutate({
      amount: bignumber(amount).toNumber(),
      product_id: product_id,
    });
  };

  const balance = useMemo(() => {
    return (
      walletInfo?.assetList.find(
        (asset) => asset.coinKey === "HI_BEP20_BINANCE_SMART_CHAIN_MAINNET"
      )?.available_balance || 0
    );
  }, [walletInfo]);

  const isStaking = useMemo(() => {
    return row?.type === "STAKE";
  }, [row]);

  const isBurn = useMemo(() => {
    return row?.type === "BURN";
  }, [row]);

  const dialogTitle = useMemo(() => {
    return isStaking ? t("stake") : t("burn");
  }, [isStaking, t]);

  const insufficientBalance = useMemo(() => {
    return bignumber(amount).gt(balance);
  }, [amount, balance]);

  // Get number display for cards
  const getNumberDisplay = () => {
    if (isBurn) return null;

    const days = row?.lock_days || 0;
    if (days === 7) {
      return (
        <Image
          src="/images/7.png"
          alt="30"
          width={148}
          height={198}
          className="absolute bottom-[0] right-[0]"
        />
        // <div className="absolute bottom-[-32px] right-[-10px] text-[180px] font-bold text-[#00F6F6] opacity-50 leading-none pointer-events-none select-none z-0" style={{ transform: 'rotate(5deg)',fontWeight: 700 }}>
        //   7
        // </div>
      );
    }
    if (days === 30) {
      return (
        // <div className="absolute bottom-[-26px] right-[-13px] text-[180px] font-bold text-[#00F6F6] opacity-50 leading-none pointer-events-none select-none z-0" style={{ transform: 'rotate(5deg)', fontFamily: 'Oleo Script Swash Caps, cursive', fontWeight: 700 }}>
        //   30
        // </div>
        // <Image
        //   src="/images/30.png"
        //   alt="30"
        //   width={147}
        //   height={182}
        //   className="absolute bottom-[-26px] right-[-13px]"
        // />
        <Image
          src="/images/30.png"
          alt="30"
          width={168}
          height={218}
          className="absolute bottom-[0] right-[0]"
        />
      );
    }
    if (days === 15) {
      return (
        // <div className="absolute bottom-[-26px] right-[-13px] text-[180px] font-bold text-[#00F6F6] opacity-50 leading-none pointer-events-none select-none z-0" style={{ transform: 'rotate(5deg)', fontFamily: 'Oleo Script Swash Caps, cursive', fontWeight: 700 }}>
        //   15
        // </div>
        <Image
          src="/images/15.png"
          alt="30"
          width={142}
          height={85}
          className="absolute bottom-[0] right-[0]"
        />
      );
    }

    return null;
  };

  return (
    <>
      {isBurn ? (
        <div
          className="relative rounded-[18px] p-4 cursor-pointer overflow-hidden h-[256px] w-full flex flex-col bg-[#ffffff1a] border border-[rgba(255,255,255,0.15)]"
          onClick={() => setOpen(true)}
          style={{
            boxShadow:
              "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="absolute right-[-10px] bottom-[-10px] z-0">
            <Image
              src="/images/burn.png"
              alt="Burn"
              width={183}
              height={183}
            />
          </div>

          {/* <div
            className="w-[100px] border border-transparent rounded-md p-1"
            style={{
              borderImageSource:
                "linear-gradient(100deg, #00F6F6 12.97%, rgba(0,0,0,0) 66.72%)",
              borderImageSlice: 1,
            }}
          > */}
            <div
              className="w-[92px] inline-block p-[1px] rounded-[6px] text-center"
              style={{
                background: 'conic-gradient(from 193.98deg at 68.48% -29.73%, rgba(0, 0, 0, 0) -119.79deg, #00F6F6 46.7deg, rgba(0, 0, 0, 0) 240.21deg, #00F6F6 406.7deg)'
              }}
            >
              <span className="h-[33px] leading-[31px] block rounded-[6px] px-2 py-0.5 text-white text-sm bg-[#23232A] font-bold text-base">
                {label}
              </span>
            </div>
          {/* </div> */}

          <div className="mt-2 z-10 relative">
            <div className="text-white text-[40px] font-bold">
              {percentage}%
            </div>
            <div className="w-[100px] text-white text-sm mt-0 break-words whitespace-normal">{description}</div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative rounded-[18px] p-4 cursor-pointer overflow-hidden h-[256px] w-full bg-[#ffffff1a] border border-[rgba(255,255,255,0.15)]",
            row?.lock_days === 7 ? "flex flex-col" : "flex flex-col justify-between flex-row-reverse"
          )}
          onClick={() => setOpen(true)}
          style={{
            boxShadow:
              "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 0.5px 0px 0px rgba(0, 244, 244, 0.7)",
            backdropFilter: "blur(10px)",
            height: row?.lock_days === 30 || row?.lock_days === 15 ? "236px" : ''
          }}
        >
          <div className={cn("absolute inset-0 -z-10 opacity-60")} />

          <div
            className={cn(
              "z-10",
              row?.lock_days === 7 ? "" : "absolute top-4 left-4"
            )}
          >
            <div className="text-white text-base">
              质<br />押
            </div>
          </div>

          <div
            className={cn(
              "z-10",
              row?.lock_days === 7 ? "" : ""
            )}
          >
            <div className="text-white text-2xl font-bold">{percentage}%</div>
            <div className="text-white text-sm mb-1">{t("year_rate")}</div> 
          </div>

          {getNumberDisplay()}
        </div>
      )}

      <Drawer.Root
        open={open}
        onOpenChange={setOpen}
        onClose={() => {
          setAmount("");
        }}
      >
        <Drawer.Portal>
          <Drawer.Title />
          <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Drawer.Content
            aria-describedby=""
            className="h-fit z-50 fixed bottom-0 left-0 right-0 outline-none max-w-lg mx-auto backdrop-blur-lg text-white border-t border-[#ffffff30] rounded-[35px]"
            style={{
              boxShadow:
                "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="w-12 h-1.5 bg-gray-400/40 rounded-full mx-auto my-3" />
            <div className="px-6 pb-8">
              <div className="text-center text-xl font-medium mb-6">
                {dialogTitle} {label}
              </div>

              <div className="mb-6">
                <div className="text-gray-200 mb-2 text-sm">
                  {isStaking ? t("stake") : t("burn")}：{percentage}%
                  {description}
                </div>

                <div className="relative mt-3">
                  <Input
                    placeholder={
                      isStaking
                        ? t("stake_form.input_stake")
                        : t("stake_form.input_burn")
                    }
                    className="bg-[#ffffff15] pr-16 h-12 rounded-xl text-[rgba(255,255,255,0.5)] shadow-[inset_0_0_13.2px_0_rgba(255,255,255,0.25)] 
                    shadow-[inset_0_0_0.5px_0_#00F6F6] 
                    shadow-[inset_0_0_1.1px_0_#00F6F6]"
                    value={amount}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        return;
                      }
                      setAmount(e.target.value);
                    }}
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-0 bg-transparent top-0 text-[#00F6F6] h-12"
                    onClick={() => setAmount(bignumber(balance).toFixed(2))}
                  >
                    {t("stake_form.max_button")}
                  </Button>
                </div>

                <div className="mt-6 text-sm text-gray-200 bg-[#D9D9D966] backdrop-blur-md p-4 rounded-xl text-white">
                  <div className="flex justify-between">
                    <span>{t("stake_form.daily_output")}</span>
                    <span>
                      {bignumber(row?.year_rate || 0)
                        .div(365)
                        .times(amount || 0)
                        .toFixed(2)}
                      HI
                    </span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span>{t("stake_form.total_output")}</span>
                    {isStaking ? (
                      <span>
                        {bignumber(amount || 0).toFixed(0)}HI+
                        {bignumber(row?.year_rate || 0)
                          .div(365)
                          .times(amount || 0)
                          .times(row?.lock_days || 0)
                          .toFixed(2)}
                        HI
                      </span>
                    ) : (
                      <span>
                        {bignumber(row?.max_ratio || 0)
                          .times(amount || 0)
                          .toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  className="w-[13.4rem] h-[2.5rem] bg-[#00F6F6] hover:bg-[#00F6F6]/90 text-black font-medium py-6 rounded-xl"
                  onClick={handleSubmit}
                  disabled={
                    createOrderMutation.isPending ||
                    bignumber(amount).lte(0) ||
                    !amount ||
                    insufficientBalance
                  }
                >
                  {createOrderMutation.isPending
                    ? t("stake_form.processing")
                    : t("stake_form.submit")}
                </Button>
              </div>
            </div>

            <div className="pb-8">
              {insufficientBalance && (
                <div className="text-red-500 text-sm text-center">
                  {t.rich("stake_form.insufficient_balance_tip", {
                    wallet: (chunks) => (
                      <Link
                        href={{
                          pathname: "/recharge",
                          query: {
                            redirect: "/",
                          },
                        }}
                        className="text-blue-500 underline"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </div>
              )}
              <div className="px-6 text-sm text-center">
                <div className="text-gray-200 mb-4 text-base font-bold">
                  HI: {bignumber(balance).toFixed(2)}
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
