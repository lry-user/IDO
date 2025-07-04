"use client";

import { Drawer } from "vaul";
import QRTemplate from "./qr-template";
import { QrCode } from "lucide-react";

interface QRCodeModalProps {
  code: string;
  url: string;
}

export default function QRCodeModal({ code, url }: QRCodeModalProps) {
  
  return (
    <Drawer.Root>
      <Drawer.Trigger className="p-1 hover:scale-110 transition-transform duration-200 active:scale-95">
        <QrCode className="w-5 h-5 text-gray-400/60 hover:text-gray-400" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content aria-describedby={undefined} className="h-fit fixed bottom-0 left-0 right-0 outline-none max-w-lg mx-auto">
          <Drawer.Title />
          <QRTemplate code={code} url={url} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
