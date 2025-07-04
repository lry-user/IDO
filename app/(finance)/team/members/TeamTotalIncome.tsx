"use client";

import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/utils/formatNumber";
import { useTranslations } from "next-intl";
interface TeamMemberData {
  id: string;
  email: string;
  register_time: string;
  team_level: number;
  parent_id: string;
  own_burn_amount: number;
  children: TeamMemberData[];
}
export function TeamTotalIncome() {
  const t = useTranslations("team");
  const { data, isPending } = api.finance.getTeamTree.useQuery(undefined, {
    select: (data) => {
      const treeData = data.data;

      const flattenMembers = (members: TeamMemberData[]): TeamMemberData[] => {
        return members.reduce((acc: TeamMemberData[], member) => {
          if (member.children?.length) {
            return [...acc, member, ...flattenMembers(member.children)];
          }
          return [...acc, member];
        }, []);
      };
      const rootMember = treeData.tree as unknown as TeamMemberData[];
      const allMembers = rootMember ? flattenMembers(rootMember) : [];

      return {
        total_count: allMembers.length,
        members: allMembers,
        total_burn_amount: allMembers.reduce(
          (acc, member) => acc + member.own_burn_amount,
          0
        ),
      };
    },
  });

  if (isPending) {
    return <Skeleton className="w-full h-10 rounded-xl mb-2 bg-[#ffffff20] backdrop-blur-md" />;
  }

  return <div className="text-lg text-[#02E2E2] mb-2">{t("team_total_burn_amount", { total_burn_amount: formatNumber(data?.total_burn_amount || 0) })} HI</div>;
}
