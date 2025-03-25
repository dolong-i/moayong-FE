"use client";

import { useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "src/components/ui/sheet";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  selectedImageAtom,
  accountNumberAtom,
  imageUrlAtom,
  isLoadingAtom,
  verificationStartAtom,
  verificationResultAtom,
} from "src/_store/passbookAtoms";
import SuccessPopup from "src/_components/SuccessPopup";
import x from "src/assets/icon-x.svg";
import { useRouter } from "next/navigation";
import { getPaymentVerificationResult, getPaymentVerificationStatus } from "src/_api/api";
import { useQuery } from "@tanstack/react-query";

const mockApiRequest: any = async () => {
  // 목데이터 응답
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

const ScreenPage = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [verificationStart] = useAtom(verificationStartAtom);
  const [verificationResult, setVerificationResult] = useAtom(verificationResultAtom);
  const [selectedImage] = useAtom(selectedImageAtom);
  const [imageUrl] = useAtom(imageUrlAtom);
  const [accountNumber, setAccountNumber] = useAtom(accountNumberAtom);
  const [request, setRequest] = useState<{
    bank: "KAKAO_BANK" | "SHINHAN" | "WOORI" | "KB" | "NH" | "HANA" | "IBK" | "TOSS_BANK";
    imgFile: File | null;
  }>({
    bank: "KAKAO_BANK",
    imgFile: null,
  });
  const [open, setOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [editData, setEditData] = useState({
    transactionDate: "",
    transactionAmount: "",
    senderName: "",
  });
  const router = useRouter();

  // const handleEditAccountInfo = () => {
  //   if (!ocrResult) return;
  //   setEditData({
  //     transactionDate: ocrResult.transactionDate.toString(),
  //     transactionAmount: ocrResult.transactionAmount.toString(),
  //     senderName: ocrResult.senderName,
  //   });
  //   setOpen(true);
  // };

  // const handleChange = (field: keyof typeof editData, value: string) => {
  //   setEditData((prev) => ({ ...prev, [field]: value }));
  // };

  // const handleUpdateAccount = () => {
  //   setAccountNumber(editData.accountNumber);
  //   setOpen(false);
  //     };

  //   setOpen(false);
  // };

  // const handleCompleteCertification = async () => {
  //   try {
  //     const response = await mockApiRequest(); // 목 API 요청
  //     if (response.success) {
  //       setShowSuccessPopup(true); // 성공 팝업 표시
  //     }
  //   } catch (error) {
  //     console.error("API 요청 실패:", error);
  //   }
  // };

  // const handleCloseSuccessPopup = () => {
  //   setShowSuccessPopup(false);
  //   // 여기에 인증 내역 확인 페이지로 이동하는 로직을 추가
  // };

  //  verification/payment/{id}/result
  const { data: paymentVerificationResult, refetch: refetchPaymentVerificationResult } = useQuery({
    queryKey: ["paymentVerificationResult"],
    queryFn: () => getPaymentVerificationResult(verificationStart?.id),
    enabled: !!verificationStart?.id,
  });

  useEffect(() => {
    console.log("verificationStart", verificationStart);
    console.log("paymentVerificationResult", paymentVerificationResult);
    // if (paymentVerificationResult) {
    //   console.log(paymentVerificationStatus);
    //   const status = refetchPaymentVerificationStatus();
    //   console.log(status);
    // }
  }, [paymentVerificationResult]);

  return (
    <div>
      <div className="w-full">
        <div className="h-[50px] py-[5px] w-full flex items-center pl-[9px] bg-gray-0 mb-4">
          <button onClick={() => router.push("/verif")} className="z-10">
            <Image src={x} alt="" />
          </button>
          <p className="title-sm text-gray-80 text-center w-full ml-[-36px]">저축 인증하기</p>
        </div>
        {imageUrl && (
          <div className="flex justify-center relative">
            <Image
              src={imageUrl}
              alt="Uploaded Passbook"
              width={320}
              height={240}
              className="rounded-[16px] w-[320px] h-[280px] object-cover mb-[24px] shadow-lg"
              style={{
                objectPosition: "50% 15%",
                boxShadow: "0 0px 1px #CDD1D5, 0 4px 2px #CDD1D5",
              }}
            />
            {ocrResult?.highlightBoxes?.map((box, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: box.y,
                  left: box.x,
                  width: box.width,
                  height: box.height,
                  border: "2px solid red",
                }}
              />
            ))}
          </div>
        )}

        {/* 인증 내역 */}
        <div className="w-[320px] h-auto bg-gray-5 rounded-[16px] p-[20px] mx-auto">
          <div className="title-sm text-gray-90 mb-[16px]">인증 내역</div>

          <div className="border-t-[1px] border-b-[1px] border-gray-10 my-[16px]" />

          {ocrResult?.accountNumber && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">계좌 번호</span>
              <span className="body-md text-gray-80">{ocrResult.accountNumber}</span>
            </div>
          )}

          {ocrResult?.transactionDate && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">거래 일시</span>
              <span className="body-md text-gray-80">{ocrResult.transactionDate}</span>
            </div>
          )}

          {ocrResult?.transactionAmount && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">거래 금액</span>
              <span className="body-md text-gray-80">
                {Number(ocrResult.transactionAmount).toLocaleString()} 원
              </span>
            </div>
          )}

          {ocrResult?.senderName && (
            <div className="flex justify-left mb-[8px] gap-[4px]">
              <span className="text-gray-80 title-xs">보낸 사람</span>
              <span className="body-md text-gray-80">{ocrResult.senderName}</span>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="fixed bottom-[20px] left-0 right-0">
          <div className="flex flex-col justify-center items-center">
            <p className="title-xs text-gray-80">인증 내역이 맞는지</p>
            <p className="title-xs text-gray-80">다시 한번 확인해주세요.</p>
          </div>

          <div className="flex justify-center gap-[4px] mt-[24px]">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="small" variant="secondary" onClick={handleEditAccountInfo}>
                  수정하기
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="sm:max-w-full border-t border-[#EDEFF1] h-[466px] bg-white p-[20px] rounded-t-xl"
              >
                <div className="h-1 w-[60px] bg-[#EDEFF1] mx-auto rounded-full mb-[20px]"></div>
                <div className="flex flex-col h-full justify-between">
                  <div className="mt-[15px]">
                    <h3 className="text-gray-80 title-sm mb-[24px]">수정하기</h3>
                    <div>
                      <div className="mt-[24px]">
                        <span className="label-md text-gray-70">거래일시</span>
                        <Input
                          type="text"
                          value={editData.transactionDate}
                          onChange={(e) => handleChange("transactionDate", e.target.value)}
                          className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
                        />
                      </div>

                      <div className="mt-[24px]">
                        <span className="label-md text-gray-70">거래금액</span>
                        <Input
                          type="text"
                          value={editData.transactionAmount}
                          onChange={(e) => handleChange("transactionAmount", e.target.value)}
                          className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
                        />
                      </div>

                      <div className="mt-[24px]">
                        <span className="label-md text-gray-70">보낸사람</span>
                        <Input
                          type="text"
                          value={editData.senderName}
                          onChange={(e) => handleChange("senderName", e.target.value)}
                          className="pb-[12px] border-b border-[#B1B8BE] border-x-transparent border-t-transparent shadow-none rounded-none title-md text-gray-50 pl-0 py-4"
                        />
                      </div>

                      <div className="flex items-center justify-center p-[20px]">
                        <Button size="large" onClick={handleUpdateAccount}>
                          수정 완료
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* 인증 완료 버튼 */}
            <Button size="small" onClick={handleCompleteCertification}>
              인증완료
            </Button>
          </div>
        </div>

        {/* 성공 팝업 */}
        {showSuccessPopup && <SuccessPopup onClose={handleCloseSuccessPopup} />}
      </div>
    </div>
  );
};

export default ScreenPage;
