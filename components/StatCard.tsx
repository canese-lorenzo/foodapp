export function StatCard({
  label,
  value,
  detail
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
    </section>
  );
}
