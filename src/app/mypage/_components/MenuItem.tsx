import Link from "next/link";
import { Arrow } from "src/components/common/Icons/Arrow";

interface MenuItemProps {
  href: string;
  label: string;
}

export function MenuItem({ href, label }: MenuItemProps) {
  return (
    <Link href={href} className="flex items-center justify-between py-3.5">
      <span className="label-lg text-gray-80">{label}</span>
      <Arrow />
    </Link>
  );
}
