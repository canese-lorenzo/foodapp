"use client";

import { formatCurrency } from "@/lib/format";
import { useMenuSync } from "@/providers/MenuSyncProvider";

export default function PreviewPage() {
  const { categories, menuItems, restaurant } = useMenuSync();
  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      <section className="border-b border-[var(--border)] pb-5">
        <p className="text-sm font-medium text-[var(--accent)]">Public menu preview</p>
        <h2 className="mt-1 text-3xl font-semibold">{restaurant.name}</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Customer-facing view powered by the internal source-of-truth menu.
        </p>
      </section>

      <div className="space-y-8">
        {sortedCategories.map((category) => {
          const categoryItems = menuItems.filter((item) => item.categoryId === category.id);

          return (
            <section key={category.id}>
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {categoryItems.map((item) => {
                  const unavailable = item.availabilityStatus === "unavailable";

                  return (
                    <article
                      className={`rounded-lg border bg-white p-4 shadow-sm ${
                        unavailable ? "border-[#e1b8b8] opacity-70" : "border-[var(--border)]"
                      }`}
                      key={item.id}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
                        </div>
                        <p className="shrink-0 font-semibold">{formatCurrency(item.basePrice, item.currency)}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-xs text-[var(--muted)]">
                          {item.allergens.length > 0 ? `Allergens: ${item.allergens.join(", ")}` : "No allergens listed"}
                        </p>
                        {unavailable ? (
                          <span className="rounded-md bg-[#fff0f0] px-2 py-1 text-xs font-semibold text-[var(--danger)]">
                            Unavailable
                          </span>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
