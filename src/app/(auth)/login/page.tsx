import { Suspense } from "react";
import { LoginForm } from "@/features/auth/login-form";

function LoginFallback() {
  return (
    <div className="glass-card mx-auto w-full max-w-md animate-pulse p-12">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-white/10" />
      <div className="mx-auto mt-6 h-6 w-48 rounded bg-white/10" />
      <div className="mt-8 space-y-4">
        <div className="h-11 rounded-lg bg-white/10" />
        <div className="h-11 rounded-lg bg-white/10" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-lg">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
