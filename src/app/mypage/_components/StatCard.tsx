import { cn } from "src/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  iconColor?: string;
  valueColor?: string;
}

export function StatCard({
  icon,
  label,
  value,
  unit = "",

  valueColor = "text-gray-900",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        {icon}
        <span className="caption-md text-gray-60">{label}</span>
      </div>
      <p className={cn("title-lg", valueColor)}>
        {value}
        {unit && <span>{unit}</span>}
      </p>
    </div>
  );
}
