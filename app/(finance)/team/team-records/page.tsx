import { getTranslations } from "next-intl/server";
import TeamProfitRecordsList from "./team-profit-records";
import PageHeader from "@/components/common/PageHeader";
export default async function TeamRecordsPage() {
  const t = await getTranslations("finance");
  
  return (
    <div className="space-y-4 h-full">
      <PageHeader title={t("team_profit_records")} position="right" backUrl="/team" />
      <TeamProfitRecordsList />
    </div>
  );
} 