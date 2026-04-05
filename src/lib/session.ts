import type { SessionPayload } from "@/types";
import { SESSION_COOKIE } from "@/lib/auth-constants";

export function encodeSession(payload: Omit<SessionPayload, "exp"> & { exp?: number }): string {
  const full: SessionPayload = {
    ...payload,
    exp: payload.exp ?? Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  return Buffer.from(JSON.stringify(full), "utf8").toString("base64url");
}

export function decodeSession(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    const data = JSON.parse(json) as SessionPayload;
    if (!data.exp || data.exp < Date.now()) return null;
    if (!data.email || !data.role) return null;
    return data;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE };
