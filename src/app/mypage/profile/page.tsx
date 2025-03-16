"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import backbar from "src/assets/appbar.svg";
import Image from "next/image";
import { GoogleIcon } from "src/components/common/Icons";
import { useRouter } from "next/navigation";
import Button from "src/_components/Button";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "src/_api/api";
import { cn } from "src/_lib/utils";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("도롱이");
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState(200);
  const [monthlySavingsTarget, setMonthlySavingsTarget] = useState(600000);

  // react query getMe에서 받아오는 데이터
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
  });

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setMonthlyIncome(user.monthlySalary);
      setMonthlySavingsTarget(user.monthlySalary * user.savingsRate);
    }
  }, [user]);

  const router = useRouter();

  const handleSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setNicknameError(value.length > 0 ? null : "닉네임을 입력해주세요.");
  };

  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 첫번째 숫자가 0이면 0 자동 삭제
    const value = e.target.value;
    setMonthlyIncome(Number(value));
  };

  const labelClassName = "label-sm text-gray-50 block";
  const inputClassName = cn(
    "outline-none py-2.5 title-md w-full",
    isEditing ? "text-gray-40 border-b border-gray-30" : "text-gray-50 rounded-lg",
    "placeholder:text-gray-50 focus:text-gray-80"
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 h-14 ">
        <div className="h-[50px] w-full flex items-center pl-[9px]">
          <button onClick={() => router.push("/")} className="z-10">
            <Image src={backbar} alt="" />
          </button>
          <p className="title-sm text-gray-80 text-center w-full ml-[-36px]">나의 정보 수정</p>
        </div>
      </header>

      <div className="flex-1 px-5">
        {/* Login Info Section */}
        <section className="mt-6">
          <h2 className="title-sm mb-4">로그인 정보</h2>
          <div className="flex items-center gap-2 bg-gray-10 px-5 py-3.5 rounded-lg">
            <GoogleIcon />
            <span className="text-gray-50 label-md">Kimmoa@gmail.com</span>
          </div>
        </section>

        {/* Member Info Section */}
        <section className="mt-8">
          <h2 className="title-sm mb-6">회원 정보</h2>

          <div className="flex flex-col gap-8">
            {/* Name Input */}
            <div>
              <label className={labelClassName}>이름</label>
              <input
                type="text"
                value={user?.name}
                readOnly={!isEditing}
                className={inputClassName}
              />
            </div>

            {/* Nickname Input */}
            <div>
              <label className={labelClassName}>닉네임</label>
              <div className="relative">
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  readOnly={!isEditing}
                  className={inputClassName}
                />
                {isEditing && nickname && (
                  <button
                    onClick={() => setNickname("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              {nicknameError && <p className="text-red-500 text-sm mt-1">{nicknameError}</p>}
            </div>

            {/* Monthly Income */}
            <div>
              <label className={labelClassName}>월 급여</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={handleMonthlyIncomeChange}
                  readOnly={!isEditing}
                  className={inputClassName}
                />
                <span className="ml-2 text-gray-600">만원</span>
              </div>
            </div>

            {/* Monthly Savings Target */}
            <div>
              <label className={labelClassName}>월 저축 목표</label>
              <div className={inputClassName}>
                <span>월 급여의 30% · 600,000 원</span>
              </div>
              {isEditing && (
                <p className="text-sm mt-2 text-gray-600">
                  · 월 60만원 저축을 목표로 <span className="text-green-500">매주 15만원</span> 저축
                  해야해요.
                  <br />· 다음 리그부터 수정한 저축액이 반영돼요.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Withdraw Section */}
        {/* {!isEditing ? (
          <section className="mt-8 pb-8">
            <button className=" label-md text-gray-70 underline">회원 탈퇴하기</button>
          </section>
        ) : null} */}
      </div>

      {/* Submit Button */}
      <div className="px-5 py-4">
        <Button.Default
          disabled={isEditing && Boolean(nicknameError)}
          onClick={handleSubmit}
          className="w-full"
        >
          {isEditing ? "수정완료" : "수정하기"}
        </Button.Default>
      </div>
    </div>
  );
}
