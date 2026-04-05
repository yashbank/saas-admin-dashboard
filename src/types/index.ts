export type Role = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "invited" | "suspended";
}

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  role: Role;
  exp: number;
}
