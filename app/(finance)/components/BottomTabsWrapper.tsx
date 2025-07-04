"use client";

import { usePathname } from "next/navigation";
import { BottomTabs } from "./Tabs";

export function BottomTabsWrapper() {
  const pathname = usePathname();
  const shouldShowBottomTabs = !pathname?.startsWith('/chart') && !pathname?.startsWith('/personal') && !pathname?.startsWith('/records')&& !pathname?.startsWith('/record')&& !pathname?.startsWith('/recharge')&& !pathname?.startsWith('/withdraw');

  if (!shouldShowBottomTabs) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <BottomTabs />
    </div>
  );
} 