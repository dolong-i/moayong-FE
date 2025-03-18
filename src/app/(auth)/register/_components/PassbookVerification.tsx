'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import upload from 'src/assets/images/upload.png'
import sample from 'src/assets/images/sample-img.png'
import press from 'src/assets/images/press.png';
import check from 'src/assets/icon-check.svg';

const PassbookVerification = ({ onClick, keyName }: {
  onClick: (key: string, value: any) => void;
  keyName: string
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const imageDataURL = e?.target?.result;
        setSelectedImage(imageDataURL);

        // OCR 분석 결과 (목데이터)
        const ocrResult = {
          accountNumber: '123-456-7890', // 가짜 계좌번호
          bankBalance: '50000',
          highlightBoxes: [
            { x: 50, y: 100, width: 200, height: 30 }, // 가짜 위치 정보
            { x: 100, y: 150, width: 150, height: 25 },
          ],
        };

        onClick(keyName, { imageDataURL, ocrResult }); // 이미지 데이터와 OCR 결과 전달
      };
      reader.readAsDataURL(file);
      // 업로드 후 API 요청을 보냄
      setIsLoading(true);
      try {
        // API 요청 (예시)

        // const formData = new FormData();
        // formData.append('image', file);

        // const response = await fetch('/api/upload-passbook', {
        //   method = 'POST',
        //   body = formData,
        // });
        // const data = await response.json();

        // 예시로 응답 데이터를 처리하는 부분
        // if (data.success) {
        //   setAccountNumber(data.accountNumber);
        //   setBalance(data.balance);
        // if (onClick) onClick(keyName, data); // onClick 실행 (다음 단계로 넘어감)

        // } else {
        //   alert('통장 인증 실패');
        // }
      } catch (error) {
        console.error('Error uploading passbook image:', error);
        alert('통장 인증에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center h-screen min-h-screen">
      <div className="bg-gray-5 border border-gray-20 rounded-[16px] w-[320px] h-[280px] flex flex-col items-center justify-center mx-[20px]">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Uploaded Passbook"
            width={320}
            height={280}
            className="rounded-lg border border-gray-200 overflow-hidden"
          />
        ) : (
          <label className="w-full flex title-xs items-center justify-center text-gray-50 cursor-pointer  w-[320px] h-[280px]">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={upload}
                alt="Uploaded Passbook"
                width={50}
                height={50}
              />
              <span className="mt-2">이미지 추가하기</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className='flex justify-left items-center gap-[4px] mt-[24px] mb-[10px] w-[320px] m-auto'>
        <Image
          src={press}
          alt=""
        />
        <p className='title-xs text-info pt-1'>꼭 확인해 주세요!</p>
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

      <div className='border-4 border-[#F6F6F6] w-full mt-[40px]'></div>

      <div className='my-[40px] flex flex-col items-center pb-20'>
        <p className='title-md text-gray-80 mb-[16px] mx-[20px] w-[320px] text-left'>
          이미지 인증 예시
        </p>
        <div className="flex justify-center">
          <Image src={sample} alt="인증 예시 이미지" className='mx-[20px]' />
        </div>
      </div>

      {isLoading ? (
        <p>인증 중...</p>
      ) : (
        <button onClick={() => onClick(keyName, 'test')}>다음</button>
      )}
    </div>
  );
};

export default PassbookVerification;
