import axios from "axios";
import type {
  LeagueResponse,
  LeagueMember,
  OnboardingRequest,
  Quiz,
  SavingsTransaction,
  UserResponse,
  UserPutRequest,
  UserAccountPutRequest,
  VerificationResult,
  VerificationStatus,
  MatchResponse,
  AttendanceResponse,
  Problem,
  QuizSubmissionResponse,
  QuizKnowledgeResponse,
  SeasonResponse,
  LeagueMemberResponse,
  MemberRankingResponse,
  BankType,
} from "src/_types/type";

const BASE_URL = "https://api.moayong.com/api/v1";
export const GOOGLE_AUTH_URL = `${BASE_URL}/auth/authorize/google`;
export const KAKAO_AUTH_URL = `${BASE_URL}/auth/authorize/kakao`;
export const NAVER_AUTH_URL = `${BASE_URL}/auth/authorize/naver`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 0, // 리다이렉션 허용
  validateStatus: function (status) {
    return status >= 200 && status < 400; // 302도 정상으로 간주
  },
});

// 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = document.cookie.match(/(?:^|; )token=([^;]*)/)?.[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // console.error("Request error:", error); // 요청 에러 디버깅
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    console.error("Response error:", error);

    // 에러 응답이 302인 경우도 처리
    if (error.response?.status === 302) {
      const redirectUrl = error.response.headers.location;
      if (redirectUrl) {
        console.log("Error Redirecting to:", redirectUrl);
        try {
          const redirectedResponse = await api.get(redirectUrl);
          return redirectedResponse;
        } catch (redirectError) {
          console.error("Redirect error:", redirectError);
          return Promise.reject(redirectError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth APIs
export const completeOnboarding = (data: OnboardingRequest) =>
  api.post("/auth/onboarding/complete", data);

export const logout = () => api.post("/auth/logout");

export const refresh = () => api.post("/auth/refresh");

// User APIs
export const getUsers = () => api.get<UserResponse[]>("/users");

export const getUser = (id: number) => api.get<UserResponse>(`/users/${id}`);

export const updateUser = (id: number, data: Partial<UserPutRequest>) =>
  api.put(`/users/${id}`, data);

export const getMe = () =>
  api.get<{ data: UserResponse }>("/users/me").then((res) => res.data.data);

export const updateAccount = (userId: number, data: UserAccountPutRequest) =>
  api.put(`/users/${userId}/account`, data);

export const checkNickname = (nickname: string) =>
  api.get(`/users/nickname-check?nickname=${nickname}`);

// League APIs
export const createNewSeason = () => api.post("/leagues/new-season");

export const getSeasonOpen = () =>
  api.get<{ data: SeasonResponse }>("/seasons/open").then((res) => res.data.data);

export const getLeagues = () => api.get<LeagueResponse[]>("/leagues").then((res) => res.data);

export const getLeague = (id: number) =>
  api.get<{ data: LeagueResponse }>(`/leagues/${id}`).then((res) => res.data.data);

export const getOpenLeagues = () =>
  api.get<LeagueResponse[]>("/leagues/open").then((res) => res.data);

// interface VerificationRequest {
//   bank: SavingsBank;
// }
// // Verification APIs
// - **Multipart Form Data**
// - `request`: `VerificationRequest` JSON
// - `imgFile`: `MultipartFile` (이미지 파일)

export const startAccountVerification = (request: BankType, imgFile: FormData) =>
  api.post("/verification/account/start", { request, imgFile });

export const startPaymentVerification = (bank: BankType, imgFile: File) => {
  const formData = new FormData();
  console.log("imgFile", imgFile instanceof File); // true 여야 함
  formData.append("imgFile", imgFile);
  formData.append(
    "request",
    new Blob([JSON.stringify({ bank })], {
      type: "application/json",
    })
  );
  return api
    .post("/verification/payment/start", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data.data);
};

export const getAccountVerificationStatus = (verificationId: string) =>
  api
    .get<VerificationStatus>(`/verification/account/${verificationId}/status`)
    .then((res) => res.data);

export const getPaymentVerificationStatus = (verificationId: string) =>
  api
    .get<VerificationStatus>(`/verification/payment/${verificationId}/status`)
    .then((res) => res.data);

export const getAccountVerificationResult = (verificationId: string) =>
  api
    .get<VerificationResult>(`/verification/account/${verificationId}/result`)
    .then((res) => res.data);

export const getPaymentVerificationResult = (verificationId: string) =>
  api
    .get<{ data: VerificationResult }>(`/verification/payment/${verificationId}/result`)
    .then((res) => res.data.data);

// Member APIs
export const getAllMembers = () => api.get<LeagueMember[]>("/members").then((res) => res.data);

export const getMember = (id: number) =>
  api.get<LeagueMember>(`/members/${id}`).then((res) => res.data);

export const getMembersByLeagueId = (leagueId: number) =>
  api
    .get<{ data: LeagueMemberResponse[] }>(`/leagues/${leagueId}/members`)
    .then((res) => res.data.data);

export const getMembersByUserId = (userId: number) =>
  api.get<LeagueMember[]>(`/users/${userId}/members`).then((res) => res.data);

export const getActiveMemberByUserId = (userId: number) =>
  api.get<LeagueMember>(`/users/${userId}/members/active`).then((res) => res.data);

export const getMemberRankingByLeagueId = (leagueId: number) =>
  api
    .get<{ data: MemberRankingResponse[] }>(`/leagues/${leagueId}/members/ranking`)
    .then((res) => res.data.data);

// Quiz APIs
export const getDailyQuizByMemberId = (memberId: number) =>
  api.get<{ data: Quiz }>(`/members/${memberId}/quizzes/random`).then((res) => res.data.data);

export const showQuiz = (memberId: number, quizId: number) =>
  api
    .get<{ data: Problem }>(`/members/${memberId}/quizzes/${quizId}/problem`)
    .then((res) => res.data.data);

export const submitQuiz = (memberId: number, quizId: number, answer: number) =>
  api
    .post<{ data: QuizSubmissionResponse }>(`/members/${memberId}/quizzes/${quizId}/solve`, {
      answer,
    })
    .then((res) => res.data.data);

export const getAllSolvedQuizzesByUserId = (userId: number) =>
  api
    .get<{ data: QuizKnowledgeResponse[] }>(`/users/${userId}/quizzes`)
    .then((res) => res.data.data);

export const getSolvedQuiz = (userId: number, quizId: number) =>
  api.get<{ data: Quiz }>(`/users/${userId}/quizzes/${quizId}`).then((res) => res.data.data);

// Savings APIs
export const createSavingsTransaction = (memberId: number, data: Omit<SavingsTransaction, "id">) =>
  api.post(`/members/${memberId}/savings`, data).then((res) => res.data);

export const getSavingsByMemberId = (memberId: number) =>
  api.get<SavingsTransaction[]>(`/members/${memberId}/savings`).then((res) => res.data);

export const getTotalAmountByUserId = (userId: number) =>
  api
    .get<{ data: { amount: number } }>(`/users/${userId}/savings/total`)
    .then((res) => res.data.data.amount);

// members/{id}/match
export const getMatch = (memberId: number) =>
  api.get<{ data: MatchResponse }>(`/members/${memberId}/match`).then((res) => res.data.data);

// users/{id}/match
export const getMatchByUserId = (userId: number) =>
  api.get<{ data: MatchResponse }>(`/users/${userId}/match`).then((res) => res.data.data);

// POST members/{id}/attendances/today
export const postAttendance = (memberId: number) =>
  api.post(`/members/${memberId}/attendances/today`);

// GET members/{id}/attendances/today
export const getAttendance = (memberId: number) =>
  api
    .get<{ data: AttendanceResponse }>(`/members/${memberId}/attendances/today`)
    .then((res) => res.data.data);

// 최대, 현재 연속 출석일
export const getConsecutiveAttendance = (userId: number) =>
  api
    .get<{ data: { currentConsecutiveDate: number; maxConsecutiveDate: number } }>(
      `/users/${userId}/attendances/consecutive`
    )
    .then((res) => res.data.data);

// 오늘 출석 체크 여부
// GET members/{id}/attendances/today
export const getAttendanceToday = (memberId: number) =>
  api
    .get<{ data: AttendanceResponse }>(`/members/${memberId}/attendances/today`)
    .then((res) => res.data.data);
