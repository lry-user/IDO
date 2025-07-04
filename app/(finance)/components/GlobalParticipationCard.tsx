import { Card } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
interface GlobalParticipationCardProps {
  totalAmount: string;
}

export async function GlobalParticipationCard({ totalAmount }: GlobalParticipationCardProps) {
  const t = await getTranslations("finance");

  return (
    <Card className="rounded-3xl backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] p-4 mb-4 py-8">
      <div className="text-center text-gray-200 text-sm mb-2">
        {t("global_participation")}
      </div>
      <div className="text-center text-[#02E2E2] text-4xl font-bold mb-4">
        {totalAmount} HI
      </div>
      <div className="flex justify-center">
        <Link href="https://bscscan.com/address/0x0000000000000000000000000000000000000000" target="_blank" className="text-[#02E2E2] border-b border-[#02E2E2] text-sm">
          {t("query_black_hole")}
        </Link>
      </div>
      <div className="flex justify-center mt-2">
        <Link href="https://bscscan.com/address/0xe3dA96A4d79cB2473f64D807696F8E9D512eeACd" target="_blank" className="text-[#02E2E2] border-b border-[#02E2E2] text-sm">
          {t("contract_address")}
        </Link>
      </div>
    </Card>
  );
} 