"use client";

import Image from "next/image";
import OAuthButtons from "src/_components/auth/OAuthButtons";

import dragon from "src/assets/images/login-dragon.png";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src={dragon} alt="" />
      <p className="leading-9 text-center title-md text-gray-80 mt-[24px]">
        모아용과 함께
        <br />
        모아용
      </p>
      <OAuthButtons />
    </div>
  );
};

export default LoginPage;
