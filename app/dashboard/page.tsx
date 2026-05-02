"use client";

import Link from "next/link";
import { AuditList } from "@/components/AuditList";
import { StatCard } from "@/components/StatCard";
import { useMenuSync } from "@/providers/MenuSyncProvider";

export default function DashboardPage() {
  const { auditLog, location, menuItems, restaurant } = useMenuSync();
  const unavailableCount = menuItems.filter((item) => item.availabilityStatus === "unavailable").length;
  const averagePrice =
    menuItems.length === 0 ? 0 : menuItems.reduce((total, item) => total + item.basePrice, 0) / menuItems.length;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--accent)]">Source-of-truth workspace</p>
          <h2 className="mt-1 text-2xl font-semibold">{restaurant.name}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {location.name} / {location.address} / {restaurant.currency}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="rounded-md bg-[var(--accent)] px-4 py-2 font-semibold text-white" href="/chat">
            Open chat
          </Link>
          <Link className="rounded-md border border-[var(--border)] px-4 py-2 font-semibold" href="/preview">
            View preview
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard detail="Items in the internal official menu." label="Menu items" value={menuItems.length} />
        <StatCard detail="Items hidden from the public preview." label="Unavailable" value={unavailableCount} />
        <StatCard detail="Across all seeded menu items." label="Average price" value={`EUR ${averagePrice.toFixed(2)}`} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent approved changes</h2>
            <p className="text-sm text-[var(--muted)]">Audit trail for the local P0 prototype.</p>
          </div>
        </div>
        <AuditList entries={auditLog} />
      </section>
    </div>
  );
}
