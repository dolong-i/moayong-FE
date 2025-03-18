// src/_components/register/AuthModal.tsx
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from 'src/components/ui/dialog';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountNumber: string;
  bankName: string;
  onComplete: () => void;
  onEdit: () => void;
}

const AuthModal = ({ isOpen, onClose, accountNumber, bankName, onComplete, onEdit }: AuthModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [balance, setBalance] = useState('1,000,000'); // 예시 잔액

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>통장 인증</DialogTitle>
          <DialogDescription>
            계좌 정보를 확인하고, 통장 사본을 업로드해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="accountNumber" className="text-right">
              계좌번호
            </label>
            <Input type="text" id="accountNumber" value={accountNumber} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="bankName" className="text-right">
              은행명
            </label>
            <Input type="text" id="bankName" value={bankName} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="balance" className="text-right">
              잔액
            </label>
            <Input type="text" id="balance" value={balance} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="imageUpload" className="text-right">
              통장사본
            </label>
            <Input type="file" id="imageUpload" className="col-span-3" accept="image/*" onChange={handleImageChange} />
          </div>
          {image && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="imagePreview" className="text-right">
                미리보기
              </label>
              <img src={URL.createObjectURL(image)} alt="Uploaded" className="col-span-3 max-h-40 object-contain" />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onEdit}>
            수정하기
          </Button>
          <Button type="submit" onClick={onComplete}>
            인증 완료
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
