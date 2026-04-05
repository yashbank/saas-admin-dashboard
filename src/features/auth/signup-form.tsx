"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";
import { useUsersStore } from "@/stores/users-store";

export function SignupForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const addFromSignup = useUsersStore((s) => s.addFromSignup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not create account.");
        return;
      }
      if (data.user) {
        addFromSignup(data.user);
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
      }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-6"
    >
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/25 to-cyan-500/20 ring-1 ring-white/10">
          <UserPlus className="size-6 text-emerald-300" />
        </div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Create your workspace</h2>
        <p className="text-sm text-muted-foreground">New accounts get the standard user role.</p>
      </div>

      <div className="glass-card space-y-4 p-6 sm:p-8">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Lee"
            required
            className="h-11 border-white/10 bg-white/[0.04]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="h-11 border-white/10 bg-white/[0.04]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="h-11 border-white/10 bg-white/[0.04]"
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="h-11 w-full gap-2" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Get started
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have access?{" "}
          <Link href="/login" className="font-medium text-emerald-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.form>
  );
}
