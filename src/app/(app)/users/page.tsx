import { AppHeader } from "@/components/layout/app-header";
import { PageTransition } from "@/components/layout/page-transition";
import { UsersTable } from "@/features/users/users-table";
import { AccessDenied } from "@/features/users/access-denied";
import { UsersGate } from "@/features/users/users-gate";

export default function UsersPage() {
  return (
    <>
      <AppHeader title="Users" subtitle="Roles, status, and workspace membership." />
      <PageTransition className="flex-1 space-y-8 px-4 py-8 md:px-8">
        <UsersGate fallback={<AccessDenied />}>
          <UsersTable />
        </UsersGate>
      </PageTransition>
    </>
  );
}
