import type { User } from "@/types";

/** Demo credentials (shown on login page) */
export const DEMO_LOGIN = {
  admin: { email: "admin@acme.dev", password: "admin123" },
  user: { email: "user@acme.dev", password: "user123" },
} as const;

export const CREDENTIALS: Record<
  string,
  { password: string; user: Omit<User, "status"> & { status?: User["status"] } }
> = {
  [DEMO_LOGIN.admin.email]: {
    password: DEMO_LOGIN.admin.password,
    user: {
      id: "usr_admin",
      name: "Alex Rivera",
      email: DEMO_LOGIN.admin.email,
      role: "admin",
      status: "active",
    },
  },
  [DEMO_LOGIN.user.email]: {
    password: DEMO_LOGIN.user.password,
    user: {
      id: "usr_limited",
      name: "Jordan Lee",
      email: DEMO_LOGIN.user.email,
      role: "user",
      status: "active",
    },
  },
};

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "admin@acme.dev",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jordan Lee",
    email: "user@acme.dev",
    role: "user",
    status: "active",
  },
  {
    id: "3",
    name: "Sam Chen",
    email: "sam.chen@acme.dev",
    role: "user",
    status: "invited",
  },
  {
    id: "4",
    name: "Morgan Blake",
    email: "morgan@acme.dev",
    role: "user",
    status: "active",
  },
  {
    id: "5",
    name: "Riley Park",
    email: "riley@acme.dev",
    role: "admin",
    status: "active",
  },
  {
    id: "6",
    name: "Casey Nguyen",
    email: "casey@acme.dev",
    role: "user",
    status: "suspended",
  },
  {
    id: "7",
    name: "Taylor Brooks",
    email: "taylor@acme.dev",
    role: "user",
    status: "active",
  },
  {
    id: "8",
    name: "Jamie Fox",
    email: "jamie@acme.dev",
    role: "user",
    status: "invited",
  },
  {
    id: "9",
    name: "Drew Ellis",
    email: "drew@acme.dev",
    role: "user",
    status: "active",
  },
  {
    id: "10",
    name: "Quinn Adams",
    email: "quinn@acme.dev",
    role: "admin",
    status: "active",
  },
  {
    id: "11",
    name: "Reese Kim",
    email: "reese@acme.dev",
    role: "user",
    status: "active",
  },
  {
    id: "12",
    name: "Skyler Moore",
    email: "skyler@acme.dev",
    role: "user",
    status: "active",
  },
];

export const SALES_TREND = [
  { month: "Jan", revenue: 42_000, forecast: 38_000 },
  { month: "Feb", revenue: 45_200, forecast: 41_000 },
  { month: "Mar", revenue: 48_900, forecast: 44_500 },
  { month: "Apr", revenue: 52_100, forecast: 48_000 },
  { month: "May", revenue: 49_800, forecast: 50_200 },
  { month: "Jun", revenue: 58_400, forecast: 52_000 },
  { month: "Jul", revenue: 61_200, forecast: 55_000 },
  { month: "Aug", revenue: 64_500, forecast: 58_000 },
];

export const CATEGORY_PERFORMANCE = [
  { category: "Enterprise", value: 42 },
  { category: "Growth", value: 28 },
  { category: "Self-serve", value: 18 },
  { category: "Partners", value: 12 },
];

export const DASHBOARD_KPIS = {
  totalUsers: 12_480,
  userDelta: 12.4,
  revenue: 642_000,
  revenueDelta: 8.2,
  growth: 24.8,
  growthDelta: 3.1,
};
