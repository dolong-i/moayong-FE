import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { VerificationResult, VerificationStatusResponse } from "src/_types/type";

export const selectedImageAtom = atom<string | null>(null);
export const imageUrlAtom = atom<string | null>(null);
export const accountNumberAtom = atom<string>("");
export const balanceAtom = atom<number>(0);
export const isLoadingAtom = atom<boolean>(false);
export const isVerifiedAtom = atomWithStorage<boolean>("isVerified", false);
export const verificationResultAtom = atom<VerificationResult | null>(null);
export const verificationStartAtom = atom<VerificationStatusResponse | null>(null);

// 파생 원자 (읽기 전용)
export const formattedBalanceAtom = atom((get) => {
  const balance = get(balanceAtom);
  return balance.toLocaleString() + " 원";
});

export const formattedTransactionAmountAtom = atom((get) => {
  const result = get(verificationResultAtom);
  if (!result?.amount) return "0 원";
  return Number(result.amount).toLocaleString() + " 원";
});

export const formattedTransactionDateAtom = atom((get) => {
  const result = get(verificationResultAtom);
  if (!result?.date) return "";

  const formattedDate = new Date(result.date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formattedDate;
});
