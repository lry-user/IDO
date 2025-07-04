import { getTranslations } from "next-intl/server";
import Link from "next/link";
import MyPageHeader from "@/components/common/MyPageHeader";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/server";
// import RechargeLink from "./recharge-link";
import Image from "next/image";

export default async function WalletPage() {
  const t = await getTranslations("wallet");

  const walletInfoData = await api.wallet.getWalletInfo();
  if (walletInfoData.code !== 200) {
    throw new Error(walletInfoData.message);
  }
  const walletInfo = walletInfoData.data;
  console.info("wallet_info", walletInfo);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col p-4 relative">
      {/* Header */}
      <div className="relative z-5">

        {/* Balance Section */}
        {walletInfo ? (
          <div className="py-8 flex-1 flex flex-col overflow-hidden">
            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 ">
              {/* <RechargeLink /> */}
              <Link href="/recharge" className="flex flex-col items-center gap-2">
              <Image
                    src="/images/cz.png"
                    alt="cz"
                    width={60}
                    height={60}
                  />
                <span className="text-sm">{t("recharge")}</span>
              </Link>
              <Link href="/withdraw" className="flex flex-col items-center gap-2">
              <Image
                    src="/images/tx.png"
                    alt="tx"
                    width={60}
                    height={60}
                  />
                <span className="text-sm">{t("withdraw")}</span>
              </Link>
              <Link href="/record" className="flex flex-col items-center gap-2">
                <Image
                    src="/images/jl.png"
                    alt="jl"
                    width={60}
                    height={60}
                  />
            
                <span className="text-sm">{t("record")}</span>
              </Link>
            </div>
            <div className="h-[1px] bg-[#ffffff20] my-6"></div>
            {/* My Assets */}
            <h3 className="text-xl mb-4">{t("myAssets")}</h3>
            <div className="bg-[#18171C] borde border-[#707070] rounded-[10px]">
              {walletInfo.assetList.map((asset, index) => (
                <div key={asset.coinKey}>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={asset.logoUrl} alt={asset.coinSymbol} width={32} height={32} className="w-8 h-8" />
                      <span className="text-base font-medium text-white">{asset.coinName}</span>
                    </div>
                    <span className="text-base font-medium text-[#00FFFB]">{formatNumber(asset.available_balance)}</span>
                  </div>
                  {index < walletInfo.assetList.length - 1 && <hr className="border-white/30 mx-4" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-2xl font-medium">{t("no_records")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
