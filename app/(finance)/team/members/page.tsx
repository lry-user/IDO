import PageHeader from "@/components/common/PageHeader";
import { getTranslations } from "next-intl/server";
import { MembersList } from "./members-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/server";
import { TeamTotalIncome } from "./TeamTotalIncome";
interface MembersPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const { type = "direct" } = await searchParams;
  const t = await getTranslations("team");
  await api.finance.getTeamTree.prefetch();

  return (
    <div className="relative">
      <PageHeader
        title={t("title")}
        backUrl="/team"
        position="right"
        className="mb-0"
      />
      <TeamTotalIncome />
      <Tabs defaultValue={type} className="w-full">
        <TabsList className="w-full p-1 h-12 rounded-xl">
          <TabsTrigger
            value="direct"
            className="flex-1 h-10 data-[state=active]:bg-[#02E2E2] data-[state=active]:text-black rounded-lg"
          >
            {t("direct")}
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="flex-1 h-10 data-[state=active]:bg-[#02E2E2] data-[state=active]:text-black rounded-lg"
          >
            {t("team_size")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="direct">
          <MembersList type="direct" />
        </TabsContent>
        <TabsContent value="team">
          <MembersList type="team" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
