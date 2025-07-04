"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const t = useTranslations("settings");

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-[#FF3B30] bg-transparent py-8 text-center"
    >
      {t("logout")}
    </button>
  );
} 