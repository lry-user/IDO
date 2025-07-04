"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCountDown } from "@/hooks/count-down";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";

export default function ResetPasswordPage() {
  const t = useTranslations("auth.reset_password");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, startCountDown] = useCountDown(0);
  const router = useRouter();
  const { mutate: sendCode } = api.user.sendEmailCode.useMutation();

  const { mutate: resetPassword } = api.user.resetPassword.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSendCode = () => {
    const res = z
      .object({ email: z.string().email() })
      .safeParse({ email: email });
    if (!res.success) {
      toast.error(res.error.errors[0].message);
      return;
    }
    sendCode({ email: email, type: "reset_password" });
    startCountDown();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ email: email, code: code, password: password });
  };

  return (
    <>
      <h1 className="text-2xl font-medium mb-8 text-center">{t("title")}</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">{t("email")}</label>
          <Input
            type="email"
            placeholder={t("email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">{t("new_password")}</label>
          <Input
            type="password"
            placeholder={t("new_password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">{t("code")}</label>
          <div className="relative">
            <Input
              type="text"
              placeholder={t("code_placeholder")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white pr-24 placeholder:text-gray-400"
            />
            <Button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#02E2E2] hover:text-[#02E2E2]/90 p-0 h-auto"
              variant="link"
            >
              {countdown > 0 ? `${countdown}s` : t("send_code")}
            </Button>
          </div>
        </div>

        <Button className="w-full h-14 rounded-2xl text-base bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black mt-6">
          {t("confirm_button")}
        </Button>

        <div className="text-right">
          <Link
            href="/login"
            className="text-[#02E2E2] hover:text-[#02E2E2]/90 text-sm"
          >
            {t("login_tip")}
          </Link>
        </div>
      </form>
    </>
  );
}
