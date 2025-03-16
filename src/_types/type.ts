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
export interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  monthlySalary: number;
  savingsRate: number;
}

export interface UserAccount {
  savingsBank: string;
  savingsAmount: number;
  accountNumber: string;
}

// League Types
export interface League {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}

// Verification Types
export interface VerificationRequest {
  bank: string;
}

export interface VerificationStatus {
  status: "PENDING" | "COMPLETED" | "FAILED";
}

export interface VerificationResult {
  success: boolean;
  message: string;
  data: unknown;
}

// Quiz Types
export interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// Savings Types
export interface SavingsTransaction {
  id: number;
  type: "DEPOSIT" | "WITHDRAWAL";
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
