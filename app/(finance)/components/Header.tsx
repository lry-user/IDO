"use client";

import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";

export function Header() {
  // const pathname = usePathname();
  // const router = useRouter();

  // function handleRoute() {
  //   if (pathname === "/profile") {
  //     router.push("/");
  //   } else {
  //     router.push("/profile");
  //   }
  // }

  return (
    <header className="flex flex-col p-4 pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/figma/hi-logo.png"
            alt="Hi Logo"
            width={72}
            height={72}
            className="w-16 h-16"
          />
        </div>
        {/* <div 
          className="flex items-center justify-center rounded-full bg-[#ffffff10] backdrop-blur-lg p-1"
          onClick={handleRoute}
        >
          <Image
            src="/images/figma/people-icon.svg"
            alt="Profile"
            width={24}
            height={24}
            className="text-[#00F6F6] stroke-[#00F6F6]"
          />
        </div> */}
      </div>
    </header>
  );
}
