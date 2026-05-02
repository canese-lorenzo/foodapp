"use client";

import { formatDateTime } from "@/lib/format";
import type { AuditLogEntry } from "@/lib/types";

export function AuditList({ entries }: { entries: AuditLogEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] bg-white p-6 text-sm text-[var(--muted)]">
        No approved changes yet. Approved chat commands will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <article className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm" key={entry.id}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-semibold">{entry.summary}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Command: {entry.originalMessage}</p>
            </div>
            <p className="text-sm text-[var(--muted)]">{formatDateTime(entry.createdAt)}</p>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Approved by {entry.userName}: {String(entry.beforeValue)} -&gt; {String(entry.afterValue)}
          </p>
        </article>
      ))}
    </div>
  );
}
