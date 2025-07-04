"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
interface DashboardHeaderProps {
  email: string | undefined;
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleRoute() {
    if (pathname === "/dashboard" || pathname === "/ieo") {
      router.push("/profile");
    } else {
      router.push("/");
    }
  }

  function handleGoHome() {
    window.location.href = "https://www.heavenhk.com/";
  }
  return (
    <header className="flex items-center justify-between p-4 gap-4 backdrop-blur-lg bg-[#ffffff10] border-[#ffffff30] border-b">
      <div className="flex items-center gap-2" onClick={handleGoHome}>
        <Image
          src="/logo.svg"
          alt="HeavenHK Logo"
          width={40}
          height={40}
          className="w-8 h-8"
        />
      </div>
      {email && (
        <div className="flex items-center gap-">
          <span className="px-4 py-2 rounded-full bg-[#ffffff10] text-white text-sm">
            {email}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-black ml-2 bg-[#02E2E2]"
            onClick={handleRoute}
          >
            <X size={24} />
          </Button>
        </div>
      )}
    </header>
  );
}
