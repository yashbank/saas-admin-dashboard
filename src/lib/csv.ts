import type { User } from "@/types";

export function usersToCsv(rows: User[]): string {
  const header = ["name", "email", "role", "status"];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [r.name, r.email, r.role, r.status]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];
  return lines.join("\n");
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
