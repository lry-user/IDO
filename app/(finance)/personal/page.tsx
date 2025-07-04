import { api } from "@/trpc/server";
import { ClaimButton } from "../components/ClaimButton";
import { IncomeCard } from "../components/IncomeCard";
import { getTranslations } from "next-intl/server";
import { bignumber } from "@/utils/bignumber";
import Link from "next/link";
import Image from "next/image";

export default async function PersonalPage() {
  const t = await getTranslations("finance");
  const personalEarnings = await api.finance.getPersonalEarnings();
  const appConfig = await api.common.getAppConfig();
  const fee = bignumber(appConfig?.data?.reward_claim_fee_rate || 0.1).times(100).toString();

  const burnData = personalEarnings.data.burn;
  const stakeData = personalEarnings.data.stake;


  return (
    <div className="flex flex-col text-white">
      <div className="mb-[38px] pt-4">
        <Link href="/earn">
          <Image
            src="/icons/profile-refund-back.svg"
            alt="Back"
            width={35}
            height={35}
          />
        </Link> 
      </div>
      <div className="flex justify-end mb-4">
        <Link href="/personal/records?type=burn" className="text-[#02E2E2] text-lg">{t("stake_form.record")}</Link>
      </div>
      
      {/* Burn Earnings Card */}
      <IncomeCard
        title={t("personal.burn_total_earnings")}
        totalAmount={bignumber(burnData?.expected_total || 0).toFixed(2)}
        titleBgColor="bg-blue-600"
        imageType="gift"
        items={[
          { label: t("personal.burned"), value: bignumber(burnData?.total_amount || "0").toFixed(2) },
          { label: t("personal.claimed_burn"), value: bignumber(burnData?.claimed_amount || "0").toFixed(2) },
          {
            label: t("personal.pending_burn"),
            value: bignumber(burnData?.pending_amount || "0").toFixed(2),
            action: {
              component: (
                <ClaimButton
                  type="burn"
                  height="1.0625rem"
                  disabled={bignumber(burnData  ?.pending_amount || "0").lte(0) || bignumber(burnData?.pending_amount || "0")
                    .gt(bignumber(burnData?.expected_total || "0").minus(bignumber(burnData?.claimed_amount || "0")))}
                />
              ),
            },
          },
        ]}
        subtitle={{
          text: `Daily 15:00 output,${fee}% fee`,
        }}
      />

      {/* Stake Earnings Card */}
      <IncomeCard
        title={t("personal.stake_total_earnings")}
        totalAmount={bignumber(stakeData?.expected_total || 0).toFixed(2)}
        titleBgColor="bg-purple-600"
        imageType="coins"
        items={[
          { label: t("personal.staking"), value: bignumber(stakeData?.staking_amount || 0).toFixed(2) },
          {
            label: t("personal.stake_subtitle_2"),
          },
          { label: t("personal.claimed_stake"), value: bignumber(stakeData?.claimed_amount || 0).toFixed(2) },
          {
            label: t("personal.pending_stake"),
            value: bignumber(stakeData?.pending_amount || 0).toFixed(2),
            action: {
              component: (
                <ClaimButton
                  type="stake"
                  height="1.0625rem"
                  disabled={bignumber(stakeData?.pending_amount || "0").lte(0)}
                />
              ),
            },
          },
        ]}
        subtitle={{
          text: `Daily 15:00 output,${fee}% fee`,
        }}
      />
    </div>
  );
}
