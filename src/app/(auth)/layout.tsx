export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(16,185,129,0.15),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 noise opacity-50" />
      {children}
    </div>
  );
}
