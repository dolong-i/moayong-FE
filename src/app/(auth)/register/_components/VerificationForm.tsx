// src/_components/register/VerificationForm.tsx
import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "src/components/ui/sheet"; // Sheet 컴포넌트 import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select"; // Select 컴포넌트 import

interface VerificationFormProps {
  onComplete: (bankName: string, accountNumber: string) => void;
}

const VerificationForm = ({ onComplete }: VerificationFormProps) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [savingsBank, setSavingsBank] = useState(""); // 저축 통장 종류 상태 추가
  const [open, setOpen] = useState(false); // 바텀시트 열림/닫힘 상태 추가

  const handleSubmit = () => {
    // 통장 인증 로직
    console.log("통장 인증:", bankName, accountNumber);
    onComplete(bankName, accountNumber); // 개별적으로 전달
  };

  const handleUpdate = () => {
    // 수정 완료 로직
    console.log("수정 완료:", savingsBank, accountNumber);
    setOpen(false); // 바텀시트 닫기
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          placeholder="은행명"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="계좌번호"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <Button onClick={handleSubmit}>인증하기</Button>
      </div>

      {/* 수정하기 버튼 - 바텀시트 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>수정하기</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="sm:max-w-full">
          <div className="flex flex-col h-full justify-between">
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold">계좌 정보 수정</h2>
              <p className="text-sm text-gray-500">정확한 계좌 정보를 입력해주세요.</p>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid gap-2">
                <label
                  htmlFor="saving-type"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  저축 통장
                </label>
                <Select onValueChange={setSavingsBank} defaultValue={savingsBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">정기 예금</SelectItem>
                    <SelectItem value="savings">자유 적금</SelectItem>
                    <SelectItem value="checking">체크 통장</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="account-number"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  계좌 번호
                </label>
                <Input
                  type="text"
                  id="account-number"
                  placeholder="계좌 번호를 입력하세요"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center p-6">
              <Button onClick={handleUpdate}>수정 완료</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default VerificationForm;
