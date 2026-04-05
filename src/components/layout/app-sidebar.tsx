"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { canAccessUsers } from "@/lib/rbac";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, adminOnly: false },
  { href: "/users", label: "Team & users", icon: Users, adminOnly: true },
];

export function AppSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const role = useAuthStore((s) => s.user?.role);

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/25 to-cyan-500/20 ring-1 ring-white/10">
          <Sparkles className="size-5 text-emerald-300" aria-hidden />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold tracking-tight text-sidebar-foreground">
            Nebula Ops
          </p>
          <p className="text-xs text-muted-foreground">Control plane</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 pb-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
          Workspace
        </p>
        {nav.map((item) => {
          if (item.adminOnly && !canAccessUsers(role)) return null;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-transform group-hover:scale-105",
                  active && "text-emerald-400"
                )}
              />
              {item.label}
              <ChevronRight
                className={cn(
                  "ml-auto size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100",
                  active && "translate-x-0.5 opacity-100 text-emerald-400/80"
                )}
              />
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="glass-panel rounded-lg px-3 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Plan
          </p>
          <p className="mt-0.5 text-sm font-medium text-foreground">Enterprise</p>
          <p className="text-xs text-muted-foreground">Usage & billing · coming soon</p>
        </div>
      </div>
    </aside>
  );
}
