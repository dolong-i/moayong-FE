import { useState, useEffect, useRef } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Slider } from "src/components/ui/slider";
import { cn } from "src/lib/utils";
import { useForm } from "react-hook-form";
import { SignUpProgressType } from "../_constants/constants";

interface InputSlideProps {
  progress: SignUpProgressType;
  type?: string;
  onNext: (key: string, value: string) => void;
  initialValue?: string;
  monthlySalary?: string | number;
  validationRules?: any;
  currentSlide: number;
  slideNumber: number;
}

const InputSlide = ({
  progress,
  type = "text",
  onNext,
  initialValue = "",
  monthlySalary,
  validationRules,
  currentSlide,
  slideNumber,
}: InputSlideProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { keyName } = progress;

  const {
    register,
    handleSubmit,
    watch, // watch 추가
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [keyName]: initialValue,
    },
  });

  // watch를 사용하여 inputValue를 업데이트
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === keyName) {
        setInputValue(value[keyName] || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, keyName]);

  useEffect(() => {
    if (initialValue) {
      const sliderMatch = initialValue.match(/(\d+)%/);
      if (sliderMatch) {
        setSliderValue(Number(sliderMatch[1]));
      }
      setInputValue(initialValue);
      setValue(keyName, initialValue);
    }
  }, [initialValue, keyName, setValue]);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const newKeyboardHeight = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(newKeyboardHeight > 0 ? newKeyboardHeight : 0);
        setIsKeyboardOpen(newKeyboardHeight > 0);

        if (buttonRef.current) {
          buttonRef.current.style.bottom = `${newKeyboardHeight}px`;
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  const onSubmit = (data: any) => {
    onNext(keyName, data[keyName]);
    setValue(keyName, ""); // 입력값 초기화
  };

  const isSavingsGoal = progress.keyName === "savingGoal";

  const savingsAmount = Math.floor((sliderValue / 100) * Number(monthlySalary));

  const handleSliderChange = (value: number[]) => {
    const newSliderValue = value[0];
    const newSavingsAmount = Math.floor((newSliderValue / 100) * Number(monthlySalary));
    setSliderValue(newSliderValue);
    const txt = `월 급여의 ${newSliderValue}% ・ ${newSavingsAmount.toLocaleString()} 원`;
    setInputValue(txt);
    setValue(keyName, txt);
    clearErrors(keyName); // 슬라이더 변경 시 에러 초기화
  };

  const getTooltipPosition = () => {
    if (sliderValue <= 10) {
      return "0%";
    } else if (sliderValue >= 90) {
      return "100%";
    } else {
      return `${sliderValue}%`;
    }
  };

  const getTooltipTransform = () => {
    if (sliderValue <= 10) {
      return "translateX(0)";
    } else if (sliderValue >= 90) {
      return "translateX(-100%)";
    } else {
      return "translateX(-50%)";
    }
  };

  const getArrowPosition = () => {
    if (sliderValue <= 10) {
      return "16%";
    } else if (sliderValue >= 90) {
      return "90%";
    } else {
      return "50%";
    }
  };

  const displayedSavingsAmount = savingsAmount > 0 ? savingsAmount : 0;
  const shouldDisableButton =
    keyName === "savingGoal" ? sliderValue < 10 : !isValid || currentSlide !== slideNumber;

  return (
    <div className="w-full flex flex-col items-start justify-center px-4 mb-[49px]">
      <label className="text-green-70 label-md mb-1">{progress.label}</label>
      {isSavingsGoal && (
        <div className="relative w-full">
          <p className="title-md text-green-70 mb-[65px]">월 급여의 {sliderValue} %</p>

          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            max={100}
            step={1}
            className="h-1.5 w-full"
          />

          <div
            className="absolute top-[33px]"
            style={{
              left: getTooltipPosition(),
              transform: getTooltipTransform(),
            }}
          >
            <div className="bg-gray-50 text-gray-0 title-xs px-[14px] py-[8px] rounded-md shadow-md z-10 whitespace-nowrap">
              월 {(displayedSavingsAmount * 10000).toLocaleString()} 원
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
      {!isSavingsGoal && (
        <div className="relative w-full">
          <Input
            type={type}
            placeholder="입력하세요"
            className={cn(
              "w-full text-gray-80 placeholder-gray-50 border-t-0 border-l-0 border-r-0 rounded-none shadow-none focus:outline-none border-b-2 border-green-50 pl-0 title-md pb-3",
              errors[keyName] && "border-b-red-500"
            )}
            {...register(keyName, validationRules)}
            value={inputValue}
          />
          {progress.keyName === "monthlySalary" && (
            <div className=" absolute right-0 top-0 text-gray-50 title-xs">만원</div>
          )}

          {errors[keyName] && (
            <p className="text-red-500 text-sm mt-1">{errors[keyName]?.message}</p>
          )}
        </div>
      )}
      <Button
        ref={buttonRef}
        size={isKeyboardOpen ? "xlarge" : "large"}
        onClick={handleSubmit(onSubmit)}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 transition-all duration-300",
          isKeyboardOpen ? "bottom-0" : "bottom-5"
        )}
        style={{
          bottom: isKeyboardOpen ? `${keyboardHeight}px` : undefined,
        }}
        disabled={shouldDisableButton}
      >
        다음
      </Button>
      <p className="mt-[16px] label-sm text-gray-70">{progress.description}</p>
    </div>
  );
};

export default InputSlide;
