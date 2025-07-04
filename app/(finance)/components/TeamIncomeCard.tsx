"use client";

import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { formatNumber } from "@/utils/formatNumber";

interface TeamIncomeCardProps {
  title: string;
  titleBgColor: string;
  amount: string;
  description?: string;
  items: Array<{
    label: string;
    value: string | number;
    action?: ReactNode;
    linkText?: string;
    linkUrl?: string;
  }>;
  footerText: string;
  recordButton?: ReactNode;
}

export function TeamIncomeCard({
  title,
  amount,
  description,
  items,
  footerText,
  recordButton,
}: TeamIncomeCardProps) {
  return (
    <Card className="rounded-2xl p-6 bg-[#ffffff10] border-[#ffffff30]">
      <div className="flex items-center justify-between mb-4">
        <div
          className="inline-block p-[1px] rounded-[6px]"
          style={{
            background: 'linear-gradient(90deg, #00F6F6 0%, rgba(0,246,246,0.25) 60%, rgba(0,246,246,0.10) 100%)'
          }}
        >
          <span className="block rounded-[6px] px-4 py-1 text-white text-lg font-bold bg-[#23232A]">
          {title}
        </span>
        </div>
        {recordButton}
      </div>

      <div className="text-[#02E2E2] text-4xl font-medium mb-4">
        {formatNumber(amount)}Hi
      </div>
      
      {description && (
        <div className="text-gray-400 text-xs mb-4">
          {description}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{item.label}</span>
              {item.linkText && item.linkUrl && (
                <a
                  href={item.linkUrl}
                  className="text-[#02E2E2] text-sm underline"
                >
                  {item.linkText}
                </a>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-white mr-2">{item.value}</span>
              {item.action && (
                <div className="team-income-action">{item.action}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center mt-4 rounded-lg bg-[#ffffff10] h-[1.75rem] px-4 text-[0.75rem] text-gray-400">
          {footerText}
        </div>
      </div>
    </Card>
  );
} 