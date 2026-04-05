"use client";

import { ArrowDownRight, ArrowUpRight, TrendingUp, Users, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { DASHBOARD_KPIS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

const items = [
  {
    label: "Active users",
    value: formatNumber(DASHBOARD_KPIS.totalUsers),
    delta: DASHBOARD_KPIS.userDelta,
    icon: Users,
    hint: "30-day rolling",
  },
  {
    label: "Net revenue",
    value: formatCurrency(DASHBOARD_KPIS.revenue),
    delta: DASHBOARD_KPIS.revenueDelta,
    icon: Wallet,
    hint: "Recognized MRR + services",
  },
  {
    label: "Growth score",
    value: `${DASHBOARD_KPIS.growth}%`,
    delta: DASHBOARD_KPIS.growthDelta,
    icon: TrendingUp,
    hint: "QoQ velocity",
  },
];

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        const positive = item.delta >= 0;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="glass-card border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent shadow-none">
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground">
                      {item.value}
                    </p>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/20">
                    <Icon className="size-5 text-emerald-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.hint}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ring-1",
                      positive
                        ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25"
                        : "bg-rose-500/15 text-rose-300 ring-rose-400/25"
                    )}
                  >
                    {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                    {positive ? "+" : ""}
                    {item.delta}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
