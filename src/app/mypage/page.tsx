"use client";

import { CalendarIcon, FlameIcon, MedalIcon, CoinIcon } from "src/components/common/Icons";
import { StatCard } from "./_components/StatCard";
import { MenuItem } from "./_components/MenuItem";
import { BottomNav } from "../../_components/BottomNav";

const stats = [
  {
    icon: <CalendarIcon />,
    label: "연속 출석일",
    value: 18,
    unit: "일",
    iconColor: "text-green-600",
  },
  {
    icon: <FlameIcon />,
    label: "최대 연속 출석일",
    value: 53,
    unit: "일",

    valueColor: "text-danger",
  },
  {
    icon: <CoinIcon />,
    label: "누적 저축 금액",
    value: "1,000,000",
    unit: "원",
    valueColor: "text-gray-80",
  },
  {
    icon: <MedalIcon />,
    label: "현재 리그",
    value: "아기용",
    valueColor: "text-gray-80",
  },
];

const memberMenus = [
  { href: "/myinfo", label: "나의 정보 수정" },
  { href: "/stats", label: "내 통장 수정" },
];

const serviceMenus = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export default function MyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div>
        <div className="flex-1 bg-[#F4F5F6] rounded-b-2xl">
          <h1 className="title-sm py-3 px-5 border-b border-bray-10">마이페이지</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 px-5 py-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Menu Lists */}
        <div className="flex flex-col px-5 pt-5">
          <section>
            <h2 className="title-xs text-gray-50 mb-3">회원 정보 수정</h2>
            {memberMenus.map((menu, index) => (
              <MenuItem key={index} {...menu} />
            ))}
          </section>

          <section className="mt-8">
            <h2 className="title-xs text-gray-50 mb-3">서비스 이용 안내</h2>
            {serviceMenus.map((menu, index) => (
              <MenuItem key={index} {...menu} />
            ))}
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
