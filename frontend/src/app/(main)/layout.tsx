import BottomNav from "@/components/petani/ui/BottomNav";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { getRoleCookie } from "@/app/actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roleId = await getRoleCookie();
  const isTengkulak = roleId === "c25594e8-7901-40ae-b202-da8d1512990d";

  if (isTengkulak) {
    return (
      <div className="relative">
        {children}
        <RoleSwitcher currentRoleId={roleId} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-surface-bg relative">
      <main className="pb-safe">{children}</main>
      <BottomNav />
      <RoleSwitcher currentRoleId={roleId} />
    </div>
  );
}
