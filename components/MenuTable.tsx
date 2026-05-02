"use client";

import { formatCurrency } from "@/lib/format";
import type { MenuCategory, MenuItem } from "@/lib/types";

export function MenuTable({
  categories,
  items
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-sm">
      <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr] gap-3 border-b border-[var(--border)] bg-[#eef2ec] px-4 py-3 text-xs font-semibold uppercase text-[var(--muted)]">
        <span>Item</span>
        <span>Category</span>
        <span>Price</span>
        <span>Status</span>
      </div>
      {sortedCategories.map((category) => {
        const categoryItems = items.filter((item) => item.categoryId === category.id);

        return categoryItems.map((item) => (
          <div
            className="grid grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr] gap-3 border-b border-[var(--border)] px-4 py-4 last:border-b-0"
            key={item.id}
          >
            <div>
              <p className="font-semibold text-[var(--foreground)]">{item.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Allergens: {item.allergens.length > 0 ? item.allergens.join(", ") : "none listed"}
              </p>
            </div>
            <p className="text-sm text-[var(--muted)]">{category.name}</p>
            <p className="font-medium">{formatCurrency(item.basePrice, item.currency)}</p>
            <StatusBadge status={item.availabilityStatus} />
          </div>
        ));
      })}
    </div>
  );
}

export function StatusBadge({ status }: { status: MenuItem["availabilityStatus"] }) {
  const isAvailable = status === "available";

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-md border px-2 py-1 text-sm font-medium ${
        isAvailable
          ? "border-[#b7d5c8] bg-[#eef8f3] text-[#125b46]"
          : "border-[#e1b8b8] bg-[#fff0f0] text-[var(--danger)]"
      }`}
    >
      <span className={`status-dot ${isAvailable ? "bg-[#2f9f73]" : "bg-[var(--danger)]"}`} />
      {isAvailable ? "Available" : "Unavailable"}
    </span>
  );
}
