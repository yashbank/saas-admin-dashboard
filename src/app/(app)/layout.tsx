import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(16,185,129,0.12),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(59,130,246,0.08),transparent_45%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 noise opacity-60" />
      <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:shrink-0">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
