"use client";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLeagues, getMe, getUser } from "src/_api/api";

const LoginSuccessPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleOAuthLoginSuccessRedirect();
  }, []);

  const handleOAuthLoginSuccessRedirect = async () => {
    try {
      console.log("Starting OAuth login success process...");

      const leagues = await getLeagues();
      console.log("리그:", leagues);

      const user = await getMe();
      console.log("유저 데이터:", user);

      // if (!user || !user.id) {
      //   console.error("Invalid user data received");
      //   setError("사용자 정보를 가져올 수 없습니다.");
      //   return;
      // }

      // try {
      //   const userInfoResponse = await getUser(user.id);
      //   const userInfo = userInfoResponse.data;
      //   console.log("Successfully fetched detailed user info:", userInfo);

      //   if (userInfo) {
      //     router.push("/");
      //   } else {
      //     router.push("/register");
      //   }
      // } catch (userInfoError) {
      //   console.error("Error fetching user info:", userInfoError);
      //   router.push("/register");
      // }
    } catch (error: unknown) {
      console.error("Login process error:", error);

      const axiosError = error as {
        message: string;
        response?: {
          status: number;
          data?: { message?: string };
        };
      };

      console.error("Error details:", {
        message: axiosError.message,
        response: axiosError.response,
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      });

      if (axiosError.response?.status === 302) {
        console.log("Handling redirect...");
        return;
      }

      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "로그인 처리 중 오류가 발생했습니다."
      );
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          로그인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoaderPinwheel className="animate-spin" />
      <p className="mt-4">로그인 처리 중...</p>
    </div>
  );
};

export default LoginSuccessPage;
