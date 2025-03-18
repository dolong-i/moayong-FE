import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import { DialogTitle } from 'src/components/ui/dialog';

interface ImageUploadFormProps {
  onComplete: () => void;
  onEdit: () => void;
}

const ImageUploadForm = ({ onComplete, onEdit }: ImageUploadFormProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // 이미지 업로드 로직
    if (image) {
      console.log('이미지 업로드:', image);
      // TODO: 이미지 업로드 API 호출
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button onClick={handleSubmit}>이미지 업로드</Button>
      </div>
      <Button onClick={onEdit}>수정하기</Button>
      <Button onClick={onComplete}>인증 완료</Button>
    </>
  );
};

export default ImageUploadForm;
