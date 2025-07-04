"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CustomError } from "@/server/auth/config";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";
import { JcBindAccount } from "@/components/jc-auth/JcBindAccount";
import { JcRegisterAccount } from "@/components/jc-auth/JcRegisterAccount";
import { JcLoginResponse } from "@/types/jc-auth";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { useLog } from "@/hooks/log";
import { useQueryState } from "nuqs";
import { useJcUrl } from "@/hooks/jc-url";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const jcT = useTranslations("auth.jc");
  const [jcLoginData, setJcLoginData] = useState<JcLoginResponse | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const router = useRouter();

  const { data: appConfig } = api.common.getAppConfig.useQuery();

  const [code] = useQueryState("code", {
    defaultValue: "",
  });
  const [hiToken] = useQueryState("hi_token", {
    defaultValue: "",
  });
  const redirectRefer = useJcUrl();
  const [receivedState] = useQueryState("state", {
    defaultValue: "",
  });

  const log = useLog();

  // 处理hi_token参数，存储或清空localStorage中的hi_token字段
  useEffect(() => {
    if (hiToken) {
      // 如果有hi_token参数，存储到localStorage中
      localStorage.setItem('hi_token', hiToken);
      console.log('Third URL stored in localStorage:', hiToken);
    }
  }, [hiToken]);

  const { mutate: jcLogin, isPending } = api.user.jcLogin.useMutation({
    onSuccess: async (response) => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      
      const jcData = response.data;
      // If user exists, sign in with the received tokens
      if (!jcData.is_new_user && jcData.accessToken) {
        await signIn("credentials", {
          accessToken: jcData.accessToken,
          refreshToken: jcData.refreshToken,
          expires: jcData.expires,
          redirect: false,
        });
        // 检查是否有hi_token参数
        if (localStorage.getItem('hi_token')) {
          // 跳转到指定URL并携带token参数
          const targetUrl = `${localStorage.getItem('hi_token')}?token=${jcData.accessToken}`;
          localStorage.removeItem('hi_token');
          window.location.href = targetUrl;
        } else {
          router.push("/");
        }
        return;
      }
      
      // Otherwise, show bind/register options
      setJcLoginData(jcData);
    },
    onError: (error) => {
      if (error instanceof CustomError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(jcT("login_error"));
      }
    }
  });

  // Handle JC login callback
  useEffect(() => {
    const state = localStorage.getItem("jc_state");

    if (code && redirectRefer && state && receivedState && state === receivedState && receivedState !== "undefined") {
      jcLogin({
        jc_code: code,
      });
      localStorage.removeItem("jc_state");
    }
  }, [code, redirectRefer, jcLogin, receivedState]);

  // Redirect to JC login page
  function redirectToJcAuth() {
    const jcUrl = redirectRefer || "";
    if (!jcUrl) {
      toast.error(jcT("missing_redirect_refer"));
      return;
    }
    
    // Generate a random state to verify the callback
    const state = nanoid(10);
    localStorage.setItem("jc_state", state);
    
    // Construct the JC authorization URL
    const authUrl = `${jcUrl}/zh-CN/application-center/authorize?appid=${appConfig?.data.ju_coin_appid}&redirect_uri=${encodeURIComponent(window.location.origin + window.location.pathname)}&state=${state}`;
    
    log({
      authUrl,
    });
    // Redirect to JC authorization page
    window.location.href = authUrl;
  }

  // Show bind/register UI when we have JC data
  if (jcLoginData) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-medium mb-8 text-center">
          {jcLoginData.is_new_user ? jcT("new_user_title") : jcT("bind_title")}
        </h1>
        
        {jcLoginData.is_new_user ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                className={cn(
                  "rounded-xl text-base bg-transparent border border-[#02E2E2] text-[#02E2E2] px-4 py-3",
                  showRegister && "bg-[#02E2E2] text-black"
                )}
                variant="outline"
                onClick={() => setShowRegister(true)}
              >
                {jcT("register_button")}
              </Button>
              <Button
                className={cn(
                  "rounded-xl text-base bg-transparent border border-[#02E2E2] text-[#02E2E2] px-4 py-3",
                  !showRegister && "bg-[#02E2E2] text-black"
                )}
                variant="outline"
                onClick={() => setShowRegister(false)}
              >
                {jcT("bind_button")}
              </Button>
            </div>
            
            {showRegister ? (
              <JcRegisterAccount 
                openid={jcLoginData.openId || ""} 
                nickname={jcLoginData.nickName || ""} 
              />
            ) : (
              <JcBindAccount 
                openid={jcLoginData.openId || ""} 
                nickname={jcLoginData.nickName || ""} 
              />
            )}
          </div>
        ) : (
          <JcBindAccount 
            openid={jcLoginData.openId || ""} 
            nickname={jcLoginData.nickName || ""} 
          />
        )}
      </div>
    );
  }

  // Default login UI with JC login button
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-medium mb-8 text-center">{t("title")}</h1>
      {/* 提示未获取到appid */}
      {!appConfig?.data?.ju_coin_appid && (
        <p className="text-sm text-gray-500 mb-6 text-center">
          {t("appid_not_found")}
        </p>
      )}
      
      <Button
        className="w-full h-14 rounded-2xl text-base bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black mt-6"
        onClick={redirectToJcAuth}
        disabled={isPending || !appConfig?.data.ju_coin_appid}
      >
        {isPending ? jcT("login_loading") : jcT("login_button")}
      </Button>
    </div>
  );
}
