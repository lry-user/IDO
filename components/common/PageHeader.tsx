"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backUrl?: string;
  extra?: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

export default function PageHeader({
  title,
  backUrl = "/",
  extra,
  position = "left",
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-8", position === "left" && "justify-start", position === "right" && "justify-between", className)}>
      {position === "left" && (
        <Link href={backUrl} className="p-2 rounded-full bg-[#ffffff20] backdrop-blur-md">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      )}
      <h1 className="text-xl font-medium">{title}</h1>
      {extra && <div className="ml-auto">{extra}</div>}
      {position === "right" && (
        <Link href={backUrl} className="p-2 rounded-full bg-[#ffffff20] backdrop-blur-md">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
}
