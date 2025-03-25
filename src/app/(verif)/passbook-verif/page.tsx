"use client";

import Image from "next/image";
import upload from "src/assets/images/upload.png";
import sample from "src/assets/images/sample-img.png";
import press from "src/assets/images/press.png";
import check from "src/assets/icon-check.svg";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectedImageAtom, imageUrlAtom, verificationStartAtom } from "src/_store/passbookAtoms";
import x from "src/assets/icon-x.svg";
import { startPaymentVerification } from "src/_api/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const PassbookVerifiPage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom as any);
  const [imageUrl, setImageUrl] = useAtom(imageUrlAtom);
  const [, setVerificationStart] = useAtom(verificationStartAtom);

  const { mutate: mutatePaymentVerification, data: startVerificationData } = useMutation({
    mutationFn: () => {
      if (!selectedImage || !(selectedImage instanceof File)) {
        throw new Error("Invalid image file");
      }
      return startPaymentVerification("KAKAO_BANK", selectedImage);
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // 기존 URL이 있다면 해제 (메모리 누수 방지)
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      // 새로운 임시 URL 생성 및 상태 업데이트
      const newImageUrl = window.URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      console.log("newImageUrl", newImageUrl);
    } else {
      // 파일 선택이 취소된 경우
      setSelectedImage(null);
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };

  useEffect(() => {
    verifyImage();
  }, [selectedImage]);

  const verifyImage = async () => {
    if (selectedImage) {
      mutatePaymentVerification();
    }
  };

  useEffect(() => {
    console.log("paymentVerificationData", startVerificationData);
    if (startVerificationData) {
      setVerificationStart(startVerificationData);
      router.push("/passbook-verif/screen");
    }
  }, [startVerificationData]);

  return (
    <div className="w-full mx-auto flex flex-col items-center h-screen min-h-screen">
      <div className="h-[50px] py-[5px] w-full flex items-center pl-[9px] bg-gray-0 mb-4">
        <button onClick={() => router.push("/verif")} className="z-10">
          <Image src={x} alt="" />
        </button>
        <p className="title-sm text-gray-80 text-center w-full ml-[-36px]">저축 인증하기</p>
      </div>
      <div className="bg-gray-5 border border-gray-20 rounded-[16px] w-[320px] h-[280px] flex flex-col items-center justify-center mx-[20px]">
        {imageUrl}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Passbook"
            width={320}
            height={280}
            className="rounded-lg border border-gray-200 overflow-hidden"
          />
        ) : (
          <label className="w-full flex title-xs items-center justify-center text-gray-50 cursor-pointer w-[320px] h-[280px]">
            <div className="flex flex-col items-center justify-center">
              <Image src={upload} alt="Uploaded Passbook" width={50} height={50} />
              <span className="mt-2">이미지 추가하기</span>
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        )}
      </div>

      <div className="flex justify-left items-center gap-[4px] mt-[24px] mb-[10px] w-[320px] m-auto">
        <Image src={press} alt="" />
        <p className="title-xs text-info pt-1">꼭 확인해 주세요!</p>
      </div>

      <div className="bg-gray-5 py-[20px] px-[17px] rounded-[16px] mx-[20px] w-[320px] mx-auto">
        <p className="body-md text-gray-90 flex items-center gap-[1px]">
          <Image src={check} alt="" />
          잔액 0원이 보이도록 캡쳐해주세요.
        </p>
        <p className="body-md text-gray-90 flex items-center gap-[1px] mt-[6px]">
          <Image src={check} alt="" />
          계좌번호가 보이도록 캡쳐해주세요.
        </p>
      </div>

      <div className="border-4 border-[#F6F6F6] w-full mt-[40px]"></div>

      <div className="my-[40px] flex flex-col items-center pb-20">
        <p className="title-md text-gray-80 mb-[16px] mx-[20px] w-[320px] text-left">
          이미지 인증 예시
        </p>
        <div className="flex justify-center">
          <Image src={sample} alt="인증 예시 이미지" className="mx-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default PassbookVerifiPage;
