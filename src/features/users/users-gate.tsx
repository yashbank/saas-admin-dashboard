"use client";

import { useAuthStore } from "@/stores/auth-store";
import { canAccessUsers } from "@/lib/rbac";

export function UsersGate({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const role = useAuthStore((s) => s.user?.role);
  if (!canAccessUsers(role)) return <>{fallback}</>;
  return <>{children}</>;
}
