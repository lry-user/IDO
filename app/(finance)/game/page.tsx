"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useState } from "react";
import { FinanceCarousel } from "../components/FinanceCarousel";
import { CarouselIndicators } from "../components/CarouselIndicators";


export default function GamePage() {
  const t = useTranslations('finance');
  const [showWechatModal, setShowWechatModal] = useState(false);

  const sections = [
    {
      title: t('game.sections.ido'),
      icon: '/icons/ido.svg',
      images: [
        {
          url: '/images/ido.png',
          link: '/home?hi_token='
        }
      ]
    },
    {
      title: t('game.sections.game'),
      icon: '/icons/game.svg',
      images: [
        {
          url: '/images/hi.png',
          link: '/home?hi_token='
        }
      ],
    },
    {
      title: t('game.sections.social'),
      icon: '/icons/social.svg',
      images: [],
    },
  ];

  // 处理游戏图片点击事件
  const handleGameClick = () => {
    // 显示统一的提示"敬请期待"
    toast.info(t('stay_tuned'));
  };

  // 处理微信点击事件
  const handleWechatClick = () => {
    setShowWechatModal(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setShowWechatModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-6">
      {/* 顶部 Banner 区域 */}
      <div className="w-[calc(100%+2rem)] relative">
        {/* <div className="pt-[8px] pb-[18px] px-[10px]"> */}
        <FinanceCarousel pageType="game" />
      </div>
      {/* 客户端组件处理轮播图indicators */}
      <div className="pb-[18px]" >
        <CarouselIndicators pageType="game"/>
      </div>

      {/* 循环渲染区块 */}
      {sections.map(section => (
        <div key={section.title} className="w-full px-[10px] mb-2">
          <div className="flex items-center gap-2 mb-2">
            <Image src={section.icon} alt={section.title} width={30} height={30} />
            <span className="text-[#fff] font-bold">{section.title}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {section.images.map((image, index) => (
              <div 
                key={index} 
                className=" rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleGameClick}
              >
                <Image src={image.url} alt={`${section.title}-${index}`} width={160} height={95} className="w-full h-[107px]" />
              </div>
            ))}
            <div className="rounded-xl flex items-center justify-center h-[107px] text-[#FFFFFF] text-sm relative">
              <Image 
                src="/images/jqqd1.png" 
                alt="tribe" 
                fill 
              />
              {/* <div className="absolute inset-0 bg-white opacity-30 z-5"></div> */}
              {/* <div className="relative z-10 text-[#FFFFFF] text-sm">{t('stay_tuned')}…</div> */}
            </div>
          </div>
        </div>
      ))}

      {/* Contact Us 区域 */}
      <div className="w-full px-[10px] mt-2">
        <div className="flex items-center gap-2 mb-2">
          <Image src="/icons/tg.svg" alt="contact" width={30} height={30} />
          <span className="text-[#fff] font-bold">{t('contact_us')}</span>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div 
              className="flex items-center justify-center gap-2 bg-[#4E295F] rounded-[12px] px-2 py-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                window.open('https://qun.qq.com/universal-share/share?ac=1&authKey=SRsx6UZK%2BTE1Q4wwHTCEyHO7vBXXrYslIayqop5T6xagT31pyJ5p1CimOEIm9P42&busi_data=eyJncm91cENvZGUiOiIxMDE0NDUzOTI3IiwidG9rZW4iOiJwbnZadU8xbzF3Ry9QcE43V2p4bWkzUHQ4cndJTG0wWVkrQzh3anJVYnlEMnBScm9XN1VBM1NIREprdnBVZ0k1IiwidWluIjoiMTY2MjI3MzA0NyJ9&data=OxWr_QjuTDSbJmIFymfMsPM-lYkpv3jUFwarTRFeOjYJFJA5QgAu_wYMz6H1Mqx8qnVRNz6Ch_T2wP1dhEQZLQ&svctype=4&tempid=h5_group_info', '_blank');
              }}
            >
              <Image 
                src="/icons/qq.svg" 
                alt="qq" 
                width={22} 
                height={22} 
                onError={(e) => {
                  console.error('Failed to load qq icon');
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-[#C1C6FF]">
                {t('game.hi_ecosystem_group')}
              </div>
              {/* <input className="bg-transparent text-white text-xs flex-1 border-none outline-none" placeholder="" readOnly /> */}
            </div>
            <div 
              className="flex items-center justify-center gap-2 bg-[#4E295F] rounded-[12px] px-2 py-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleWechatClick}
            >
              <Image 
                src="/icons/wechat.svg" 
                alt="wechat" 
                width={22} 
                height={22} 
                onError={(e) => {
                  console.error('Failed to load wechat icon');
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-[#C1C6FF]">
                {t('game.contact_service')}
              </div>
              {/* <input className="bg-transparent text-white text-xs flex-1 border-none outline-none" placeholder="" readOnly /> */}
            </div>
          </div>
        </div>
      </div>

      {/* 微信弹窗 */}
      {showWechatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('wechat_modal.title')}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="/images/hiwechat.jpg" 
                  alt={t('wechat_modal.title')} 
                  width={200} 
                  height={200} 
                  className="rounded-lg"
                />
              </div>
              <p className="text-center text-gray-600 mt-4 text-sm">
                {t('wechat_modal.scan_prompt')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}