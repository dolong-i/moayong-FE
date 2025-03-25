"use client";

import Image from "next/image";
import upload from "src/assets/images/upload.png";
import sample from "src/assets/images/sample-img.png";
import press from "src/assets/images/press.png";
import check from "src/assets/icon-check.svg";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { selectedImageAtom, isLoadingAtom, updatePassbookDataAtom } from "src/_store/passbookAtoms";
import x from "src/assets/icon-x.svg";
import { startPaymentVerification } from "src/_api/api";
import { useMutation } from "@tanstack/react-query";
import { VerificationRequest } from "src/_types/type";
import { useEffect, useState } from "react";

const PassbookVerifiPage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom as any);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [, updatePassbookData] = useAtom(updatePassbookDataAtom);
  const [request, setRequest] = useState<{
    bank: "KAKAO_BANK" | "SHINHAN" | "WOORI" | "KB" | "NH" | "HANA" | "IBK" | "TOSS_BANK";
    imgFile: File | null;
  }>({
    bank: "KAKAO_BANK",
    imgFile: null,
  });

  const { mutate: mutatePaymentVerification } = useMutation({
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
      console.log("file", file);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage);
      mutatePaymentVerification();
    }
  }, [selectedImage]);

  //       router.push("/passbook-verif/screen");
  //     } catch (error) {
  //       console.error("Error uploading passbook image:", error);
  //       alert("통장 인증에 실패했습니다. 다시 시도해주세요.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  return (
    <div className="w-full mx-auto flex flex-col items-center h-screen min-h-screen">
      <div className="h-[50px] py-[5px] w-full flex items-center pl-[9px] bg-gray-0 mb-4">
        <button onClick={() => router.push("/verif")} className="z-10">
          <Image src={x} alt="" />
        </button>
        <p className="title-sm text-gray-80 text-center w-full ml-[-36px]">저축 인증하기</p>
      </div>
      <div className="bg-gray-5 border border-gray-20 rounded-[16px] w-[320px] h-[280px] flex flex-col items-center justify-center mx-[20px]">
        {selectedImage ? (
          <Image
            src={selectedImage as any}
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
