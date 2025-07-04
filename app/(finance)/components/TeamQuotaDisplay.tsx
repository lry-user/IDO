"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatNumber";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface TeamQuotaDisplayProps {
  limitAmount: string;
  totalAmount: string;
  level: number;
}

export function TeamQuotaDisplay({
  limitAmount,
  totalAmount,
  level,
}: TeamQuotaDisplayProps) {
  const [showValues, setShowValues] = useState(true);
  const t = useTranslations("finance");

  return (
    <Card className="rounded-2xl p-6 bg-[#ffffff10] border-[#ffffff30]">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-[#D9D9D9] bg-opacity-10 text-[#02E2E2] px-6 py-2 rounded-[6px] text-sm">
          {/* {t("team_my_level", { level: showValues ? `${level}` : "***" })} */}
          <span className="text-[#28FF81]">{t("team_my_level_lable")}</span>
          <span className="text-[#FFDF85]">{t("team_my_level_value", { level: showValues ? `${level}` : "***" })}</span>
        </div>
        <button 
          onClick={() => setShowValues(!showValues)}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {showValues ? <EyeOffIcon size={18} color="#00F6F6" /> : <EyeIcon size={18} color="#00F6F6" />}
        </button>
      </div>

      <div className="text-center space-y-2 mb-4">
        <div className="text-[#02E2E2] text-2xl font-bold">
          {t("quota")}: {showValues ? formatNumber(limitAmount) : "***"}Hi
        </div>
        <div className="text-[#02E2E2] text-2xl font-bold">
        {t("team_claimed_amount", {
            totalAmount: showValues ? formatNumber(totalAmount) : "***",
          })}
        </div>
      </div>

      <div className="bg-[#ffffff10] rounded-lg p-4 text-center text-sm text-gray-400">
        <div>{t("team_income_limit_desc")}</div>
        <div>{t("team_income_limit_desc_2")}</div>
      </div>
    </Card>
  );
} 