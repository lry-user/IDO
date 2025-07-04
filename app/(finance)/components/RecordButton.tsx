"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface RecordButtonProps {
  url: string;
}

export function RecordButton({ url }: RecordButtonProps) {
  const t = useTranslations("finance");

  return (
    <Link
      href={url}
      className="flex items-center text-[#02E2E2] hover:text-[#02E2E2]/80 transition-colors px-2 py-1 rounded-full hover:bg-[#ffffff10] bg-white/10"
    >
      <span className="text-sm mr-1">{t("stake_form.record")}</span>
    </Link>
  );
} 