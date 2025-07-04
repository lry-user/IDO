"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
// import { walletHeader } from "./walletHeader";

import Image from "next/image";

export function HeaderWrapper() {
  const pathname = usePathname();
  const shouldShowHeader =
    !pathname?.startsWith('/chart') &&
    !pathname?.startsWith('/personal') &&
    !pathname?.startsWith('/team') &&
    !pathname?.startsWith('/game') &&
    !pathname?.startsWith('/records');

  if (!shouldShowHeader) {
    return null;
  }
  console.log(pathname?.startsWith('/wallet'))
  if(pathname?.startsWith('/wallet')) {
    return <header className="flex flex-col px-4 pb-0 bg-[#000000]">
    <div className="flex items-center justify-between">
      <div className="h-16 flex items-center">
        <Image
          src="/images/back.png"
          alt="back"
          width={30}
          height={30}
        />
        <h1 className="text-2xl font-medium absolute left-1/2 transform -translate-x-1/2 cursor-default">钱包</h1>
      </div>
    </div>
  </header>;
  }
  if(pathname?.startsWith('/record')) {
    return <header className="flex flex-col px-4 pb-0 bg-[#000000]">
    <div className="flex items-center justify-between">
      <div className="h-16 flex items-center">
        <Image
          src="/images/back.png"
          alt="back"
          width={30}
          height={30}
        />
        <h1 className="text-2xl font-medium absolute left-1/2 transform -translate-x-1/2 cursor-default">记录</h1>
      </div>
    </div>
  </header>;
  }
  if(pathname?.startsWith('/recharge')) {
    return <header className="flex flex-col px-4 pb-0 bg-[#000000]">
    <div className="flex items-center justify-between">
      <div className="h-16 flex items-center">
        <Image
          src="/images/back.png"
          alt="back"
          width={30}
          height={30}
        />
        <h1 className="text-2xl font-medium absolute left-1/2 transform -translate-x-1/2 cursor-default">充值</h1>
      </div>
    </div>
  </header>;
  }
  if(pathname?.startsWith('/withdraw')) {
    return <header className="flex flex-col px-4 pb-0 bg-[#000000]">
    <div className="flex items-center justify-between">
      <div className="h-16 flex items-center">
        <Image
          src="/images/back.png"
          alt="back"
          width={30}
          height={30}
        />
        <h1 className="text-2xl font-medium absolute left-1/2 transform -translate-x-1/2 cursor-default">提现</h1>
      </div>
    </div>
  </header>;
  }
  return <Header />;
} 