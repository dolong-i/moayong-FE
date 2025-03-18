import { useState, useEffect } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Slider } from "src/components/ui/slider";
import { cn } from "src/lib/utils";
import { SignUpProgressType } from "../_constants/constants";

interface InputSlideProps {
  progress: SignUpProgressType;
  type?: string;
  onNext: (key: string, value: string) => void;
  initialValue?: string;
  monthlySalary?: string | number;
  onClick?: (ocrResult: any) => void;
  allDataPresent?: boolean;
  isButtonDisabled?: boolean;
  handleRegister?: () => void;
}

const AccountVerification = ({
  progress,
  type = "text",
  onClick,
  onNext,
  initialValue = "",
  monthlySalary = 0,
  allDataPresent,
  handleRegister,
}: InputSlideProps) => {
  console.log("allDataPresent", allDataPresent);

  const [inputValue, setInputValue] = useState(initialValue);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  // useEffect를 통해 initialValue가 변경될 때마다 슬라이더와 inputValue를 업데이트
  useEffect(() => {
    if (initialValue) {
      const sliderMatch = initialValue.match(/(\d+)%/); // 텍스트 내에서 퍼센트를 추출
      if (sliderMatch) {
        setSliderValue(Number(sliderMatch[1]));
      }
      setInputValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500) {
        // 화면 높이가 작아지면 키보드가 열린 것으로 간주
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = () => {
    onNext(progress.keyName, inputValue);
    setInputValue("");
  };

  const isSavingsGoal = progress.label === "월 저축 목표"; // "월 저축 목표"일 때 슬라이더 표시

  // 계산된 저축액 - 반올림 문제 해결을 위해 Math.ceil 사용하거나 소수점 고려
  const calculateSavingsAmount = (percentage: number) => {
    if (percentage === 0) return 0;

    // 정확한 계산값
    const exactAmount = (percentage / 100) * Number(monthlySalary);

    // 매우 작은 금액에 대한 처리 개선
    if (exactAmount < 1 && exactAmount > 0) {
      return 1; // 최소 1원 반환
    }

    return Math.round(exactAmount); // Math.floor 대신 Math.round 사용
  };

  // 저축액 계산
  const savingsAmount = calculateSavingsAmount(sliderValue);

  const handleSliderChange = (value: number[]) => {
    const newSliderValue = value[0];
    // 새 값으로 직접 계산
    const newSavingsAmount = calculateSavingsAmount(newSliderValue);

    // 상태 업데이트
    setSliderValue(newSliderValue);

    // 새로 계산된 값으로 텍스트 구성
    const txt = `월 급여의 ${newSliderValue}% ・ ${newSavingsAmount.toLocaleString()} 원`;
    setInputValue(txt);
  };

  // 툴팁 위치 계산 함수 - 백분율 기준
  const getTooltipPosition = () => {
    // 0%에서는 왼쪽 정렬, 100%에서는 오른쪽 정렬, 중간은 중앙 정렬
    if (sliderValue <= 10) {
      return "0%"; // 왼쪽 정렬
    } else if (sliderValue >= 90) {
      return "100%"; // 오른쪽 정렬
    } else {
      return `${sliderValue}%`; // 중앙 정렬
    }
  };

  // 툴팁 변환 계산 함수
  const getTooltipTransform = () => {
    if (sliderValue <= 10) {
      return "translateX(0)"; // 왼쪽 정렬 시 변환 없음
    } else if (sliderValue >= 90) {
      return "translateX(-100%)"; // 오른쪽 정렬 시 완전 왼쪽으로 변환
    } else {
      return "translateX(-50%)"; // 중앙 정렬 시 중앙으로 변환
    }
  };

  // 화살표 위치 계산 함수
  const getArrowPosition = () => {
    if (sliderValue <= 10) {
      return "16%"; // 왼쪽에 가까울 때
    } else if (sliderValue >= 90) {
      return "90%"; // 오른쪽에 가까울 때
    } else {
      return "50%"; // 중앙
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center px-4 mb-[35px]">
      <label className="text-green-50 label-md mb-3">{progress.label}</label>

      {/* 월 저축 목표일 때만 슬라이더 표시 */}
      {isSavingsGoal && (
        <div className="relative w-full">
          <p className="title-md text-green-70 mb-[65px]">월 급여의 {sliderValue} %</p>

          {/* 슬라이더 */}
          <Slider
            value={[sliderValue]} // 슬라이더의 값을 sliderValue로 설정
            onValueChange={handleSliderChange} // 슬라이더 값 변경 시 처리
            max={100}
            step={1}
            className="h-1.5 w-full"
          />

          {/* 툴팁 - 새로운 포지셔닝 방식 */}
          <div
            className="absolute top-[33px]"
            style={{
              left: getTooltipPosition(),
              transform: getTooltipTransform(),
            }}
          >
            {/* 툴팁 내용 */}
            <div className="bg-gray-50 text-gray-0 title-xs px-[14px] py-[8px] rounded-md shadow-md z-10 whitespace-nowrap">
              월 {savingsAmount.toLocaleString()} 원{/* 화살표 - 별도 포지셔닝 */}
              <div
                className="absolute bottom-[-6px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-t-gray-50 border-l-transparent border-r-transparent"
                style={{
                  left: getArrowPosition(),
                  transform: "translateX(-50%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* 월 저축 목표가 아닐 경우 다른 컴포넌트가 표시될 수 있음 */}
      {!isSavingsGoal && (
        <div className="relative w-full">
          <Input
            type={"button"}
            value={"통장을 인증해주세요."}
            placeholder="통장을 인증해주세요."
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full text-left text-gray-50 placeholder-gray-50 border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:outline-none 
                  border-b border-b-2 border-green-50 pl-0 title-md pb-9 pr-20"
          />
          <Button
            variant={"secondary"}
            size={"xsmall"}
            className="absolute right-0 top-[12px] -translate-y-1/2"
            onClick={onClick}
          >
            통장인증
          </Button>
        </div>
      )}

      {allDataPresent ? (
        <Button
          size={isKeyboardOpen ? "xlarge" : "large"}
          onClick={handleRegister}
          className={cn(
            "fixed left-1/2 -translate-x-1/2",
            isKeyboardOpen ? "bottom-0" : "bottom-5 "
          )}
        >
          가입 완료
        </Button>
      ) : (
        <Button
          size={isKeyboardOpen ? "xlarge" : "large"}
          onClick={handleSubmit}
          className={cn(
            "fixed left-1/2 -translate-x-1/2",
            isKeyboardOpen ? "bottom-0" : "bottom-5 "
          )}
        >
          다음
        </Button>
      )}
      {/* <p className='mt-[16px] label-sm text-gray-70'>안내텍스트</p> */}
    </div>
  );
};

export default AccountVerification;
