"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface LevelDisplayProps {
  level: number;
}

export function LevelDisplay({ level }: LevelDisplayProps) {
  const [showValue, setShowValue] = useState(true);
  const t = useTranslations("finance");

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{t("my_level")}</span>
        {/* <span className="text-[#02E2E2] text-sm">{t("level_info")}</span> */}
      </div>
      <div className="flex items-center gap-2">
        <div className="text-white">H{showValue ? (level || 0) : "***"}</div>
        <button
          onClick={() => setShowValue(!showValue)}
          className="bg-transparent text-gray-300 hover:text-white transition-colors"
        >
          {showValue ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </div>
    </div>
  );
} 