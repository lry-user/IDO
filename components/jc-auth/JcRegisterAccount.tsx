"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";

interface JcRegisterAccountProps {
  openid: string;
  nickname: string;
}

const registerSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4),
  invite_code: z.string().min(4),
});

export function JcRegisterAccount({ openid, nickname }: JcRegisterAccountProps) {
  const t = useTranslations("auth.jc");
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const { mutate: jcRegister, isPending } = api.user.jcRegister.useMutation({
    onSuccess: async (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      const authData = response.data;

      // Sign in with the received tokens
      await signIn("credentials", {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        expires: authData.expires,
        redirect: false,
      });

      toast.success(t("register_success"));
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("register_error"));
      }
    },
  });

  const { mutate: sendEmailCode,isPending: isSendingCode } = api.user.sendEmailCode.useMutation({
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(t("code_sent"));
      
      // Start countdown
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("send_code_error"));
      }
    },
  });

  function handleSendCode() {
    if (!email || !email.includes('@')) {
      toast.error(t("validation.email_required"));
      return;
    }

    sendEmailCode({
      email,
      type: "register"
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = registerSchema.safeParse({
      email,
      code,
      invite_code: inviteCode
    });

    if (!parsed.success) {
      toast.error(t("validation.invalid_input"));
      return;
    }

    jcRegister({
      email: parsed.data.email.trim(),
      code: parsed.data.code.trim(),
      invite_code: parsed.data.invite_code.trim(),
      openid,
      nickname,
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm text-gray-200">{t("email")}</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder={t("email_placeholder")}
          className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-200">{t("verification_code")}</label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            id="code"
            placeholder={t("code_placeholder")}
            className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white placeholder:text-gray-400"
          />
          <Button
            type="button"
            className="h-14 whitespace-nowrap rounded-2xl bg-[#ffffff15] border border-[#ffffff30] text-gray-200 hover:bg-[#ffffff25]"
            onClick={handleSendCode}
            disabled={countdown > 0 || isSendingCode}
          >
            {countdown > 0 ? t("countdown", { seconds: countdown }) : t("send_code")}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-200">{t("invite_code")}</label>
        <Input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          id="invite_code"
          placeholder={t("invite_code_placeholder")}
          className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white placeholder:text-gray-400"
        />
      </div>

      <Button
        className="w-full h-14 rounded-2xl text-base bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black mt-6"
        type="submit"
        disabled={isPending}
      >
        {isPending ? t("registering") : t("register_button")}
      </Button>
    </form>
  );
} 