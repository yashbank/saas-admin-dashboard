"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
import { MOCK_USERS } from "@/lib/mock-data";

type UsersState = {
  extra: User[];
  addFromSignup: (u: User) => void;
};

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      extra: [],
      addFromSignup: (u) => {
        const exists = [...MOCK_USERS, ...get().extra].some((x) => x.email === u.email);
        if (exists) return;
        set({ extra: [...get().extra, u] });
      },
    }),
    {
      name: "saas-users-extra",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function getMergedUsers(extra: User[]): User[] {
  const seen = new Set<string>();
  const out: User[] = [];
  for (const u of [...MOCK_USERS, ...extra]) {
    if (seen.has(u.email)) continue;
    seen.add(u.email);
    out.push(u);
  }
  return out;
}
