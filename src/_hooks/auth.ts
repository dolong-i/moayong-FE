import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMe, refresh } from "src/_api/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useAuth = () => {
  const router = useRouter();
  const {
    data: user,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      handleError(error as AxiosError);
    }
  }, [isError, error]);

  const handleError = async (error: AxiosError) => {
    if (isError) {
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        router.push("/login");
      }
      console.log("error", error);
    }
  };
  return { user };
};
