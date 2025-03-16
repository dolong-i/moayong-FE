import Image from "next/image";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "src/_api/api";
import google from "src/assets/images/icon-google.png";
import kakao from "src/assets/images/icon-kakao.png";
import naver from "src/assets/images/icon-naver.png";

const OAuthButtons = () => {
  const handleSNSLogin = async (snsType: "google" | "kakao" | "naver") => {
    switch (snsType) {
      case "google":
        window.location.href = GOOGLE_AUTH_URL;
        break;
      case "kakao":
        window.location.href = KAKAO_AUTH_URL;
        break;
      case "naver":
        window.location.href = NAVER_AUTH_URL;
        break;
    }
  };

  return (
    <div className="flex flex-col gap-[8px] my-[40px]">
      <button
        onClick={() => handleSNSLogin("google")}
        className="flex items-center bg-gray-0 justify-center gap-[8px] min-w-[320px] min-h-[52px] border rounded-[16px]"
      >
        <Image src={google} alt="" />
        <p className="text-gray-80 label-md">Google로 시작하기</p>
      </button>
      <button
        onClick={() => handleSNSLogin("kakao")}
        className="flex items-center bg-[#FEE500] justify-center gap-[8px] min-w-[320px] min-h-[52px] border rounded-[16px]"
      >
        <Image src={kakao} alt="" />
        <p className="text-gray-80 label-md">카카오로 시작하기</p>
      </button>
      <button
        onClick={() => handleSNSLogin("naver")}
        className="flex items-center bg-[#03C75A] justify-center gap-[8px] min-w-[320px] min-h-[52px] border rounded-[16px]"
      >
        <Image src={naver} alt="" />
        <p className="text-gray-0 label-md">네이버로 시작하기</p>
      </button>
    </div>
  );
};

export default OAuthButtons;
