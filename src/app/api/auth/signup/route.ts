import { NextResponse } from "next/server";
import { CREDENTIALS, MOCK_USERS } from "@/lib/mock-data";
import { encodeSession, SESSION_COOKIE } from "@/lib/session";
import type { User } from "@/types";

function randomId() {
  return `usr_${Math.random().toString(36).slice(2, 12)}`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const taken =
    email in CREDENTIALS || MOCK_USERS.some((u) => u.email.toLowerCase() === email);
  if (taken) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const user: User = {
    id: randomId(),
    name,
    email,
    role: "user",
    status: "active",
  };

  const token = encodeSession({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const res = NextResponse.json({ user });
  res.cookies.set(SESSION_COOKIE, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
