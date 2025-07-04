"use client";
import { Button } from "@/components/ui/button";
import { AuthError } from "next-auth";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const t = useTranslations("error");
  const router = useRouter();

  // More reliable way to detect authentication errors - by checking error types
  // instead of string checking error.message
  const isAuthError = 
    error.name === "AuthError" || 
    error.name === "CredentialsSignin" ||
    error.message === "UNAUTHORIZED" ||
    error.message === "401" ||
    error.message === "token expired" ||
    error.name === "TokenExpiredError" || error instanceof AuthError

  const handleBackToHome = async () => {
    try {
      await signOut({ redirectTo: "/" });
    } catch (err) {
      console.error("Logout failed:", err);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
      <div className="fixed inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F60004] to-transparent opacity-30 pointer-events-none"></div>
      <div className="relative z-10 backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        {isAuthError ? (
          <>
            <h1 className="text-2xl font-bold text-white">{t("sessionExpired")}</h1>
            <p className="text-gray-200">{t("pleaseLoginAgain")}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white">{t("unknownError")}</h1>
            <p className="text-gray-200">{process.env.NODE_ENV === "development" ? error.message : t("generalErrorMessage")}</p>
          </>
        )}

        <Button onClick={handleBackToHome} className="mt-6 backdrop-blur-md bg-[#02E2E2] hover:bg-[#02E2E2]/80 text-black">
          {t("backToHome")}
        </Button>
      </div>
    </div>
  );
}
