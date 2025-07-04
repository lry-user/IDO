"use client";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        <SessionProvider>
          <HeroUIProvider>{children}</HeroUIProvider>
        </SessionProvider>
        <Toaster richColors position="top-center" />
      </NuqsAdapter>
    </TRPCReactProvider>
  );
}
