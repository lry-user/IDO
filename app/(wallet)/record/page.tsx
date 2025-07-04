import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordList } from "./record-list";
import MyPageHeader from "@/components/common/MyPageHeader";

export default async function RecordPage() {
  const t = await getTranslations("wallet");

  return (
    <div className="min-h-screen text-white font-sans p-4 relative" style={{background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}>
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <MyPageHeader title={t("record")} backUrl="/wallet" titlePosition="left" />
        {/* Tabs */}
        <div>
          <Tabs defaultValue="recharge" className="w-full">
            <TabsList className="w-full p-1 h-12 rounded-xl backdrop-blur-lg bg-[#181A1B] border" style={{ boxShadow:
    "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
  backdropFilter: "blur(10px)", }}>
              <TabsTrigger
                value="recharge"
                className="flex-1 h-10 data-[state=active]:bg-[rgba(217,217,217,0.17)] data-[state=active]:text-[#00F6F6] rounded-lg"
              >
                {t("recharge")}
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="flex-1 h-10 data-[state=active]:bg-[rgba(217,217,217,0.17)] data-[state=active]:text-[#00F6F6] rounded-lg"
              >
                {t("withdraw")}
              </TabsTrigger>
              <TabsTrigger
                value="hi_reward"
                className="flex-1 h-10 data-[state=active]:bg-[rgba(217,217,217,0.17)] data-[state=active]:text-[#00F6F6] rounded-lg"
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