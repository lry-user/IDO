import { Card } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { QRCodeSVG } from "qrcode.react";
import { SaveQRButton } from "@/components/save-qr-button";
import { CopyButton } from "@/components/copy-button";
import PageHeader from "@/components/common/PageHeader";
import { api } from "@/trpc/server";
interface RechargePageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

export default async function USDTDeposit({ searchParams }: RechargePageProps) {
  const t = await getTranslations("wallet");
  const data = await api.wallet.getWalletInfo();
  if (data.code !== 200) {
    throw new Error(data.message);
  }
  const walletInfo = data.data;
  const redirect = await searchParams;

  return (
    <div className="min-h-screen text-white p-4 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/bg.png')",
          backgroundAttachment: "fixed"
        }}
      />
      <div 
        className="absolute inset-0 z-1 bg-gradient-to-b from-[#00000080] to-[#00000095] backdrop-blur-md"
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <PageHeader title={t("recharge")} backUrl={redirect?.redirect || "/wallet"} />
        
        {/* QR Code */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {walletInfo?.address ? (
              <QRCodeSVG
                value={walletInfo.address}
                size={192}
                level="H"
                className="w-48 h-48"
                id="svg-qr"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-gray-400">
                No address available
              </div>
            )}
          </div>
        </div>

        {/* Network Info */}
        <Card className="backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] rounded-xl mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
          <div className="p-4 space-y-6">
            <div>
              <div className="text-sm text-gray-300 mb-2">{t('network')}</div>
              <div className="flex items-center justify-between">
                <div className="text-white">BNB Smart Chain (BEP20)</div>
              </div>
            </div>

            <div className="h-[1px] bg-[#ffffff30]" />

            <div>
              <div className="text-sm text-gray-300 mb-2">
                {t("rechargeAddress")}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm pr-2 break-words whitespace-pre-wrap max-w-[calc(100%-20px)]">
                  {walletInfo?.address}
                </span>
                {walletInfo?.address && <CopyButton text={walletInfo.address} />}
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        {walletInfo?.address && (
          <div className="mt-6">
            <SaveQRButton />
          </div>
        )}
      </div>
    </div>
  );
}
