"use client";

import Button from "src/_components/Button";
import { CardButton } from "src/components/common/CardButton";
import { Badge } from "src/components/common/Badge";
import Image from "next/image";
import DragonImage from "src/assets/images/dragon.png";
import { CoinIcon, CalendarIcon, BulbIcon, LogoIcon } from "src/components/common/Icons";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-5 min-h-screen">
      <div className="pt-5 pb-3 border-b bg-white px-5">
        <LogoIcon />
      </div>
      <section className="py-6 px-5 rounded-b-2xl bg-white">
        <div className="pb-6 flex flex-col gap-1">
          <p className="title-xs text-gray-50">2월 3주차 저축 도전 중🔥 </p>
          <p className="heading-sm text-gray-80">도롱이 님, 오늘도 함께 모아용!</p>
        </div>
        <div className="flex gap-4 justify-between items-center pb-4">
          <div className="flex-1 text-center">
            <p className="label-sm text-gray-70">이번주목표 5만원</p>
            <div>그래프</div>
          </div>
          <div className="flex-1">
            <div className="p-1 ">
              <CoinIcon />
            </div>
            <p className="caption-md text-gray-70">누적 저축 금액</p>
            <p className="title-sm text-gray-80">1,000,000원</p>
          </div>
        </div>
        <Button.Icon className="w-full"> 바로 저축 인증하기</Button.Icon>
      </section>

      <section className="p-5  flex flex-col gap-4">
        <div className="flex gap-3">
          <CardButton
            title={`출석체크를\n완료했어요!`}
            subTitle="출석체크 확인하기"
            icon={<CalendarIcon />}
            className="flex-1"
          />
          <CardButton
            title={`오늘의 금융지식이\n도착했어요!`}
            subTitle="퀴즈 풀러가기"
            icon={<BulbIcon />}
            className="flex-1"
          />
        </div>

        <div className="shadow-card-shadow bg-white px-5 h-[140px] rounded-2xl  flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-1 pb-3">
              <p className="label-sm gray-50">
                리그 종료까지 <span className="text-green-60">3일</span>남았어요!
              </p>
              <p className="title-sm text-gray-90">아기용 리그 진행 중</p>
            </div>
            <div className="flex gap-1">
              <Badge variant="primary">승급가능</Badge>
              <Badge variant="gray">상위 5%</Badge>
            </div>
          </div>
          <div>
            <Image src={DragonImage} alt="용" width={94} height={104} />
          </div>
        </div>
      </section>
    </div>
  );
}
