import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeSessionEdge } from "@/lib/session-edge";
import { SESSION_COOKIE } from "@/lib/auth-constants";

const protectedPrefixes = ["/dashboard", "/users"];
const authPrefixes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = decodeSessionEdge(token);

  const isProtected = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAuthPage = authPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtected && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*", "/login", "/signup"],
};
