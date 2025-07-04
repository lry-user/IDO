"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/common/EmptyState";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { formatNumber } from "@/utils/formatNumber";
import { Spinner } from "@heroui/react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TeamMemberData {
  id: string
  email: string
  register_time: string
  team_level: number
  parent_id: string
  own_burn_amount: number
  own_burn_amount_24h: number
  children: TeamMemberData[];
}

export function MembersList({ type }: { type: "direct" | "team" }) {
  const t = useTranslations("team");
  const parentRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<"team_level" | "own_burn_amount">("own_burn_amount");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: teamTree, error, isPending } = api.finance.getTeamTree.useQuery(
    undefined,
    {
      select: (data) => {
        const treeData = data.data;
        let members: TeamMemberData[] = [];
        let totalCount = 0;

        if (type === "direct") {
          const rootMember = treeData.tree as unknown as TeamMemberData[];
          members = rootMember || [];
          totalCount = members.length;
        } else {
          const flattenMembers = (mems: TeamMemberData[]): TeamMemberData[] => {
            return mems.reduce((acc: TeamMemberData[], member) => {
              if (member.children?.length) {
                return [...acc, member, ...flattenMembers(member.children)];
              }
              return [...acc, member];
            }, []);
          };
          const rootMember = treeData.tree as unknown as TeamMemberData[];
          members = rootMember ? flattenMembers(rootMember) : [];
          totalCount = members.length;
        }

        members.sort((a, b) => {
          const valA = a[sortBy];
          const valB = b[sortBy];

          if (sortOrder === "asc") {
            return valA - valB;
          } else {
            return valB - valA;
          }
        });

        return {
          total_count: totalCount,
          members: members
        };
      }
    }
  );

  if (error) {
    console.log(error.message);
    toast.error(error.message);
  }

  const membersList = teamTree?.members || [];
  
  const virtualizer = useVirtualizer({
    count: membersList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => type === "direct" ? 190 : 64,
    overscan: 5,
  });

  // 计算团队总量和24小时总量
  interface TeamTotals {
    totalBurn: number;
    totalBurn24h: number;
  }

  const calculateTeamTotal = (member: TeamMemberData): TeamTotals => {
    if (!member.children || member.children.length === 0) {
      return {
        totalBurn: member.own_burn_amount,
        totalBurn24h: member.own_burn_amount_24h
      };
    }

    return member.children.reduce((acc: TeamTotals, child: TeamMemberData): TeamTotals => {
      const childTotals: TeamTotals = calculateTeamTotal(child);
      return {
        totalBurn: acc.totalBurn + childTotals.totalBurn,
        totalBurn24h: acc.totalBurn24h + childTotals.totalBurn24h
      };
    }, {
      totalBurn: member.own_burn_amount,
      totalBurn24h: member.own_burn_amount_24h
    });
  };

  // Handle sort click
  const handleSort = (key: "team_level" | "own_burn_amount") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  // 表头组件
  const TableHeader = () => {
    const SortIcon = ({ sortKey }: { sortKey: "team_level" | "own_burn_amount" }) => {
      if (sortBy !== sortKey) return null;
      return sortOrder === "asc" ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />;
    };

    return (
      <div className={`grid ${type === "direct" ? "grid-cols-[1fr_1fr]" : "grid-cols-[3fr_1fr_2fr]"} gap-4 px-4 py-3 text-gray-400 text-sm`}>
        <div>{t("user_id")}</div>
        <div className="text-right cursor-pointer" onClick={() => handleSort("team_level")}>
          {t("level")}
          <SortIcon sortKey="team_level" />
        </div>
        {type === "team" && (
          <div className="text-right cursor-pointer" onClick={() => handleSort("own_burn_amount")}>
            {t("total_burn_amount")}
            <SortIcon sortKey="own_burn_amount" />
          </div>
        )}
      </div>
    );
  };

  const MemberItem = ({ member }: { member: TeamMemberData }) => {
    // 对邮箱进行脱敏处理
    const maskEmail = (email: string) => {
      const [username, domain] = email.split('@');
      const maskedUsername = username.slice(0, 3) + '***';
      // 后2位不变
      const maskedUsernameEnd = username.slice(-2);
      return `${maskedUsername}${maskedUsernameEnd}@${domain}`;
    };

    // 如果是直推模式，计算团队总量
    let teamTotals = { totalBurn: 0, totalBurn24h: 0 };
    if (type === "direct" && member.children) {
      teamTotals = calculateTeamTotal(member);
    }

    if (type === "direct") {
      return (
        <div className="bg-[#ffffff20] backdrop-blur-md rounded-xl px-4 py-3 mb-2">
          {/* 第一行：基本信息 */}
          <div className={cn("grid grid-cols-[1fr_1fr]", type === "direct" ? "grid-cols-[1fr_1fr]" : "grid-cols-[3fr_1fr_2fr]")}>
            <div className="text-white">{maskEmail(member.email)}</div>
            <div className="text-white text-right">H{member.team_level}</div>
          </div>
          
          {/* 第二行：详细指标 */}
          <div className="grid grid-cols-1 gap-4 mt-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-gray-400">{t("own_burn")}</div>
              <div className="text-[#02E2E2]">{formatNumber(member.own_burn_amount)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-400">{t("24h_increase")}</div>
              <div className="text-[#02E2E2]">{formatNumber(member.own_burn_amount_24h)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-400">{t("team_total")}</div>
              <div className="text-[#02E2E2]">{formatNumber(teamTotals.totalBurn)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-400">{t("team_24h_total")}</div>
              <div className="text-[#02E2E2]">{formatNumber(teamTotals.totalBurn24h)}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[#ffffff20] backdrop-blur-md rounded-xl px-4 py-3 grid grid-cols-[3fr_1fr_2fr] gap-4 items-center mb-2">
        <div className="text-white">{maskEmail(member.email)}</div>
        <div className="text-white">H{member.team_level}</div>
        <div className="text-[#02E2E2] text-right">
          {formatNumber(member.own_burn_amount)}
        </div>
      </div>
    );
  };

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center h-[calc(100vh-280px)]">
          <Spinner />
        </div>
      ) : !membersList.length ? (
        <EmptyState text={t("no_members")} className="h-[calc(100vh-280px)]" />
      ) : (
        <div className="mt-4">
          <TableHeader />
          <div
            ref={parentRef}
            className="h-[calc(100vh-330px)] overflow-auto"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => (
                <div
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    paddingBottom: "8px",
                  }}
                >
                  <MemberItem member={membersList[virtualItem.index] as TeamMemberData} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 