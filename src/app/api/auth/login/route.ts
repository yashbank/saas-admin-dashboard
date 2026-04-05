import { NextResponse } from "next/server";
import { CREDENTIALS } from "@/lib/mock-data";
import { encodeSession, SESSION_COOKIE } from "@/lib/session";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const row = CREDENTIALS[email];
  if (!row || row.password !== password) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const u = row.user;
  const token = encodeSession({
    sub: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
  });

  const res = NextResponse.json({
    user: {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    },
  });
  res.cookies.set(SESSION_COOKIE, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
