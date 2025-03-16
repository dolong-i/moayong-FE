import React from "react";
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from "src/components/ui/button";
import { cn } from "src/lib/utils";

interface DefaultButtonProps extends Omit<ShadcnButtonProps, "type"> {
  buttonType?: "primary" | "secondary";
  type?: "button" | "submit";
  customStyles?: {
    default?: string;
    hover?: string;
    pressed?: string;
    disabled?: string;
  };
  onClick?: () => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  buttonType = "primary",
  type = "button",
  size = "medium",
  customStyles,
  className,
  disabled,
  variant: propVariant,
  onClick = () => {},
  ...props
}) => {
  // Shadcn 버튼의 variant와 명시적으로 타입 지정
  const variantMapping = {
    primary: "default" as const,
    secondary: "secondary" as const,
    tertiary: "ghost" as const,
  };

  // 명시적 variant 선택
  const variant = propVariant || variantMapping[buttonType];

  return (
    <ShadcnButton
      onClick={onClick}
      variant={variant}
      size={size}
      type={type}
      className={cn(
        // 추가 커스텀 스타일
        customStyles?.default,
        !disabled && customStyles?.hover,
        !disabled && customStyles?.pressed,
        disabled && customStyles?.disabled,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default DefaultButton;
