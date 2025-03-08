import { cn } from "src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant: "primary" | "gray";
}

export const Badge = ({ children, variant }: BadgeProps) => {
  const bgStyle = {
    primary: "bg-green-50",
    gray: "bg-gray-5",
  };
  const textStyle = {
    primary: "text-white",
    gray: "text-green-50",
  };
  console.log("children", children);
  return (
    <div className={cn("rounded-[4px] w-fit", bgStyle[variant])}>
      <div className={cn(textStyle[variant], "caption-sm py-1 px-1.5")}>{children}</div>
    </div>
  );
};
