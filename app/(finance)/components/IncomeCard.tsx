import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface IncomeCardProps {
  title: string;
  totalAmount: string;
  titleBgColor: string;
  items: {
    label: string;
    value?: string;
    action?: {
      component: ReactNode;
    };
  }[];
  subtitle?: {
    text: string;
  };
  recordButton?: ReactNode;
  imageType: "gift" | "coins";
}

export function IncomeCard({
  title,
  totalAmount,
  items,
  subtitle,
  recordButton
}: IncomeCardProps) {
  return (
    <Card className="backdrop-blur-lg bg-[#ffffff1a] border border-[#333333] rounded-3xl p-4 mb-4 transition-all duration-300 relative overflow-hidden">
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
        {recordButton && (
          <div className="flex items-center text-[#02E2E2]">{recordButton}</div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div 
          className="text-[#02E2E2] mb-6"
          style={{
            fontFamily: 'Open Sans',
            fontWeight: 700,
            fontSize: '40px'
          }}
        >
          {totalAmount}
          <span className="text-[#02E2E2]">Hi</span>
        </div>
        {/* <div className="w-24 h-24">
          {imageType === "gift" ? (
            <Image
              src="/images/gift-box.png"
              alt="Gift Box"
              width={96}
              height={96}
              className="object-contain"
            />
          ) : (
            <Image
              src="/images/coins.png"
              alt="Coins Stack"
              width={96}
              height={96}
              className="object-contain"
            />
          )}
        </div> */}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-200 text-base">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-white">
                {item.value ? `${item.value}Hi` : ""}
              </span>
              {item.action && (
                <div 
                  style={{
                    color: 'rgba(255, 212, 0, 0.62)',
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    borderRadius: '3px'
                  }}
                  className="income-card-action flex items-center"
                >
                  {item.action.component}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {subtitle && (
        <div className="flex justify-center mt-4">
        <div
            className={`bg-[#ffffff1a] text-center text-sm text-gray-200 rounded-lg flex items-center justify-center w-[15.125rem] h-[1.75rem]`}
        >
          {subtitle.text}
          </div>
        </div>
      )}
    </Card>
  );
}
