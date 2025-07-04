import Image from "next/image";

export default function PodiumPage() {
  return (
    <div className="min-h-screen bg-[#1A0E13] flex flex-col items-center pb-6">
      {/* 顶部讲台 Banner 区域 */}
      <div className="w-full relative">
        <Image src="/images/figma/carousel-1.png" alt="podium-banner" width={375} height={160} className="w-full h-[160px] object-cover" />
        <div className="absolute left-4 top-4 text-white text-xl font-bold drop-shadow">讲台</div>
      </div>

      {/* 讲台卡片区块 */}
      <div className="w-full px-4 mt-6">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#2B1B23] rounded-xl overflow-hidden flex flex-col items-center justify-center p-3">
            <Image src="/images/figma/carousel-2.png" alt="podium1" width={120} height={80} className="w-full h-[80px] object-cover rounded" />
            <div className="mt-2 text-white text-sm font-semibold">讲台 1</div>
          </div>
          <div className="bg-[#2B1B23] rounded-xl overflow-hidden flex flex-col items-center justify-center p-3">
            <Image src="/images/figma/carousel-3.png" alt="podium2" width={120} height={80} className="w-full h-[80px] object-cover rounded" />
            <div className="mt-2 text-white text-sm font-semibold">讲台 2</div>
          </div>
          <div className="bg-[#2B1B23] rounded-xl flex items-center justify-center h-[90px] text-[#B6B6B6] text-sm col-span-2">敬请期待…</div>
        </div>
      </div>
    </div>
  );
} 