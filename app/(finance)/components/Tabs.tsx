"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";


export function IncomeTabs() {
  const t = useTranslations("finance");
  const pathname = usePathname();

  const isPathActive = (basePath: string) => {
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  return (
    <div className="px-4 mb-6">
      <div className="flex w-full bg-transparent gap-2 border-b border-[#ffffff30] p-0">
        <Link 
          href="/" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 mr-6 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.universe")}
        </Link>
        <Link 
          href="/personal" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 mr-6 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/personal") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.personal")}
        </Link>
        <Link 
          href="/team" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 mr-6 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/team") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.team")}
        </Link>
        <Link 
          href="/chart" 
          prefetch
          className={cn(
            "rounded-none pb-2 px-0 border-b-2 bg-transparent hover:text-gray-100 transition-colors",
            isPathActive("/chart") ? "border-[#00F6F6] text-[#00F6F6]" : "border-transparent text-gray-300"
          )}
        >
          {t("title.chart")}
        </Link>
      </div>
    </div>
  );
}

export function BottomTabs() {
  const pathname = usePathname();
  const t = useTranslations("finance");

  const isPathActive = (basePath: string) => {
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  return (
    <div className="bg-[#ffffff10] border-t border-[#02E2E2] px-4 py-2 mx-auto mb-[1.2rem] rounded-[20px]" style={{ width: 'calc(100% - 2.2rem)',boxShadow:
    "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
  backdropFilter: "blur(10px)", }}>
      <div className="flex justify-around items-center">
        <Link href="/" prefetch className="flex flex-col items-center">
        {isPathActive("/") ? (
          <Image src="/images/homeido_action.png" alt="homeido_action" width={28} height={28} />
        ) : (
          <Image src="/images/homeido.png" alt="homeido" width={28} height={28} />
        )}
          <span 
            className={cn(
              "text-[12px]",
              isPathActive("/") ? "text-[#00F6F6]" : "text-white"
            )}
          >
            {t("title.universe")}
          </span>
        </Link>
        
        <Link href="/profile" prefetch className="flex flex-col items-center">
          {isPathActive("/profile") ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 56 56">
              <defs>
                <style>{`
                  .a{fill:none;}
                  .b{fill:#fac600;}
                  .c{fill:#9ff;}
                  .d{fill:#1e81ce;}
                  .e{fill:#0082aa;}
                `}</style>
              </defs>
              <g transform="translate(-273.633 -457.633)">
                <rect className="a" width="56" height="56" transform="translate(273.633 457.633)"/>
                <g transform="translate(267.415 445.019)">
                  <g transform="translate(9.631 16.519)">
                    <g transform="translate(14.752 0)">
                      <g transform="translate(5.901 5.901)">
                        <path className="b" d="M44.884,19.967h-5.9a.983.983,0,0,1,0-1.967h5.9a.983.983,0,0,1,0,1.967Z" transform="translate(-38 -18)"/>
                      </g>
                      <g transform="translate(5.639 0)">
                        <path className="c" d="M43.9,17.9l1.9-2.843A1.967,1.967,0,0,0,44.155,12H39.7a1.967,1.967,0,0,0-1.636,3.058l1.9,2.843Z" transform="translate(-37.734 -12)"/>
                      </g>
                      <g transform="translate(0 7.868)">
                        <path className="c" d="M49.7,39.669H33.967A1.966,1.966,0,0,1,32,37.7V27.868A7.868,7.868,0,0,1,39.868,20H43.8a7.868,7.868,0,0,1,7.868,7.868V37.7A1.966,1.966,0,0,1,49.7,39.669Z" transform="translate(-32 -20)"/>
                      </g>
                    </g>
                    <g transform="translate(0 30.487)">
                      <g transform="translate(0 0)">
                        <g transform="translate(0 1.967)">
                          <path className="d" d="M13.835,44H5.967A1.966,1.966,0,0,0,4,45.967v11.8a1.966,1.966,0,0,0,1.967,1.967h7.868A1.966,1.966,0,0,0,15.8,57.768v-11.8A1.966,1.966,0,0,0,13.835,44Z" transform="translate(-4 -44)"/>
                        </g>
                        <g transform="translate(4.138 10.289)">
                          <circle className="e" cx="2.152" cy="2.152" r="2.152" transform="translate(0 0)"/>
                        </g>
                        <g transform="translate(4.138 9.213)">
                          <circle className="c" cx="2.152" cy="2.152" r="2.152" transform="translate(0 0)"/>
                        </g>
                        <g transform="translate(11.801)">
                          <path className="c" d="M50.421,42.983a2.941,2.941,0,0,0-2.086.864l-7.988,7.987H36.653a2.95,2.95,0,1,0,0-5.9H31.735l-1.63-1.63A7.868,7.868,0,0,0,24.542,42h-1.35a7.868,7.868,0,0,0-5.563,2.3L16,45.934v11.8H41.57a2.942,2.942,0,0,0,2.087-.864l8.85-8.85a2.951,2.951,0,0,0-2.086-5.037Z" transform="translate(-16 -42)"/>
                        </g>
                      </g>
                      <g transform="translate(23.603 9.835)">
                        <path className="d" d="M28.492,52a.492.492,0,0,0,0,.983h8.359A3.9,3.9,0,0,0,39.426,52Z" transform="translate(-28 -52)"/>
                      </g>
                    </g>
                    <path className="d" d="M43.851,29.469,40.639,28.4a.98.98,0,0,1-.672-.932v-.55a.984.984,0,0,1,.983-.983h1.967a.984.984,0,0,1,.983.983.983.983,0,1,0,1.967,0,2.954,2.954,0,0,0-2.95-2.95v-.983a.983.983,0,0,0-1.967,0v.983A2.954,2.954,0,0,0,38,26.917v.55a2.947,2.947,0,0,0,2.017,2.8l3.212,1.07a.98.98,0,0,1,.672.932v.55a.984.984,0,0,1-.983.983H40.95a.984.984,0,0,1-.983-.983.983.983,0,0,0-1.967,0,2.954,2.954,0,0,0,2.95,2.95v.983a.983.983,0,0,0,1.967,0v-.983a2.954,2.954,0,0,0,2.95-2.95v-.55A2.947,2.947,0,0,0,43.851,29.469Z" transform="translate(-17.347 -12.165)"/>
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 56 56">
              <defs>
                <style>{`
                  .a{fill:none;}
                  .b{fill:#646b71;}
                  .c{fill:#c9c9c9;}
                  .d{fill:#969696;}
                  .e{fill:#d8d8d8;}
                  .f{fill:#848484;}
                `}</style>
              </defs>
              <g transform="translate(-273.633 -457.633)">
                <rect className="a" width="56" height="56" transform="translate(273.633 457.633)"/>
                <g transform="translate(267.415 445.019)">
                  <g transform="translate(9.631 16.519)">
                    <g transform="translate(14.752 0)">
                      <g transform="translate(5.901 5.901)">
                        <path className="b" d="M44.884,19.967h-5.9a.983.983,0,0,1,0-1.967h5.9a.983.983,0,0,1,0,1.967Z" transform="translate(-38 -18)"/>
                      </g>
                      <g transform="translate(5.639 0)">
                        <path className="c" d="M43.9,17.9l1.9-2.843A1.967,1.967,0,0,0,44.155,12H39.7a1.967,1.967,0,0,0-1.636,3.058l1.9,2.843Z" transform="translate(-37.734 -12)"/>
                      </g>
                      <g transform="translate(0 7.868)">
                        <path className="c" d="M49.7,39.669H33.967A1.966,1.966,0,0,1,32,37.7V27.868A7.868,7.868,0,0,1,39.868,20H43.8a7.868,7.868,0,0,1,7.868,7.868V37.7A1.966,1.966,0,0,1,49.7,39.669Z" transform="translate(-32 -20)"/>
                      </g>
                    </g>
                    <g transform="translate(0 30.487)">
                      <g transform="translate(0 0)">
                        <g transform="translate(0 1.967)">
                          <path className="d" d="M13.835,44H5.967A1.966,1.966,0,0,0,4,45.967v11.8a1.966,1.966,0,0,0,1.967,1.967h7.868A1.966,1.966,0,0,0,15.8,57.768v-11.8A1.966,1.966,0,0,0,13.835,44Z" transform="translate(-4 -44)"/>
                        </g>
                        <g transform="translate(4.138 10.289)">
                          <circle className="d" cx="2.152" cy="2.152" r="2.152" transform="translate(0 0)"/>
                        </g>
                        <g transform="translate(4.138 9.213)">
                          <circle className="e" cx="2.152" cy="2.152" r="2.152" transform="translate(0 0)"/>
                        </g>
                        <g transform="translate(11.801)">
                          <path className="c" d="M50.421,42.983a2.941,2.941,0,0,0-2.086.864l-7.988,7.987H36.653a2.95,2.95,0,1,0,0-5.9H31.735l-1.63-1.63A7.868,7.868,0,0,0,24.542,42h-1.35a7.868,7.868,0,0,0-5.563,2.3L16,45.934v11.8H41.57a2.942,2.942,0,0,0,2.087-.864l8.85-8.85a2.951,2.951,0,0,0-2.086-5.037Z" transform="translate(-16 -42)"/>
                        </g>
                      </g>
                      <g transform="translate(23.603 9.835)">
                        <path className="f" d="M28.492,52a.492.492,0,0,0,0,.983h8.359A3.9,3.9,0,0,0,39.426,52Z" transform="translate(-28 -52)"/>
                      </g>
                    </g>
                    <path className="f" d="M43.851,29.469,40.639,28.4a.98.98,0,0,1-.672-.932v-.55a.984.984,0,0,1,.983-.983h1.967a.984.984,0,0,1,.983.983.983.983,0,1,0,1.967,0,2.954,2.954,0,0,0-2.95-2.95v-.983a.983.983,0,0,0-1.967,0v.983A2.954,2.954,0,0,0,38,26.917v.55a2.947,2.947,0,0,0,2.017,2.8l3.212,1.07a.98.98,0,0,1,.672.932v.55a.984.984,0,0,1-.983.983H40.95a.984.984,0,0,1-.983-.983.983.983,0,0,0-1.967,0,2.954,2.954,0,0,0,2.95,2.95v.983a.983.983,0,0,0,1.967,0v-.983a2.954,2.954,0,0,0,2.95-2.95v-.55A2.947,2.947,0,0,0,43.851,29.469Z" transform="translate(-17.347 -12.165)"/>
                  </g>
                </g>
              </g>
            </svg>
          )}
          <span 
            className={cn(
              "text-[12px]",
              isPathActive("/profile") ? "text-[#00F6F6]" : "text-white"
            )}
          >
            {t("title.mine")}
          </span>
        </Link>
      </div>
    </div>
  );
} 