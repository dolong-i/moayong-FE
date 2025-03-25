"use client";

import Button from "src/_components/Button";
import { CardButton } from "src/components/common/CardButton";
import { Badge } from "src/components/common/Badge";
import Image from "next/image";
import DragonImage from "src/assets/images/dragon.png";
import { CoinIcon, CalendarIcon, BulbIcon, LogoIcon } from "src/components/common/Icons";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getAttendanceToday,
  getLeague,
  getMatch,
  getSeasonOpen,
  getTotalAmountByUserId,
} from "src/_api/api";
import dayjs from "dayjs";
import { AttendanceResponse, LeagueResponse, MatchResponse, SeasonResponse } from "src/_types/type";
import { useEffect, useState } from "react";
import { SemiCircleProgress } from "src/_components/SemiCircleProgress";
import { BottomNav } from "src/_components/BottomNav";
import { getDaysDiff } from "src/_lib/utils";
import { useAuth } from "src/_hooks/auth";
import { badgeBgColor, badgeTextColor, promotionText } from "src/_lib/rank";

export default function Home() {
  const router = useRouter();
  const [thisMonthSavingRate, setThisMonthSavingRate] = useState(0);
  const [thisWeekSavingGoal, setThisWeekSavingGoal] = useState("");
  const { user } = useAuth();

  // 누적 저축 금액
  const { data: totalSavings } = useQuery({
    queryKey: ["totalSavings"],
    queryFn: () => getTotalAmountByUserId(user?.id),
    enabled: !!user?.id,
  });

  // GET members/{id}/match
  const { data: match, isSuccess: isMatchSuccess } = useQuery<MatchResponse>({
    queryKey: ["match"],
    queryFn: () => getMatch(user?.id),
    enabled: !!user?.id,
  });

  // /seasons
  const { data: seasonOpen, isSuccess: isSeasonOpenSuccess } = useQuery<SeasonResponse>({
    queryKey: ["seasonOpen"],
    queryFn: () => getSeasonOpen(),
    enabled: !!user?.id,
  });

  // getLeague
  const { data: league, refetch: refetchLeague } = useQuery<LeagueResponse>({
    queryKey: ["league"],
    queryFn: () => getLeague(match?.leagueId),
    enabled: !!match?.leagueId,
  });

  const { data: attendanceToday } = useQuery<AttendanceResponse>({
    queryKey: ["attendanceToday"],
    queryFn: () => getAttendanceToday(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isMatchSuccess) {
      refetchLeague();
    }
  }, [match, isMatchSuccess]);

  useEffect(() => {
    calculateThisWeekSavingGoal();
  }, [user, totalSavings]);

  /**
   * 이번주 저축 목표 계산, 달성률 계산
   */
  const calculateThisWeekSavingGoal = () => {
    if (!user) {
      return 0;
    }
    const monthSaving = user?.monthlySalary * (user?.savingsRate * 0.01);
    if (totalSavings > 0) {
      setThisMonthSavingRate(Math.floor((monthSaving / totalSavings) * 100));
    }

    const goal = monthSaving / 4.3;
    const thisWeekSaving =
      goal < 10000 ? `${Math.floor(goal / 1000)}천원` : `${Math.floor(goal / 10000)}만원`;

    setThisWeekSavingGoal(thisWeekSaving);
  };

  if (!user) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col bg-gray-5 min-h-screen pb-20">
      <div className="pt-5 pb-3 border-b bg-white px-5">
        <LogoIcon />
      </div>

      <section className="py-6 px-5 rounded-b-2xl bg-white">
        <div className="pb-6 flex flex-col gap-1">
          <p className="title-xs text-gray-50">
            {dayjs().format("M월")} {Math.ceil(dayjs().date() / 7)}주차 저축 도전 중🔥
          </p>
          <p className="heading-sm text-gray-80"> {user?.nickname}님, 오늘도 함께 모아용!</p>
        </div>
        <div className="flex gap-4 justify-between items-center mb-[-8px]">
          <div className="flex-1 text-center">
            <p className="label-sm text-gray-70">이번주 목표 {thisWeekSavingGoal}</p>
            <div className="flex justify-center items-center pt-2">
              <SemiCircleProgress percentage={thisMonthSavingRate} />
            </div>
          </div>
          <div className="flex-1 ml-5">
            <div className="p-1 ">
              <CoinIcon />
            </div>
            <p className="caption-md text-gray-70">누적 저축 금액</p>
            <p className="title-sm text-gray-80">{totalSavings || 0}원</p>
          </div>
        </div>
        <Button.Icon className="w-full" onClick={() => router.push("/verif")}>
          바로 저축 인증하기
        </Button.Icon>
      </section>

      <section className="p-5  flex flex-col gap-4">
        <div className="flex gap-3">
          <CardButton
            isSelected={attendanceToday?.attended}
            title={
              attendanceToday?.attended ? `출석체크를\n완료했어요!` : `출석체크하고\n포인트 얻자!!`
            }
            subTitle={attendanceToday?.attended ? "출석체크 확인하기" : "출석체크 하러가기"}
            icon={<CalendarIcon />}
            className="flex-1"
            onClick={() => router.push("/attendance")}
          />
          <CardButton
            title={`오늘의 금융지식이\n도착했어요!`}
            subTitle="퀴즈 풀러가기"
            icon={<BulbIcon />}
            className="flex-1"
            onClick={() => router.push("/quiz")}
          />
        </div>

        {match && (
          <div
            className="shadow-card-shadow bg-white px-5 h-[140px] rounded-2xl  flex justify-between items-center cursor-pointer"
            onClick={() => router.push("/league")}
          >
            <div className="flex flex-col justify-center">
              <div className="flex flex-col gap-1 pb-3">
                <p className="label-sm gray-50">
                  리그 종료까지{" "}
                  <span className="text-green-60">
                    {getDaysDiff(dayjs().format("YYYY-MM-DD"), seasonOpen?.endedAt)}일&nbsp;
                  </span>
                  남았어요!
                </p>
                <p className="title-sm text-gray-90">{league?.name} 진행 중</p>
              </div>
              <div className="flex gap-1">
                <Badge variant={badgeBgColor[match.promotionStatus]}>
                  {promotionText[match.promotionStatus]}
                </Badge>
                <Badge variant={badgeTextColor[match.promotionStatus]} isGrayBg>
                  상위 {match?.rate}%
                </Badge>
              </div>
            </div>
            <div>
              {league?.imageUrl && (
                <Image
                  src={league?.imageUrl}
                  alt="용"
                  width={94}
                  height={104}
                  className="rounded-2xl"
                />
              )}
            </div>
          </div>
        )}
      </section>
      <BottomNav />
    </div>
  );
}
