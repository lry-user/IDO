"use client";
import { api } from "@/trpc/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { useLog } from "@/hooks/log";
import { useJcUrl } from "@/hooks/jc-url";
import Image from "next/image";
export default function RechargeLink() {
  const t = useTranslations("wallet");
  const pathname = usePathname();
  const { data: appConfig ,isPending} = api.common.getAppConfig.useQuery();
  // 获取redirectRefer
  const redirectRefer = useJcUrl();

  const log = useLog();
  if (!appConfig?.data.ju_coin_appid || isPending) {
    return <span className="flex flex-col items-center gap-2"><Skeleton className="flex-col gap-2 w-10 h-10 rounded-full backdrop-blur-lg bg-[#ffffff20] flex items-center justify-center" /></span>;
  }
  log({
    redirectRefer,
  });

  // /zh-CN/application-center/transfer?appid={APPID}&redirect_uri={REDIRECT_URI}&custom_param={CUSTOM_PARAM}
  return (
    <Link
      href={`${redirectRefer}/zh-CN/application-center/transfer?appid=${
        appConfig?.data.ju_coin_appid
      }&redirect_uri=${encodeURIComponent(window.location.origin + pathname)}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-10 h-10 rounded-full backdrop-blur-lg bg-[#ffffff20] shadow-[inset_0px_1px_0px_0px_#00F6F6] flex items-center justify-center">
            <Image
              src="/images/cz.png"
              alt="cz"
              width={60}
              height={60}
            />
      </div>
      <span className="text-sm text-[#00F6F6]">{t("recharge")}</span>
    </Link>
  );
}
