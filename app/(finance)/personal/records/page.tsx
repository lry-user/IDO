import PageHeader from "@/components/common/PageHeader";
import { getTranslations } from "next-intl/server";
import { EarningsList } from "./earnings-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecordsPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function RecordsPage({ searchParams }: RecordsPageProps) {
  const { type = "burn" } = await searchParams;
  const t = await getTranslations("finance");
  
  return (
    <div>
      <PageHeader title={t("title.personal_earnings_records")} backUrl="/personal" position="right" />
      
      <Tabs defaultValue={type} className="w-full">
        <TabsList className="w-full p-1 h-12 rounded-xl">
          <TabsTrigger
            value="burn"
            className="flex-1 h-10 data-[state=active]:bg-[#02E2E2] data-[state=active]:text-black rounded-lg"
          >
            {t("burn")}
          </TabsTrigger>
          <TabsTrigger
            value="stake"
            className="flex-1 h-10 data-[state=active]:bg-[#02E2E2] data-[state=active]:text-black rounded-lg"
          >
            {t("stake")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="burn">
          <EarningsList type="BURN" />
        </TabsContent>
        <TabsContent value="stake">
          <EarningsList type="STAKE" />
        </TabsContent>
      </Tabs>
    </div>
  );
} 