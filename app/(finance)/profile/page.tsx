import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
// import InviteUrl from "./invite-url";
import { CopyButton } from "@/components/copy-button";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await auth();
  if (session?.error || !session?.user) {
    redirect("/");
  }
  const userData = await api.user.getUserInfo();
  if (userData.code !== 200) {
    throw new Error(userData.message || "Failed to fetch user data.");
  }
  const user = userData.data;
  const t = await getTranslations("profile");

  if (!user) {
    redirect("/");
  }

  return (
    <div className="text-white font-sans relative">
      <div className="relative z-10 p-4 flex flex-col space-y-6 pt-0">
        {/* Header */}
        <div className="flex items-center justify-center w-full">
          {/* <Link href="/">
            <Image
              src="/icons/profile-refund-back.svg"
              alt="Back"
              width={35}
              height={35}
            />
          </Link> */}
          <div
            className="bg-[rgba(217,217,217,0.06)] border border-transparent rounded-md px-6 py-2.5"
            style={{
              borderImageSource:
                "linear-gradient(100deg, #00F6F6 12.97%, rgba(0,0,0,0) 66.72%)",
              borderImageSlice: 1,
            }}
          >
            <span className="text-sm font-bold text-white tracking-widest">
              {user.email}
            </span>
          </div>
        </div>

        {/* Invite Card */}
        <div
          className={cn(
            "rounded-2xl bg-[#ffffff1a] backdrop-blur-md",
            "shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6]",
            "p-5 flex flex-col space-y-4"
          )}
        >
          <h3 className="text-xl font-bold text-[#00F6F6] text-center leading-tight">
            {t("invite.title")}
            <br />
            {t("invite.subtitle")}
          </h3>

          <div className="bg-[rgba(217,217,217,0.17)] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/icons/people-outline.svg"
                alt="Invite Players"
                width={30}
                height={30}
              />
              <span className="text-base font-bold text-white">
                {t("invite.player")}
              </span>
            </div>
            <span className="text-base font-bold text-white">
              {user.team_count ?? 0}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-base text-white/90">{t("invite.code")}</span>
            <div className="flex items-center space-x-2">
              <span className="text-base font-semibold text-[#00F6F6]">
                {user.invite_code}
              </span>
              <CopyButton text={user.invite_code} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          className={cn(
            "rounded-2xl bg-[#ffffff1a] backdrop-blur-md",
            "shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6]",
            "p-4 flex justify-around items-center"
          )}
        >
          <Link
            href="/wallet"
            className="flex flex-col items-center gap-1.5 text-white hover:text-[#00F6F6] transition-colors duration-200"
          >
            <Image
              src="/icons/wallet-icon.svg"
              alt={t("nav.wallet")}
              width={28}
              height={28}
            />
            <span className="text-sm font-semibold">{t("nav.wallet")}</span>
          </Link>
          <Link
            href="/settings"
            className="flex flex-col items-center gap-1.5 text-white hover:text-[#00F6F6] transition-colors duration-200"
          >
            <Image
              src="/icons/setting-icon.svg"
              alt={t("nav.settings")}
              width={28}
              height={28}
            />
            <span className="text-sm font-semibold">{t("nav.settings")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
