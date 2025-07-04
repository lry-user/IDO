"use client";

import { useState, useTransition } from "react";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Drawer } from "vaul";
import { setLocale } from "@/actions/locale";
import { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

const languages = [
  { code: "en-US", name: "English" },
  { code: "zh-TW", name: "繁體中文" },
  { code: "zh-CN", name: "简体中文" },
] as const;

export default function LanguageSelector({showText = true, iconPath}: {showText?: boolean, iconPath?: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("settings");
  const [isPending, startTransition] = useTransition();

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (code: string) => {
    startTransition(() => {
      localStorage.setItem('language', code);
      setLocale(code as Locale);
    });
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between", 
          showText ? "py-8" : "py-6"
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-3">
          {iconPath ? <Image src={iconPath} alt="Language Icon" width={24} height={24} /> : <Image src="/icons/language.svg" alt="Language Icon" width={24} height={24} />}
          {showText && <span className="text-base text-[#FEFEFE]">{t("language")}</span>}
        </div>
        {showText && (
        <div className="flex items-center gap-2">
          <span className="text-base text-[#00F6F6]">
            {currentLanguage.name}
          </span>
          <ChevronRight className="w-5 h-5 text-[#9CA4AB]" />
        </div>
        )}
      </div>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
           <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
           <Drawer.Content
             aria-describedby={undefined}
             className="bg-black/30 backdrop-blur-xl flex flex-col rounded-t-3xl fixed bottom-0 left-0 right-0 z-50 outline-none text-white max-h-[60vh] pt-3 pb-6"
           >
             <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-700 mb-4" />
            <Drawer.Title className="text-2xl font-bold text-center text-white py-4">
                    {t("select_language")}
            </Drawer.Title>

             <div className="overflow-auto flex-1 px-4">
                {languages.map((language, index) => (
                  <div key={language.code}>
                  <div
                      className="flex items-center justify-center text-center py-4 cursor-pointer hover:bg-white/5 rounded-md"
                    onClick={() => handleLanguageChange(language.code)}
                  >
                      <span className="text-lg font-bold text-white flex-1">
                        {language.name}
                      </span>
                    {language.code === locale && (
                        <Image src="/icons/checkmark-yes.png" alt="Selected" width={28} height={28} className="ml-3" />
                    )}
                    </div>
                    {index < languages.length -1 && <hr className="border-white/30" />}    
                  </div>
                ))}
             </div>

             <div className="px-4 pt-4 mt-2 border-t border-white/30">
               <button
                 className="w-full py-3 text-center text-black bg-[#00F6F6] rounded-xl text-lg font-bold active:bg-[#00F6F6]/90"
                 disabled={isPending}
                 onClick={() => setIsOpen(false)}
               >
                 {t("cancel")}
               </button>
             </div>
           </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
