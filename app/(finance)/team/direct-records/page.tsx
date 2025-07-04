import { getTranslations } from "next-intl/server";
import DirectProfitRecordsList from "./direct-profit-records";
import PageHeader from "@/components/common/PageHeader";

export default async function DirectRecordsPage() {
  const t = await getTranslations("finance");
  
  return (
    <div className="space-y-4 h-full">
      <PageHeader title={t("direct_profit_records")} position="right" backUrl="/team" />
      <DirectProfitRecordsList />
    </div>
  );
} 