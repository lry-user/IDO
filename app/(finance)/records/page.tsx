import { getTranslations } from "next-intl/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderList } from "./order-list";
import MyPageHeader from "@/components/common/MyPageHeader";
export default async function OrderRecordsPage() {
  const t = await getTranslations("finance");

  return (
    <div>
      <MyPageHeader title={t("stake_form.record")} position="left" className="mt-8" />
      <Tabs defaultValue="STAKE" className="w-full">
        <TabsList className="w-full p-1 h-12 rounded-2xl bg-[#181A1B] border" style={{ boxShadow:
    "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
  backdropFilter: "blur(10px)", }}>
          <TabsTrigger
            value="STAKE"
            className="flex-1 h-10 rounded-xl font-bold text-base transition-all
              data-[state=active]:bg-[rgba(217,217,217,0.17)] data-[state=active]:text-[#00F6F6]
              data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
          >
            {t("stake")}
          </TabsTrigger>
          <TabsTrigger
            value="BURN"
            className="flex-1 h-10 rounded-xl font-bold text-base transition-all
              data-[state=active]:bg-[rgba(217,217,217,0.17)] data-[state=active]:text-[#00F6F6]
              data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
          >
            {t("burn")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="STAKE">
          <OrderList type="STAKE" />
        </TabsContent>
        <TabsContent value="BURN">
          <OrderList type="BURN" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
