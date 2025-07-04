import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatNumber } from "@/utils/formatNumber";

interface AssetListProps {
  assetList: Array<{
    coinKey: string;
    coinName: string;
    coinSymbol: string;
    logoUrl: string;
    balance: number;
    available_balance: number;
    frozen_balance: number;
  }>;
}

export function AssetList({ assetList }: AssetListProps) {
  const t = useTranslations("wallet");

  return (
    <div className="text-left flex-1 flex flex-col overflow-hidden">
      <h3 className="text-xl mb-4">{t("myAssets")}</h3>
      <div className="space-y-3 overflow-auto">
        {assetList?.map((asset) => (
          <div
            key={asset.coinKey}
            className="backdrop-blur-lg bg-[#ffffff10] rounded-xl p-4 flex items-center justify-between hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              {asset.logoUrl ? (
                <Image
                  src={asset.logoUrl}
                  alt={asset.coinSymbol}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              ) : asset.coinSymbol === 'C' ? (
                <Image
                  src="/logo.svg"
                  alt={asset.coinSymbol}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              ) : (
                <div className="w-8 h-8 backdrop-blur-md bg-[#ffffff20] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-base">
                    {asset.coinSymbol?.slice(0, 2)}
                  </span>
                </div>
              )}
              <span className="text-white font-medium text-base">
                {asset.coinSymbol}
              </span>
            </div>
            <div className="text-right">
              <p className="font-medium text-[#02E2E2]">
                {formatNumber(asset.available_balance)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 

