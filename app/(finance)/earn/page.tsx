"use client";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { api } from "@/trpc/react";
import { bignumber } from "@/utils/bignumber";

export default function EarnPage() {
  const router = useRouter();
  const t = useTranslations("finance.earn");
  
  // 获取chart页面的数据
  const { data: chartData } = api.finance.getEarningsGraph.useQuery();
  
  // 获取personal页面的数据
  const { data: personalData } = api.finance.getPersonalEarnings.useQuery();
  
  // 获取team页面的数据
  const { data: teamData } = api.finance.getTeamEarnings.useQuery();
  
  // 计算个人收益总额（burn + stake的expected_total）
  const burnExpectedTotal = bignumber(personalData?.data?.burn?.expected_total || 0);
  const stakeExpectedTotal = bignumber(personalData?.data?.stake?.expected_total || 0);
  const personalTotalEarnings = burnExpectedTotal.plus(stakeExpectedTotal);
  
  // 计算团队收益总额（direct + team的claimed_amount）
  const directClaimedAmount = bignumber(teamData?.data?.direct?.claimed_amount || 0);
  const teamClaimedAmount = bignumber(teamData?.data?.team?.claimed_amount || 0);
  const teamTotalEarnings = directClaimedAmount.plus(teamClaimedAmount);
  
  const cards = [
    {
      title: t("total_earnings"),
      amount: `${bignumber(chartData?.data?.total_earned || 0).toFixed(2)} Hi`,
      img: "/images/figma/eaen-hi.png",
      imgAlt: "Hi Logo",
      link: "/chart",
      width: 277,
      height: 277,
      right: -40,
      bottom: -34,
      opacity: 0.2
    },
    {
      title: t("personal_earnings"),
      amount: `${personalTotalEarnings.toFixed(2)} Hi`,
      img: "/images/figma/earn-personal.png",
      imgAlt: "Gift Box",
      link: "/personal",
      width: 130,
      height: 130,
      right: -11,
      bottom: 10,
      opacity: 1
    },
    {
      title: t("team_earnings"),
      amount: `${teamTotalEarnings.toFixed(2)} Hi`,
      img: "/images/figma/earn-team.png",
      imgAlt: "Coins",
      link: "/team",
      width: 125,
      height: 125,
      right: -4,
      bottom: 8,
      opacity: 1
    }
  ];

  return (
    <>
      <div className="flex flex-col gap-8 pt-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="h-[11.2rem] relative rounded-2xl bg-[#ffffff1a] px-4 pt-5 pb-6 overflow-hidden"
            style={{
              boxShadow:
                "inset 0px 0px 4.7px 0px rgba(255, 255, 255, 0.17), inset 0px 1px 0px 0px rgba(2, 226, 226, 0.7)",
              backdropFilter: "blur(10px)",
              height: !index ? '14rem' : ''
            }}
          >
            <div className="flex items-center">
                {/* <div
                  className="inline-block p-[1px] rounded-[6px]"
                  style={{
                    background: 'conic-gradient(from 193.98deg at 68.48% -29.73%, rgba(0, 0, 0, 0) -119.79deg, #00F6F6 46.7deg, rgba(0, 0, 0, 0) 240.21deg, #00F6F6 406.7deg)'
                  }}
                >
                  <span className="block rounded-[6px] px-4 py-1 text-white text-lg font-bold bg-[#23232A]">
                    {card.title}
                  </span>
                </div> */}
                {/* <div
                  className="inline-block p-[1px] rounded-[6px]"
                  style={{
                    background: 'linear-gradient(90deg, #00F6F6 0%, rgba(0,246,246,0.25) 60%, rgba(0,246,246,0.10) 100%)'
                  }}
                >
                  <span className="block rounded-[6px] px-4 py-1 text-white text-lg font-bold bg-[#23232A]">
                    {card.title}
                  </span>
                </div> */}
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#00F6F6',
                }}
              >
                {card.amount}
              </span>
            </div>
            <div
              className="inline-block mt-[1rem] p-[1px] rounded-[6px]"
              style={{
                background: 'linear-gradient(90deg, #00F6F6 0%, rgba(0,246,246,0.25) 60%, rgba(0,246,246,0.10) 100%)',
                marginTop: !index ? '1.25rem' : ''
              }}
            >
              <span className="block rounded-[6px] px-6 py-2 text-white text-xl font-bold bg-[#35263d]" style={{ paddingBottom: !index ? '0.75rem' : '',paddingTop: !index ? '0.75rem' : ''}} onClick={() => router.push(card.link)}>
                {card.title}
              </span>
            </div>
            <div
              className="absolute"
              style={{ right: card.right, bottom: card.bottom }}
            >
              <Image src={card.img} alt={card.imgAlt} width={card.width} height={card.height} style={{ opacity: card.opacity }} />
            </div>
            {/* Click to View */}
            <div
              className="absolute right-4 bottom-3 cursor-pointer font-bold"
              style={{
                color: '#00F6F6',
                fontWeight: 700,
                fontSize: '10px',
                textDecoration: 'underline',
                textUnderlineOffset: '5px',
              }}
              onClick={() => router.push(card.link)}
            >
              {t("click_to_view")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
} 