import { getTranslations } from "next-intl/server";
import { formatNumber } from "@/utils/formatNumber";
import { RecordButton } from "../components/RecordButton";
import { ClaimButton } from "../components/ClaimButton";
import { bignumber } from "@/utils/bignumber";
import { api } from "@/trpc/server";
import { TeamQuotaDisplay } from "../components/TeamQuotaDisplay";
import { TeamIncomeCard } from "../components/TeamIncomeCard";
import Link from "next/link";
import Image from "next/image";

export default async function TeamPage() {
  const t = await getTranslations("finance");

  const teamStats = await api.finance.getTeamEarnings();
  console.log(teamStats);

  const appConfig = await api.common.getAppConfig();
  const fee = bignumber(appConfig?.data?.reward_claim_fee_rate || 0.1)
    .times(100)
    .toString();

  if (!teamStats.success) {
    throw new Error(teamStats.message);
  }

  const data = teamStats.data;
  // 总得已领取(个人+团队+直推)
  const claimed_amount = bignumber(data?.claimed_amount || 0);
  // 配额
  const limitAmount = bignumber(data.expected_total || 0).toFixed(2);
  // 个人总产出(个人+团队+直推)
  const totalAmount = bignumber(data.own_claimed_amount || 0).toFixed(2);
  const level = data.team?.level || 0;

  console.log(claimed_amount, limitAmount, totalAmount);
  console.log(data.direct?.pending_amount);

  return (
    <div className="space-y-4">
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
      {/* Main stats card with level and quota */}
      <TeamQuotaDisplay
        limitAmount={limitAmount}
        totalAmount={totalAmount}
        level={level}
      />
      {/* Direct Burn Income Card */}
      <TeamIncomeCard
        title={t("direct_burn_income")}
        titleBgColor="bg-purple-600"
        amount={data.direct?.claimed_amount || "0"}
        description={t("direct_burn_income_desc")}
        items={[
          {
            label: t("direct_referrals"),
            value: `${data.direct?.count || 0} ${t("people")}`,
            linkText: t("view"),
            linkUrl: "/team/members",
          },
          {
            label: t("pending_direct_income"),
            value: `${formatNumber(data.direct?.pending_amount || "0")}HI`,
            action: (
              <ClaimButton
                type="direct"
                disabled={
                  bignumber(data.direct?.pending_amount || "0").lte(0) ||
                  bignumber(data.direct?.pending_amount || "0").gt(
                    bignumber(limitAmount).minus(claimed_amount)
                  )
                }
              />
            ),
          },
        ]}
        footerText={t("real_time_income_no_fee", { fee: fee })}
        recordButton={<RecordButton url="/team/direct-records" />}
      />
      {/* Team's Burn Income Card */}
      <TeamIncomeCard
        title={t("team_burn_income")}
        titleBgColor="bg-orange-600"
        amount={data.team?.claimed_amount || "0"}
        items={[
          {
            label: t("team_members"),
            value: `${data.team?.count || 0} ${t("people")}`,
            linkText: t("view"),
            linkUrl: "/team/members",
          },
          {
            label: t("pending_team_income"),
            value: `${formatNumber(data.team?.pending_amount || "0")}HI`,
            action: (
              <ClaimButton
                type="team"
                disabled={
                  bignumber(data.team?.pending_amount || "0").lte(0) ||
                  bignumber(data.team?.pending_amount || "0").gt(
                    bignumber(limitAmount).minus(claimed_amount)
                  )
                }
              />
            ),
          },
        ]}
        footerText={t("daily_income_with_fee", { fee: fee })}
        recordButton={<RecordButton url="/team/team-records" />}
      />
    </div>
  );
}
