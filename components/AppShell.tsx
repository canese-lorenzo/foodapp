"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenuSync } from "@/providers/MenuSyncProvider";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/menu", label: "Menu" },
  { href: "/chat", label: "Chat" },
  { href: "/preview", label: "Preview" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { restaurant, user } = useMenuSync();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">MenuSync Copilot</p>
            <h1 className="text-xl font-semibold text-[var(--foreground)]">{restaurant.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex rounded-md border border-[var(--border)] bg-[#f2f5f0] p-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    className={`rounded px-3 py-2 text-sm font-medium transition ${
                      isActive ? "bg-white text-[var(--accent-strong)] shadow-sm" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--muted)] sm:block">
              {user.name} / {user.role}
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
