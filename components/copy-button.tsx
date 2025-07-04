"use client";

import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const t = useTranslations("common");
  const handleCopy = async () => {
    try {
      // Try the modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success(t("copySuccess"));
        return;
      }
    } catch {
      // Fallback for browsers that don't support clipboard API (especially on Android)
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        toast.success(t("copySuccess"));
      } else {
        toast.error(t("copyFailed"));
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:scale-110 transition-transform duration-200 bg-transparent active:scale-95"
    >
      <Copy className="w-5 h-5 text-gray-400/60 hover:text-gray-400" />
    </button>
  );
}
