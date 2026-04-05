"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_PERFORMANCE } from "@/lib/mock-data";

const colors = [
  "oklch(0.72 0.17 160)",
  "oklch(0.62 0.2 280)",
  "oklch(0.78 0.12 45)",
  "oklch(0.58 0.18 200)",
];

export function CategoryBarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="glass-card h-full border-white/[0.08] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-lg">Category mix</CardTitle>
          <CardDescription>Share of pipeline by segment</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_PERFORMANCE} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "oklch(0.62 0.02 260)", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, "dataMax + 5"]}
                  tick={{ fill: "oklch(0.62 0.02 260)", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                  contentStyle={{
                    background: "oklch(0.14 0.03 265 / 0.95)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                  formatter={(value) => [`${value ?? 0}%`, "Share"]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1000}>
                  {CATEGORY_PERFORMANCE.map((_, i) => (
                    <Cell key={_.category} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
