import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";


interface IncomeItem {
  label: string;
  amount: string;
}

interface IncomeChartCardProps {
  totalAmount: string;
  items: IncomeItem[];
}

export async function IncomeChartCard({
  totalAmount,
  items,
}: IncomeChartCardProps) {
  const t = await getTranslations("finance");
  return (
    <div className="relative mx-auto max-w-md">
      <div className="mb-[50px]">
        <Link href="/earn">
          <Image
            src="/icons/profile-refund-back.svg"
            alt="Back"
            width={35}
            height={35}
          />
        </Link> 
      </div>
      {/* Main earnings card */}
      <div className="relative rounded-[18px] bg-[#ffffff1a] p-6 mx-auto my-4 shadow-[inset_0px_0px_4.7px_rgba(255,255,255,0.17),inset_0px_1px_0px_#02E2E2]">
        {/* Total earnings section */}
        <div className="flex justify-center mb-8">
          <div className="bg-[rgba(217,217,217,0.06)] border rounded-md px-4 py-1">
            <div className="text-white font-bold text-base">
              {t("total_earnings")}
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <div className="text-[#00F6F6] text-4xl font-bold">
            {totalAmount} Hi
          </div>
        </div>

        {/* Earnings grid */}
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[rgba(217,217,217,0.17)] rounded-lg p-4"
            >
              <div className="text-white text-center font-semibold text-sm mb-3">
                {item.label}
              </div>
              <div className="text-[#00F6F6] text-center text-xl font-bold tracking-wider">
                {item.amount} Hi
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 