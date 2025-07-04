"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home } from "lucide-react";

export function IncomeTabs() {
  const t = useTranslations("finance");
  const pathname = usePathname();

  const isPathActive = (basePath: string) => {
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  return (
    <div className="px-4 mb-6">
      <div className="flex w-full bg-transparent gap-2 border-b border-[#ffffff30] p-0">
        <Link 
          href="/" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 mr-6 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.universe")}
        </Link>
        <Link 
          href="/personal" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 mr-6 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/personal") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.personal")}
        </Link>
        <Link 
          href="/team" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 mr-6 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/team") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.team")}
        </Link>
        <Link 
          href="/chart" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/chart") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.chart")}
        </Link>
      </div>
    </div>
  );
}

export function BottomTabs() {
  const pathname = usePathname();
  const t = useTranslations("finance");

  const isPathActive = (basePath: string) => {
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  return (
    <div className="bg-[#ffffff10] border-t border-[#02E2E2] px-4 py-2 mx-auto mb-[1.2rem] rounded-[20px]" style={{ width: 'calc(100% - 2.2rem)',boxShadow:
    "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
  backdropFilter: "blur(10px)", }}>
      <div className="flex justify-around items-center">
        <Link href="/" prefetch className="flex flex-col items-center">
          <Home 
            size={22} 
            className={cn(
              "mb-1",
              isPathActive("/") ? "text-[#00F6F6]" : "text-white"
            )}
          />
          <span 
            className={cn(
              "text-[10px]",
              isPathActive("/") ? "text-[#00F6F6]" : "text-white"
            )}
          >
            {t("title.universe")}
          </span>
        </Link>
        
        <Link href="/earn" prefetch className="flex flex-col items-center">
          <svg 
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "mb-1",
              isPathActive("/earn") ? "stroke-[#00F6F6]" : "stroke-white"
            )}>
            <path d="M1.7618 13.2194C2.52295 13.9812 3.74885 13.9812 6.2 13.9812H8.8C11.2511 13.9812 12.477 13.9812 13.2382 13.2194C13.9993 12.4576 14 11.2324 14 8.7812C14 8.0207 14 7.3785 13.9772 6.8312M13.2382 4.343C12.477 3.5812 11.2511 3.5812 8.8 3.5812H6.2C3.74885 3.5812 2.52295 3.5812 1.7618 4.343C1.00065 5.1048 1 6.33005 1 8.7812C1 9.5417 1 10.1839 1.02275 10.7312M7.5 0.981201C8.7259 0.981201 9.3382 0.981201 9.7191 1.3621C10.1 1.743 10.1 2.3553 10.1 3.5812M5.2809 1.3621C4.9 1.743 4.9 2.3553 4.9 3.5812M7.5 10.9477C8.21825 10.9477 8.8 10.4628 8.8 9.86475C8.8 9.26675 8.21825 8.7812 7.5 8.7812C6.78175 8.7812 6.2 8.2963 6.2 7.69765C6.2 7.09965 6.78175 6.61475 7.5 6.61475M7.5 10.9477C6.78175 10.9477 6.2 10.4628 6.2 9.86475M7.5 10.9477V11.3812M7.5 6.61475V6.1812M7.5 6.61475C8.21825 6.61475 8.8 7.09965 8.8 7.69765" stroke-linecap="round"/>
          </svg>
          <span 
            className={cn(
              "text-[10px]",
              isPathActive("/earn") ? "text-[#00F6F6]" : "text-white"
            )}
          >
            {t("title.earn")}
          </span>
        </Link>

        {/* /personal */}
        {/* /team */}
        {/* /chart */}
        <Link href="/game" prefetch className="flex flex-col items-center">
          {/* <Users 
            size={22} 
            className={cn(
              "mb-1",
              isPathActive("/team") ? "text-[#00F6F6]" : "text-white"
            )}
          /> */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "mb-1",
              isPathActive("/game") ? "stroke-[#00F6F6]" : "stroke-white"
            )}
          >
            <path d="M7.5 7.4812L7.4961 7.4851M14 7.4812C14 3.89125 11.0899 0.981201 7.5 0.981201C3.91005 0.981201 1 3.89125 1 7.4812C1 11.0712 3.91005 13.9812 7.5 13.9812C11.0899 13.9812 14 11.0712 14 7.4812ZM7.76065 5.0749L9.65865 4.44245C10.2346 4.25005 10.5232 4.1545 10.6753 4.30595C10.8267 4.45805 10.7311 4.746 10.5387 5.32255L9.9063 7.22055C9.57935 8.20205 9.41555 8.6928 9.06325 9.04445C8.7116 9.39675 8.22085 9.56055 7.23935 9.8875L5.34135 10.52C4.7648 10.7124 4.47685 10.8086 4.32475 10.6565C4.17265 10.5044 4.26885 10.2158 4.46125 9.63985L5.0937 7.74185C5.42065 6.76035 5.58445 6.2696 5.93675 5.91795C6.2884 5.56565 6.77915 5.40185 7.76065 5.0749Z" stroke-linecap="round" />
          </svg>
          <span 
            className={cn(
              "text-[10px]",
              isPathActive("/game") ? "text-[#00F6F6]" : "text-white"
            )}
          >
            {t("title.hieco")}
          </span>
        </Link>
        
        <Link href="/profile" prefetch className="flex flex-col items-center">
          {/* <BarChart3 
            size={22} 
            className={cn(
              "mb-1",
              isPathActive("/chart") ? "text-[#00F6F6]" : "text-white"
            )}
          /> */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "mb-1",
              isPathActive("/profile") ? "stroke-[#00F6F6]" : "stroke-white"
            )}
          >
              <path d="M7.5 6.03676C7.83195 6.03676 8.16065 5.97137 8.46734 5.84434C8.77402 5.71731 9.05268 5.53111 9.28741 5.29639C9.52214 5.06166 9.70833 4.783 9.83536 4.47632C9.9624 4.16963 10.0278 3.84093 10.0278 3.50898C10.0278 3.17703 9.9624 2.84832 9.83536 2.54164C9.70833 2.23496 9.52214 1.9563 9.28741 1.72157C9.05268 1.48684 8.77402 1.30065 8.46734 1.17362C8.16065 1.04658 7.83195 0.981201 7.5 0.981201C6.82959 0.981201 6.18664 1.24752 5.71259 1.72157C5.23854 2.19562 4.97222 2.83857 4.97222 3.50898C4.97222 4.17939 5.23854 4.82234 5.71259 5.29639C6.18664 5.77044 6.82959 6.03676 7.5 6.03676ZM1 13.5479V13.9812H14V13.5479C14 11.9301 14 11.1212 13.6851 10.503C13.4081 9.95942 12.9662 9.5175 12.4227 9.24054C11.8044 8.92565 10.9956 8.92565 9.37778 8.92565H5.62222C4.00444 8.92565 3.19556 8.92565 2.57733 9.24054C2.03378 9.5175 1.59185 9.95942 1.31489 10.503C1 11.1212 1 11.9301 1 13.5479Z" stroke-linecap="round"/>
          </svg>

          <span 
            className={cn(
              "text-[10px]",
              isPathActive("/profile") ? "text-[#00F6F6]" : "text-white"
            )}
          >
            {t("title.mine")}
          </span>
        </Link>
      </div>
    </div>
  );
} 