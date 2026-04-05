"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SALES_TREND } from "@/lib/mock-data";

const chartData = SALES_TREND;

export function SalesLineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="glass-card h-full border-white/[0.08] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-lg">Sales trend</CardTitle>
          <CardDescription>Revenue vs. forecast — trailing 8 months</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillFc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.2 280)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="oklch(0.62 0.2 280)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "oklch(0.62 0.02 260)", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  tick={{ fill: "oklch(0.62 0.02 260)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.14 0.03 265 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                    backdropFilter: "blur(12px)",
                  }}
                  labelStyle={{ color: "oklch(0.95 0.01 260)" }}
                  formatter={(value, name) => [
                    `$${Number(value ?? 0).toLocaleString()}`,
                    name === "revenue" ? "Revenue" : "Forecast",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="oklch(0.62 0.2 280)"
                  strokeWidth={2}
                  fill="url(#fillFc)"
                  dot={false}
                  isAnimationActive
                  animationDuration={1200}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.72 0.17 160)"
                  strokeWidth={2.5}
                  fill="url(#fillRev)"
                  dot={{ r: 3, fill: "oklch(0.72 0.17 160)", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
