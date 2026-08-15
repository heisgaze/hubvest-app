import BottomNav from "@/components/petani/ui/BottomNav";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { getRoleCookie } from "@/app/actions";
import { MobileFrame } from "@/components/common/MobileFrame";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roleId = await getRoleCookie();
  const isTengkulak = roleId === "t1";

  if (isTengkulak) {
    return (
      <div className="relative">
        {children}
        <RoleSwitcher currentRoleId={roleId} />
      </div>
    );
  }

  return (
    <MobileFrame>
      <div id="app-root-frame" className="min-h-screen flex flex-col bg-[#F8F9FA] relative">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24">{children}</main>
        <BottomNav />
        <RoleSwitcher currentRoleId={roleId} />
      </div>
    </MobileFrame>
  );
}
