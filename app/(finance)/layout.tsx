"use client";
import { HeaderWrapper } from "@/app/(finance)/components/HeaderWrapper";
import { BottomTabsWrapper } from "@/app/(finance)/components/BottomTabsWrapper";
import { usePathname } from "next/navigation";

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col min-h-screen text-white relative">
      <div className="relative z-1 flex flex-col min-h-screen" style={{ background: !pathname?.startsWith('/game') ? 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)' : '#29033B' }}>
        <HeaderWrapper />
        <div className="flex-1 px-4 pb-20">
          {children}
        </div>
        <BottomTabsWrapper />
      </div>
    </div>
  );
}
