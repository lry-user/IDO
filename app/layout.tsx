import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Injection } from "@/app/(finance)/components/Injection";
import FeedbackButton from "@/components/feedback-button";
export const metadata: Metadata = {
  title: "Heaven",
  description: "Heaven",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html className="dark">
      <body>
      <div className="fixed inset-x-0 bottom-0 h-1/3 from-[#F60004] to-transparent opacity-30 pointer-events-none" style={{ background: 'linear-gradient(342.46deg, #2F0061 0%, #120015 50.68%, #240022 72.43%, #550781 100%)'}}></div>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children} <Injection />
            <FeedbackButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
