export enum TransactionType {
  WITHDRAW = "WITHDRAW",
  DEPOSIT = "DEPOSIT",
}
export type BankType =
  | "KAKAO_BANK"
  | "SHINHAN"
  | "WOORI"
  | "KB"
  | "NH"
  | "HANA"
  | "IBK"
  | "TOSS_BANK";
export type UserType = {
  username: string;
  password: string;
};

export interface LeagueMemberResponse {
  id: number;
  userId: number;
  username: string;
  leagueId: number;
  status: LeagueMemberStatus;
  totalScore: number;
  goalAmount: number;
}
export interface MemberRankingResponse {
  memberId: number;
  nickname: string;
  promotionStatus: PromotionStatus;
  rank: number;
  rate: number;
  userId: number;
  totalScore: number;
}

export enum LeagueMemberStatus {
  ACTIVE,
  INACTIVE,
}

// Auth Types
export interface OnboardingRequest {
  name: string;
  nickname: string;
  savingsBank: string;
  monthlySalary: number;
  savingsRate: number;
  accountNumber: string;
}

// User Types
export interface UserResponse {
  id: number;
  provider: string;
  email: string;
  name: string;
  nickname: string;
  monthlySalary: number;
  savingsRate: number;
  savingsBank: string;
  accountNumber: number;
}

export interface UserPutRequest {
  nickname: string;
  monthlySalary: number;
  savingsRate: number;
}

export interface UserAccountPutRequest {
  savingsBank: string;
  savingsAmount: number;
  accountNumber: number;
}

// League Types
export interface LeagueResponse {
  id: number;
  seasonId: number;
  level: number;
  name: string;
  imageUrl: string;
  promotionRate: number;
  relegationRate: number;
}

// Verification Types
export interface VerificationRequest {
  bank: string;
}

export interface VerificationResult {
  id: string;
  bank: "KAKAO_BANK" | "SHINHAN" | "WOORI" | "KB" | "NH" | "HANA" | "IBK" | "TOSS_BANK";
  status: VerificationStatus;
  imageUrl: string;
  name: string | null;
  type: TransactionType;
  date: string | null;
  amount: number;
  balance: number;
}

export interface VerificationStatusResponse {
  id: string;
  status: VerificationStatus;
}

export enum VerificationStatus {
  STARTED = "STARTED", // 검증 시작
  SYSTEM_ERROR = "SYSTEM_ERROR", // 알 수 없는 에러
  UPLOADING_IMAGE = "UPLOADING_IMAGE", // S3에 이미지 업로드 중
  IMAGE_UPLOAD_FAILED = "IMAGE_UPLOAD_FAILED", // S3 업로드 실패
  PROCESSING_OCR = "PROCESSING_OCR", // OCR 처리 중
  OCR_PROCESSING_FAILED = "OCR_PROCESSING_FAILED", // OCR 처리 실패
  FINISHED = "FINISHED", // 검증 완료
}

// Quiz Types
export interface Quiz {
  id: number;
  financeTitle: string;
  financeDescription: string;
  sourceTitle: string;
  sourceLink: string;
  createdAt: string;
}
export interface Problem {
  id: number;
  problemTitle: string;
  problemOptions: string[];
}

// Savings Types
export interface SavingsTransaction {
  id: number;
  type: TransactionType;
  amount: number;
  balance: number;
  datetime: string;
  imageUrl?: string;
}

// Member Types
export interface LeagueMember {
  id: number;
  userId: number;
  leagueId: number;
  username: string;
  totalScore: number;
  rank: number;
}

// Match Types
export interface MatchResponse {
  memberId: number;
  leagueId: number;
  totalScore: number;
  goalAmount: number;
  rank: number;
  rate: number;
  nextLevel: number;
  promotionStatus: PromotionStatus;
}

export enum PromotionStatus {
  PROMOTION = "PROMOTION", // 승급
  RELEGATION = "RELEGATION", // 강등
  SUSPENDED = "SUSPENDED", // 정지
}

export interface AttendanceResponse {
  attended: boolean;
}

export interface QuizSubmissionResponse {
  userAnswer: number;
  status: "CORRECT" | "WRONG";
  answerNumber: number;
  answerDescription: string;
}

export interface QuizKnowledgeResponse {
  id: number;
  financeTitle: string;
  financeDescription: string;
  sourceTitle?: string;
  sourceLink?: string;
}

export interface SeasonResponse {
  id: number;
  status: "OPEN" | "CLOSED";
  startedAt: string;
  endedAt: string;
}

export enum SeasonStatus {
  OPEN,
  CLOSED,
}

export interface SavingsRequest {
  name: string;
  imageUrl: string;
  type: TransactionType;
  datetime: string; // ISO 8601 형식 (예: "2025-03-14T10:00:00")
  amount: number;
  balance: number;
}
