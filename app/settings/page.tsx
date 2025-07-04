import LanguageSelector from "@/components/settings/LanguageSelector";
import MyPageHeader from "@/components/common/MyPageHeader";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import LogoutButton from "@/components/settings/LogoutButton";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import Link from "next/link";
import Image from "next/image";

export default async function SettingsPage() {
  const t = await getTranslations("settings");
  let user = null;
  const session = await auth();
  if (session?.error || !session?.user) {
    redirect("/dashboard");
  }
  const userData = await api.user.getUserInfo();
  if (userData.code !== 200) {
    throw new Error(userData.message);
  }
  user = userData.data;
  console.info("settings_user", user);
  if (!user) {
    redirect("/");
  }

  if (!user.jc_openid) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen text-white font-sans flex flex-col p-4 relative" style={{background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}>
      <div className="relative z-10">
        <MyPageHeader title={t("title")} backUrl="/profile" titlePosition="left" />
        <div className="flex flex-col space-y-4 mt-4">

          <div className="flex items-center justify-between py-6 px-4 rounded-lg bg-[#ffffff1a] shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] backdrop-blur-[4px]">
            <div className="flex items-center gap-3">
              <Image src="/icons/people-minus.svg" alt="Referrer Icon" width={24} height={24} />
              <span className="text-base text-[#FEFEFE]">{t("my_referrer")}</span>
            </div>
            <span className="text-base text-[#00F6F6]">
              {user.promoter?.first_name}
            </span>
          </div>

          {/* 重置支付密码 */}
          <div className="flex items-center justify-between py-6 px-4 rounded-lg bg-[#ffffff1a] shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] backdrop-blur-[4px]">
            <div className="flex items-center gap-3">
              <Image src="/icons/lock-outline.svg" alt="Lock Icon" width={24} height={24} />
              <Link href="/settings/payment-password" className="text-base text-[#FEFEFE]">{t("reset_payment_password")}</Link>
            </div>
          </div>
          <div className="rounded-lg bg-[#ffffff1a] shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] backdrop-blur-[4px] px-4">
            <LanguageSelector iconPath="/icons/language.svg" />
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
