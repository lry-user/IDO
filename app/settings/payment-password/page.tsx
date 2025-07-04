"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";
import { useCountDown } from "@/hooks/count-down";
import MyPageHeader from "@/components/common/MyPageHeader";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function PaymentPasswordPage() {
  const t = useTranslations();
  const router = useRouter();
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, startCountDown] = useCountDown(0);

  // Get user information
  const { data: userInfoResponse } = api.user.getUserInfo.useQuery();
  const userEmail = userInfoResponse?.data?.email || "";

  const { mutate: sendEmailCode, isPending: isSendingCode } = api.user.sendEmailCode.useMutation({
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(t("auth.register.send_code_success", { defaultMessage: "Verification code sent successfully" }));
      startCountDown();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: setPaymentPassword, isPending } = api.user.setPaymentPassword.useMutation({
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(t("wallet.payment_password_set_success", { defaultMessage: "Payment password set successfully" }));
      router.push("/settings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSendCode = () => {
    if (!userEmail) {
      toast.error(t("validation.email.required", { defaultMessage: "Email is required" }));
      return;
    }
    
    sendEmailCode({ 
      email: userEmail,
      type: "recover_payment_password"
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const schema = z.object({
      password: z.string().min(6, { message: t("validation.password.min", { min: 6, defaultMessage: "Password must be at least 6 characters long" }) }).max(16, { message: t("validation.password.max", { max: 16, defaultMessage: "Password must be less than 16 characters long"}) }),
      code: z.string().min(4, { message: t("validation.code.min", { min: 4, defaultMessage: "Verification code must be at least 4 characters long"}) })
    });
    
    const result = schema.safeParse({ password, code });
    
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    
    setPaymentPassword({ password, code });
  };

  // Redirect if not logged in
  useEffect(() => {
    if (session === null) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col p-4 relative">

      <div className="relative z-10">
        <MyPageHeader 
          title={t("wallet.set_payment_password", { defaultMessage: "Set Payment Password" })} 
          backUrl="/settings"
          titlePosition="left"
        />

        <form className="space-y-8 mt-10" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-white opacity-90">
              {t("auth.reset_password.new_password", { defaultMessage: "New password" })}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.reset_password.new_password_placeholder", { defaultMessage: "Enter new password" })}
                className="bg-[#ffffff1a] shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] backdrop-blur-[4px] h-12 rounded-lg text-white placeholder:text-white/50 pr-12 border-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Image src="/icons/eye-outline.svg" alt="Toggle password visibility" width={24} height={24} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white opacity-90">
              {t("auth.reset_password.code", { defaultMessage: "Verification Code" })}
            </label>
            <div className="relative">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t("auth.reset_password.code_placeholder", { defaultMessage: "Enter verification code" })}
                className="bg-[#ffffff1a] shadow-[inset_0px_0px_4.699999809265137px_0px_rgba(255,255,255,0.17),inset_0px_1px_0px_0px_#00F6F6] backdrop-blur-[4px] h-12 rounded-lg text-white placeholder:text-white/50 pr-28 border-none"
              />
              <Button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0 || isSendingCode || !userEmail}
                className="absolute right-3 top-1/2 bg-transparent -translate-y-1/2 text-[#00F6F6] hover:text-[#00F6F6]/90 p-0 h-auto font-semibold text-lg"
                variant="link"
              >
                {countdown > 0 
                  ? t("auth.reset_password.countdown", { seconds: countdown, defaultMessage: `${countdown}s` }) 
                  : t("auth.reset_password.send_code", { defaultMessage: "Send" })}
              </Button>
            </div>
          </div>

          <Button 
            className="w-[237px] h-11 rounded-lg text-base bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black mt-10 font-semibold"
            type="submit"
            disabled={isPending}
          >
            {isPending 
              ? t("common.submitting", { defaultMessage: "Submitting..." }) 
              : t("auth.reset_password.confirm_button", { defaultMessage: "Confirm" })}
          </Button>
        </form>
      </div>
    </div>
  );
}
