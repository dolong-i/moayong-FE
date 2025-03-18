import axios from "axios";
import type {
  League,
  LeagueMember,
  OnboardingRequest,
  Quiz,
  SavingsTransaction,
  UserResponse,
  UserPutRequest,
  UserAccountPutRequest,
  VerificationResult,
  VerificationStatus,
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

    if (error.response?.status === 401) {
      try {
        await refresh();
        return api(error.config);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        // window.location.href = "/login";
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

export const getMe = () => api.get<UserResponse>("/users/me").then((res) => res.data);

export const updateAccount = (userId: number, data: UserAccountPutRequest) =>
  api.put(`/users/${userId}/account`, data);

export const checkNickname = (nickname: string) =>
  api.get(`/users/nickname-check?nickname=${nickname}`);

// League APIs
export const createNewSeason = () => api.post("/leagues/new-season");

export const getLeagues = () => api.get<League[]>("/leagues").then((res) => res.data);

export const getLeague = (id: number) => api.get<League>(`/leagues/${id}`).then((res) => res.data);

export const getOpenLeagues = () => api.get<League[]>("/leagues/open").then((res) => res.data);

// Verification APIs
export const startAccountVerification = (data: FormData) =>
  api.post("/verification/account/start", data);

export const startPaymentVerification = (data: FormData) =>
  api.post("/verification/payment/start", data);

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
    .get<VerificationResult>(`/verification/payment/${verificationId}/result`)
    .then((res) => res.data);

// Member APIs
export const getAllMembers = () => api.get<LeagueMember[]>("/members").then((res) => res.data);

export const getMember = (id: number) =>
  api.get<LeagueMember>(`/members/${id}`).then((res) => res.data);

export const getMembersByLeagueId = (leagueId: number) =>
  api.get<LeagueMember[]>(`/leagues/${leagueId}/members`).then((res) => res.data);

export const getMembersByUserId = (userId: number) =>
  api.get<LeagueMember[]>(`/users/${userId}/members`).then((res) => res.data);

export const getActiveMemberByUserId = (userId: number) =>
  api.get<LeagueMember>(`/users/${userId}/members/active`).then((res) => res.data);

export const getMemberRankingByLeagueId = (leagueId: number) =>
  api.get<LeagueMember[]>(`/leagues/${leagueId}/members/ranking`).then((res) => res.data);

// Quiz APIs
export const getDailyQuizByMemberId = (memberId: number) =>
  api.get<Quiz>(`/members/${memberId}/quizzes/random`).then((res) => res.data);

export const showQuiz = (memberId: number, quizId: number) =>
  api.get<Quiz>(`/members/${memberId}/quizzes/${quizId}/problem`).then((res) => res.data);

export const submitQuiz = (memberId: number, quizId: number, answer: number) =>
  api.post(`/members/${memberId}/quizzes/${quizId}/solve`, { answer }).then((res) => res.data);

export const getAllSolvedQuizzesByUserId = (userId: number) =>
  api.get<Quiz[]>(`/users/${userId}/quizzes`).then((res) => res.data);

export const getSolvedQuiz = (userId: number, quizId: number) =>
  api.get<Quiz>(`/users/${userId}/quizzes/${quizId}`).then((res) => res.data);

// Savings APIs
export const createSavingsTransaction = (memberId: number, data: Omit<SavingsTransaction, "id">) =>
  api.post(`/members/${memberId}/savings`, data).then((res) => res.data);

export const getSavingsByMemberId = (memberId: number) =>
  api.get<SavingsTransaction[]>(`/members/${memberId}/savings`).then((res) => res.data);

export const getTotalAmountByUserId = (userId: number) =>
  api.get<number>(`/users/${userId}/savings/total`).then((res) => res.data);
