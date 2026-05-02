"use client";

import { MenuTable } from "@/components/MenuTable";
import { StatCard } from "@/components/StatCard";
import { useMenuSync } from "@/providers/MenuSyncProvider";

export default function MenuPage() {
  const { categories, menuItems } = useMenuSync();
  const unavailableCount = menuItems.filter((item) => item.availabilityStatus === "unavailable").length;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-[var(--accent)]">Internal official menu</p>
        <h2 className="mt-1 text-2xl font-semibold">Source-of-truth menu</h2>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
          This menu is the trusted version inside MenuSync. Approved chat changes update this data first, and the
          public menu preview reads from it.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard detail="Grouped into operational categories." label="Categories" value={categories.length} />
        <StatCard detail="Seed/sample items for the P0 loop." label="Items" value={menuItems.length} />
        <StatCard detail="Currently not orderable." label="Unavailable" value={unavailableCount} />
      </section>

      <MenuTable categories={categories} items={menuItems} />
    </div>
  );
}
