import { getTranslations } from "next-intl/server";
import { WithdrawForm } from './withdraw-form';
import MyPageHeader from "@/components/common/MyPageHeader";
import EmptyState from "@/components/common/EmptyState";
import { api } from "@/trpc/server";
export default async function WithdrawPage() {
  const t = await getTranslations("wallet");
  const walletInfoData = await api.wallet.getWalletInfo();
  if (walletInfoData.code !== 200) {
    throw new Error(walletInfoData.message);
  }
  const walletInfo = walletInfoData.data;
  const res = await api.common.getAppConfig();

  if (!res.success && res.code !== 200) {
    return <div className="min-h-screen text-white font-sans flex flex-col p-4 relative" style={{background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}>
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
      
      <div className="relative z-10">
        <MyPageHeader title={t("withdraw")} backUrl="/wallet" titlePosition="left" />
        <main className="flex-1">
          <EmptyState text={t("withdraw_error_text")} />
        </main>
      </div>
    </div>
  }

  return (
    <div className="min-h-screen text-white font-sans flex flex-col p-4 relative" style={{background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}>
      <div className="relative z-10">
        {/* Header */}
        <MyPageHeader title={t("withdraw")} backUrl="/wallet" titlePosition="left" />

        <main className="flex-1">
          {walletInfo && <WithdrawForm walletInfo={walletInfo} config={res.data} />}
        </main>
      </div>
    </div>
  );
} 