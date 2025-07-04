"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  backUrl?: string;
  extra?: React.ReactNode;
  position?: "left" | "right";
  className?: string;
  titlePosition?: "center" | "left";
}

export default function MyPageHeader({
  title,
  backUrl = "/",
  extra,
  position = "left",
  className,
  titlePosition = "center",
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-8 relative", position === "left" && "justify-start", position === "right" && "justify-between", className)}>
      {position === "left" && (
        <Link href={backUrl}>
          {/* <ArrowLeft className="w-6 h-6" /> */}
          <Image
            src="/icons/profile-refund-back.svg"
            alt="Back"
            width={35}
            height={35}
          />
        </Link>
      )}
      {titlePosition === "center" ? (
        <h1 className="text-2xl font-medium absolute left-1/2 transform -translate-x-1/2 cursor-default">{title}</h1>
      ) : (
        <Link href={backUrl} className="text-2xl font-medium cursor-pointer hover:underline">
          <h1 className="m-0">{title}</h1>
        </Link>
      )}
      {extra && <div className="ml-auto">{extra}</div>}
      {position === "right" && (
        <Link href={backUrl} className="p-2 rounded-full bg-[#ffffff20] backdrop-blur-md">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
}
