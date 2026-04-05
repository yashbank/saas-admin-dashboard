import type { Role } from "@/types";

export function canAccessUsers(role: Role | undefined): boolean {
  return role === "admin";
}

export function canExport(role: Role | undefined): boolean {
  return role === "admin";
}
