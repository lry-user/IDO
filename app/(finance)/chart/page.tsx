import { api } from "@/trpc/server";
import { IncomeChartCard } from "../components/IncomeChartCard";
import { bignumber } from "@/utils/bignumber";
import { getTranslations } from "next-intl/server";
export default async function ChartPage() {
  const t = await getTranslations("finance");
  const { data } = await api.finance.getEarningsGraph();
  console.log(data);

  const incomeItems = [
    {
      label: t("chart.burn_reward_earned"),
      amount: bignumber(data?.burn_reward_earned || 0).toFixed(2),
    },
    {
      label: t("chart.stake_reward_earned"),
      amount: bignumber(data?.stake_reward_earned || 0).toFixed(2),
    },
    {
      label: t("chart.direct_burn_amount_earned"),
      amount: bignumber(data?.direct_burn_reward_earned || 0).toFixed(2),
    },
    {
      label: t("chart.team_burn_reward_earned"),
      amount: bignumber(data?.team_burn_reward_earned || 0).toFixed(2),
    },
  ];

  return (
    <div className="p-4">
      <IncomeChartCard
        totalAmount={bignumber(data?.total_earned || 0).toFixed(2)}
        items={incomeItems}
      />
    </div>
  );
} 