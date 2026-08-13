import BottomNav from "@/components/ui/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-surface-bg relative">
      <main className="pb-safe">{children}</main>
      <BottomNav />
    </div>
  );
}
