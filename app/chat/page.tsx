"use client";

import { FormEvent, useState } from "react";
import { ApprovalPanel } from "@/components/ApprovalPanel";
import { AuditList } from "@/components/AuditList";
import { useMenuSync } from "@/providers/MenuSyncProvider";
import type { ParsedChangeFailure } from "@/lib/types";

const suggestedCommands = [
  "mark tiramisu unavailable",
  "make lemon tart available",
  "increase margherita by 1",
  "mark burger unavailable"
];

export default function ChatPage() {
  const { auditLog, approveChange, menuItems, parseCommand, pendingChange, rejectChange } = useMenuSync();
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<ParsedChangeFailure | null>(null);

  const pendingItem = pendingChange
    ? menuItems.find((item) => item.id === pendingChange.action.targetItemId) ?? null
    : null;

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const result = parseCommand(message);

    if (result.ok) {
      setFeedback(null);
    } else {
      setFeedback(result);
    }
  }

  function applySuggestion(command: string) {
    setMessage(command);
    const result = parseCommand(command);
    setFeedback(result.ok ? null : result);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium text-[var(--accent)]">Chat command center</p>
          <h2 className="mt-1 text-2xl font-semibold">Request a menu change</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            P0 uses a deterministic parser for availability and price increase commands.
          </p>
        </div>

        <form className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm" onSubmit={submitCommand}>
          <label className="text-sm font-semibold" htmlFor="command">
            Command
          </label>
          <input
            className="mt-2 w-full rounded-md border border-[var(--border)] px-3 py-3 outline-none focus:border-[var(--accent)]"
            id="command"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="mark tiramisu unavailable"
            value={message}
          />
          <button
            className="mt-3 w-full rounded-md bg-[var(--accent)] px-4 py-2 font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            type="submit"
          >
            Parse command
          </button>
        </form>

        <div className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">Suggested commands</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedCommands.map((command) => (
              <button
                className="rounded-md border border-[var(--border)] bg-[#f7f9f6] px-3 py-2 text-sm font-medium hover:bg-white"
                key={command}
                onClick={() => applySuggestion(command)}
                type="button"
              >
                {command}
              </button>
            ))}
          </div>
        </div>

        {feedback ? (
          <div className="rounded-lg border border-[#e6d1a4] bg-[#fffaf0] p-4 text-sm text-[var(--warning)]">
            <p className="font-semibold">{feedback.kind === "ambiguous" ? "Clarification needed" : "Could not parse"}</p>
            <p className="mt-1">{feedback.message}</p>
            {feedback.matches ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {feedback.matches.map((item) => (
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-medium" key={item.id}>
                    {item.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        {pendingChange && pendingItem ? (
          <ApprovalPanel
            change={pendingChange}
            item={pendingItem}
            onApprove={() => approveChange(pendingChange)}
            onReject={rejectChange}
          />
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--border)] bg-white p-6 text-sm text-[var(--muted)]">
            Parsed changes will appear here for approval before anything updates.
          </div>
        )}

        <div>
          <h2 className="mb-3 text-lg font-semibold">Audit log</h2>
          <AuditList entries={auditLog} />
        </div>
      </section>
    </div>
  );
}
