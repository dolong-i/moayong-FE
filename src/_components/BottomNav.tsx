import { Home, Trophy, User } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive = false }: NavItemProps) {
  const colorClass = isActive ? "text-green-600" : "text-gray-400";

  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      <div className={`w-6 h-6 ${colorClass}`}>{icon}</div>
      <span className={`text-xs ${colorClass}`}>{label}</span>
    </Link>
  );
}

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-between items-center px-6 py-2">
        <NavItem href="/" icon={<Home />} label="홈" />
        <NavItem href="/league" icon={<Trophy />} label="나의 리그" />
        <NavItem href="/mypage" icon={<User />} label="마이" isActive />
      </div>
    </div>
  );
}
