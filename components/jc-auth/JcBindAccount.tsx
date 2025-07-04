"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";
import Link from "next/link";

interface JcBindAccountProps {
  openid: string;
  nickname: string;
}

const bindSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function JcBindAccount({ openid, nickname }: JcBindAccountProps) {
  const t = useTranslations("auth.jc");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: jcBind, isPending } = api.user.jcBind.useMutation({
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

      toast.success(t("bind_success"));
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("bind_error"));
      }
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = bindSchema.safeParse({ email, password });

    if (!parsed.success) {
      toast.error(t("validation.invalid_credentials"));
      return;
    }

    jcBind({
      email: parsed.data.email,
      password: parsed.data.password,
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
          placeholder={t("email_placeholder")}
          className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-200">{t("password")}</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password_placeholder")}
            className="bg-[#ffffff15] backdrop-blur-md border-[#ffffff30] h-14 rounded-2xl text-white pr-12 placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="text-right">
          <Link
            href="/reset-password"
            className="text-[#02E2E2] hover:text-[#02E2E2]/90 text-sm"
          >
            {t("forgot_password")}
          </Link>
        </div>

      <Button
        className="w-full h-14 rounded-2xl text-base bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black mt-6"
        type="submit"
        disabled={isPending}
      >
        {isPending ? t("binding") : t("bind_button")}
      </Button>
    </form>
  );
}