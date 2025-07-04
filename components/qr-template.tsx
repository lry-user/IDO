import Image from "next/image";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useToPng } from "@hugocxl/react-to-image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function QRTemplate({
  code,
  url,
}: {
  code: string;
  url: string;
}) {
  const t = useTranslations("invite");
  const [imageData, setImageData] = useState<string | null>(null);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if user is on Android
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(userAgent.indexOf("android") > -1);
  }, []);

  const [state, convertToPng, qrTemplateRef] = useToPng<HTMLDivElement>({
    canvasWidth: 500,
    pixelRatio: 2,
    onSuccess: (data) => {
      // For desktop browsers
      if (!isAndroid) {
        const downloadLink = document.createElement("a");
        downloadLink.href = data;
        downloadLink.download = `qr-code-${code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        // For Android devices, store the image data
        setImageData(data);
        // Open in new tab for Android
        window.open(data, "_blank");
      }
    },
    onError: (error) => {
      console.error("Error generating image:", error);
      toast.error(t("error"));
    },
  });

  return (
    <div>
      <div
        className="bg-black text-white flex flex-col items-center"
        ref={qrTemplateRef}
      >
        {/* Phone Image Section */}

        {!imageData && (
          <div>
            <div className="w-full max-w-md mx-auto flex justify-center items-center">
              <Image
                src="/images/qr-bg.png"
                alt="Cocoon App Demo"
                decoding="sync"
                width={400}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Footer */}
            <div className="w-full max-w-4xl flex justify-between items-center bg-zinc-900 p-4 py-2 rounded-lg">
              <div className="text-left">
                <p className="text-white mb-2">
                  {t("code")}: {code}
                </p>
                <p className="text-gray-500 text-sm">{t("register")}</p>
              </div>
              {/* QR Code Placeholder */}
              <div className="w-[120px] h-[120px] rounded-sm border-2">
                <QRCodeSVG value={url} size={120} width={120} height={120} />
              </div>
            </div>
          </div>
        )}
        {imageData ? (
          <Image
            src={imageData}
            alt="QR Code"
            decoding="sync"
            width={400}
            height={600}
          />
        ) : null}
      </div>
      <div className="w-full max-w-lg p-4 m-auto bg-black z-20">
        <Button
          className="w-full bg-[#02E2E2] hover:bg-[#02E2E2]/90 text-black font-medium py-6 rounded-xl"
          onClick={convertToPng}
          disabled={state.isLoading}
        >
          {state.isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            t("save_qr")
          )}
        </Button>

        {isAndroid && imageData && (
          <p className="text-white text-center mt-4 text-sm">
            {t("android_save_hint")}
          </p>
        )}
      </div>
    </div>
  );
}
