import type { SessionPayload } from "@/types";

/** Edge-safe decode for middleware (no Node Buffer). */
export function decodeSessionEdge(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const pad = (4 - (b64.length % 4)) % 4;
    const padded = b64 + "=".repeat(pad);
    const json = atob(padded);
    const data = JSON.parse(json) as SessionPayload;
    if (!data.exp || data.exp < Date.now()) return null;
    if (!data.email || !data.role) return null;
    return data;
  } catch {
    return null;
  }
}
