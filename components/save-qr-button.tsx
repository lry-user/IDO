'use client';

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function SaveQRButton() {
  const t = useTranslations("common");
  
  const handleSave = async () => {
    try {
      const svg = document.querySelector('#svg-qr');
      if (!svg) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const data = new XMLSerializer().serializeToString(svg);
      const DOMURL = window.URL || window.webkitURL || window;

      const img = new Image();
      const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      const url = DOMURL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        const imgURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr.png`;
        link.href = imgURL;
        link.click();
      };

      img.src = url;
    } catch (error) {
      console.error('Failed to save QR code:', error);
    }
  };

  return (
    <Button 
      onClick={handleSave}
      className="w-full bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black font-medium py-6 rounded-xl"
    >
      {t("saveQR")}
    </Button>
  );
}