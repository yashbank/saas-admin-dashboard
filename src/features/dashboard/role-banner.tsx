"use client";

import { Info } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

export function RoleBanner() {
  const role = useAuthStore((s) => s.user?.role);
  if (role !== "user") return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100/90">
      <Info className="mt-0.5 size-4 shrink-0 text-cyan-300" />
      <p>
        <span className="font-medium text-cyan-50">Standard access.</span> Billing exports and user administration
        require an administrator. You still have full visibility on workspace analytics.
      </p>
    </div>
  );
}
