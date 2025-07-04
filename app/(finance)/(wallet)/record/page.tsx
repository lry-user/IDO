import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordList } from "./record-list";
import MyPageHeader from "@/components/common/MyPageHeader";

export default async function RecordPage() {
  const t = await getTranslations("wallet");

  return (
    <div className="min-h-screen text-white font-sans p-4 relative">
      {/* Content */}
      <div className="relative z-10">
        {/* Tabs */}
        <div>
          <Tabs defaultValue="recharge" className="w-full">
            <TabsList className="w-full p-1 h-12 rounded-full backdrop-blur-lg bg-[#181A1B] border">
              <TabsTrigger
                value="recharge"
                className="flex-1 h-10 data-[state=active]:bg-[#1D81CE] data-[state=active]:text-[#FFFFFF] rounded-full"
              >
                {t("recharge")}
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="flex-1 h-10 data-[state=active]:bg-[#1D81CE] data-[state=active]:text-[#FFFFFF] rounded-full"
              >
                {t("withdraw")}
              </TabsTrigger>
              <TabsTrigger
                value="hi_reward"
                className="flex-1 h-10 data-[state=active]:bg-[#1D81CE] data-[state=active]:text-[#FFFFFF] rounded-full"
              >
                {t("hi_reward")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recharge">
              <RecordList type="deposit" />
            </TabsContent>
            <TabsContent value="withdraw">
              <RecordList type="withdraw" />
            </TabsContent>
            <TabsContent value="hi_reward">
              <RecordList type="hi_reward" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 