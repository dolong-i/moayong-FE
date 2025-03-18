export type SignUpProgressType = {
  label: string;
  keyName: string;
  description?: string;
};

export const SIGN_UP_PROGRESS: SignUpProgressType[] = [
  {
    label: "이름",
    keyName: "name",
    description: "주민등록상 이름을 입력해주세요",
  },
  {
    label: "닉네임",
    keyName: "nickname",
    description: "한글은 8자 이내, 영문은 16자 이내로 입력해주세요.",
  },
  {
    label: "월 급여",
    keyName: "monthlySalary",
    description: "대략적인 금액을 적어주셔도 괜찮아요.",
  },
  {
    label: "월 저축 목표",
    keyName: "savingGoal",
    description: "10%~60% 사이로 선택 가능해요.",
  },
  {
    label: "저축통장",
    keyName: "savingsBank",
  },
  {
    label: "계좌 번호",
    keyName: "account",
  },
  {
    label: "이미지 업로드",
    keyName: "imageUploded",
  },
  {
    label: "완료",
    keyName: "complete",
  },
];
