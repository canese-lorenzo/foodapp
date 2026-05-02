"use client";

import { formatCurrency } from "@/lib/format";
import type { ChangeRequest, MenuItem } from "@/lib/types";

function displayValue(value: string | number, item: MenuItem, field: ChangeRequest["action"]["field"]) {
  if (field === "basePrice" && typeof value === "number") {
    return formatCurrency(value, item.currency);
  }

  return String(value);
}

export function ApprovalPanel({
  change,
  item,
  onApprove,
  onReject
}: {
  change: ChangeRequest;
  item: MenuItem;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">Pending approval</p>
          <h2 className="mt-1 text-xl font-semibold">{change.summary}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Original command: {change.originalMessage}</p>
        </div>
        <span className="w-fit rounded-md border border-[#e6d1a4] bg-[#fff8e6] px-3 py-1 text-sm font-medium text-[var(--warning)]">
          {change.riskLevel} risk
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-[var(--border)] bg-[#f8faf7] p-3">
          <p className="text-xs uppercase text-[var(--muted)]">Item</p>
          <p className="mt-1 font-semibold">{item.name}</p>
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[#fff8f8] p-3">
          <p className="text-xs uppercase text-[var(--muted)]">Before</p>
          <p className="mt-1 font-semibold">{displayValue(change.action.beforeValue, item, change.action.field)}</p>
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[#eff8f5] p-3">
          <p className="text-xs uppercase text-[var(--muted)]">After</p>
          <p className="mt-1 font-semibold">{displayValue(change.action.afterValue, item, change.action.field)}</p>
        </div>
      </div>

      {change.warning ? (
        <p className="mt-4 rounded-md border border-[#e6d1a4] bg-[#fffaf0] px-3 py-2 text-sm text-[var(--warning)]">
          {change.warning}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          className="rounded-md bg-[var(--accent)] px-4 py-2 font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          onClick={onApprove}
          type="button"
        >
          Approve change
        </button>
        <button
          className="rounded-md border border-[var(--border)] bg-white px-4 py-2 font-semibold text-[var(--foreground)] transition hover:bg-[#f4f6f2]"
          onClick={onReject}
          type="button"
        >
          Reject
        </button>
      </div>
    </section>
  );
}
