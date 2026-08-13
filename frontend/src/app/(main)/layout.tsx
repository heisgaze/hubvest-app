import BottomNav from "@/components/ui/BottomNav";
import RoleSwitcher from "@/components/ui/RoleSwitcher";
import { getRoleCookie } from "@/app/actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roleId = await getRoleCookie();
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-surface-bg relative">
      <main className="pb-safe">{children}</main>
      <BottomNav />
      <RoleSwitcher currentRoleId={roleId} />
    </div>
  );
}
