"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const shouldShowHeader =
    !pathname?.startsWith('/chart') &&
    !pathname?.startsWith('/personal') &&
    !pathname?.startsWith('/team') &&
    !pathname?.startsWith('/game') &&
    !pathname?.startsWith('/ido') &&
    !pathname?.startsWith('/records');

  if (!shouldShowHeader) {
    return null;
  }

  return <Header />;
} 