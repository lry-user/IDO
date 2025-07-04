import { getTranslations } from "next-intl/server";
import Link from "next/link";
import MyPageHeader from "@/components/common/MyPageHeader";
import { formatNumber } from "@/utils/formatNumber";
import { api } from "@/trpc/server";
import RechargeLink from "./recharge-link";
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
    <div className="min-h-screen text-white font-sans flex flex-col p-4 relative" style={{background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}>
      {/* Header */}
      <div className="relative z-5">
        <MyPageHeader
          title={t("title")}
          backUrl="/profile"
          position="left"
          titlePosition="left"
        />

        {/* Balance Section */}
        {walletInfo ? (
          <div className="py-8 flex-1 flex flex-col overflow-hidden">
            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 ">
              <RechargeLink />
              <Link href="/withdraw" className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full backdrop-blur-lg bg-[#ffffff20] shadow-[inset_0px_1px_0px_0px_#00F6F6] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 4v16m0-16l-4 4m4-4l4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-sm text-[#00F6F6]">{t("withdraw")}</span>
              </Link>
              <Link href="/record" className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full backdrop-blur-lg bg-[#ffffff20] shadow-[inset_0px_1px_0px_0px_#00F6F6] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M14 2v6h6M16 13H8m0 4h8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-sm text-[#00F6F6]">{t("record")}</span>
              </Link>
            </div>
            <div className="h-[1px] bg-[#ffffff20] my-6"></div>
            {/* My Assets */}
            <h3 className="text-xl mb-4">{t("myAssets")}</h3>
            <div className="rounded-2xl bg-[#ffffff1a] backdrop-blur-md shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6]">
              {walletInfo.assetList.map((asset, index) => (
                <div key={asset.coinKey}>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={asset.logoUrl} alt={asset.coinSymbol} width={32} height={32} className="w-8 h-8" />
                      <span className="text-base font-medium text-white">{asset.coinName}</span>
                    </div>
                    <span className="text-base font-medium text-[#00F6F6]">{formatNumber(asset.available_balance)}</span>
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
