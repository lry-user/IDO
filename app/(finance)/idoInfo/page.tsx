"use client";
import "./index.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

// 节点限量配置
const nodeQuotaConfig = {
  patuimn: 5000,
  diamond: 2000,
  super: 10,
};

const Info = () => {
  const router = useRouter();
  return (
    <div
      id="ido-info"
      className="flex flex-col items-center -mx-4 pb-4 px-6 min-h-screen -mb-20"
    >
      {/* <div
        className="text-xl font-bold text-[#59E5E2] flex items-center"
        onClick={() => router.push("/")}
      >
        <Image src={"/images/hi_logo.png"} width={68} height={68} alt="logo" />
        Hi节点 IDO
      </div> */}
      <div className="mt-6 flex items-center flex-col" onClick={() => router.push("/")}>
          <Image src="/images/HIlogo.png" alt="HIlogo" width={150} height={150} />
          <div className="text-[#00FFFB] text-[1rem] mb-2">成为Hi生态节点拥有者</div>
          <div className="text-[0.8125rem]">时间:2025年7月10日 14:00:00 开放</div>
      </div>
      {/* 铂金节点权益 */}
      <div className="mt-7 patuimn-text text-lg font-bold">
      <div className="text-white leading-4 text-left flex items-center">
            <Image
              src="/images/bojin.png"
              alt="bojin"
              width={30}
              height={30}
            />
              <div className="ml-1">
                铂金节点权益
              </div>
          </div>
      </div>
      <div className="my-1 text-xs font-bold text-white">
        限量：{nodeQuotaConfig.patuimn}份
      </div>
      <div className="mt-1 bg-[#18171C] border border-[#707070] rounded-[10px] px-4 py-[14px] w-full flex flex-col ">
        <div className="text-[#59E5E2] text-xs leading-4 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            1
          </span>
          价值200U的JU算力
        </div>
        <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            2
          </span>
          Hi生态嗨起来手续费分红
        </div>
      </div>
      {/* 钻石节点权益 */}
      <div className="mt-5 daimond-text text-lg font-bold">
      <div className="text-white leading-4 text-left flex items-center">
            <Image
              src="/images/zuanshi.png"
              alt="zuanshi"
              width={30}
              height={30}
            />
              <div className="ml-1">
                钻石节点权益
              </div>
          </div>
      </div>
      <div className="my-1 text-xs font-bold text-white">
        限量：{nodeQuotaConfig.diamond}份
      </div>
      <div className="mt-1 bg-[#18171C] border border-[#707070] rounded-[10px] px-4 py-[14px] w-full flex flex-col ">
        <div className="text-[#59E5E2] text-xs leading-4 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            1
          </span>
          价值1000U的JU算力
        </div>
        <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            2
          </span>
          Hi生态嗨起来手续费分红
        </div>
        <div className="text-[#59E5E2] text-xs leading-4 mt-2.5 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            3
          </span>
          嗨起来提现手续费分红
        </div>
      </div>
      {/* 超级节点权益 */}
      <div className="mt-5 super-text text-lg font-bold">
      <div className="text-white leading-4 text-left flex items-center">
          <Image
              src="/images/chaoji.png"
              alt="chaoji"
              width={30}
              height={30}
            />
              <div className="ml-1">
                超级节点权益
              </div>
          </div>
      </div>
      <div className="my-1 text-xs font-bold text-white">
        限量：{nodeQuotaConfig.super}份
      </div>
      <div className="mt-1 bg-[#18171C] border border-[#707070] rounded-[10px] px-4 py-[14px] w-full flex flex-col ">
        <div className="text-[#59E5E2] text-xs leading-4 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            1
          </span>
          价值5000U的JU算力
        </div>
        <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            2
          </span>
          Hi生态嗨起来手续费分红
        </div>
        <div className="text-[#59E5E2] text-xs leading-4 mt-2 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            3
          </span>
          HI DAO基金会分红
        </div>
        <div className="text-[#59E5E2] text-xs leading-4 mt-2.5 flex items-center">
          <span className="w-[13px] h-[13px] ml-1 flex items-center justify-center rounded-full text-[##00FFFB] border border-[#00FFFB] text-xs mr-2">
            4
          </span>
          嗨起来提现手续费分红
        </div>
      </div>
    </div>
  );
};

export default Info;
