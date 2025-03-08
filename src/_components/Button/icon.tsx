import Button from "src/_components/Button";
import { cn } from "src/_lib/utils";
import IconCamera from "src/assets/icon-camera";

interface IconProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Icon = ({ children, disabled = false, onClick, className }: IconProps) => {
  return (
    <Button.Default
      variant="default"
      size={"large"}
      className={cn("label-md", className)}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="bg-gray-40">
        <IconCamera width={32} height={32} />
      </div>
      {children}
    </Button.Default>
  );
};

export default Icon;
