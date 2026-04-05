"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldOff } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AccessDenied() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card mx-auto max-w-lg border-amber-500/20 p-10 text-center"
    >
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-500/15 ring-1 ring-amber-400/30">
        <ShieldOff className="size-7 text-amber-200" />
      </div>
      <h2 className="mt-6 font-heading text-xl font-semibold">Restricted area</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        User management is limited to administrators. Ask an admin to upgrade your role if you need access.
      </p>
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: "secondary" }), "mt-8 inline-flex")}
      >
        Back to overview
      </Link>
    </motion.div>
  );
}
