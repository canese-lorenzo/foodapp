"use client";

import { createContext, useContext, useState } from "react";
import { categories, location, menuItems, mockUser, restaurant } from "@/data/seed";
import { parseMenuCommand } from "@/lib/parser";
import type { AuditLogEntry, ChangeRequest, MenuItem, ParsedChangeResult } from "@/lib/types";

interface MenuSyncContextValue {
  restaurant: typeof restaurant;
  location: typeof location;
  user: typeof mockUser;
  categories: typeof categories;
  menuItems: MenuItem[];
  auditLog: AuditLogEntry[];
  pendingChange: ChangeRequest | null;
  parseCommand: (message: string) => ParsedChangeResult;
  setPendingChange: (change: ChangeRequest | null) => void;
  approveChange: (change: ChangeRequest) => void;
  rejectChange: () => void;
  updateMenuItem: (itemId: string, updates: Partial<MenuItem>) => void;
}

const MenuSyncContext = createContext<MenuSyncContextValue | null>(null);

export function MenuSyncProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [pendingChange, setPendingChange] = useState<ChangeRequest | null>(null);

  function updateMenuItem(itemId: string, updates: Partial<MenuItem>) {
    setItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...updates,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }

  function parseCommand(message: string) {
    const result = parseMenuCommand(message, items, mockUser.id);
    if (result.ok) {
      setPendingChange(result.request);
    }
    return result;
  }

  function approveChange(change: ChangeRequest) {
    const item = items.find((candidate) => candidate.id === change.action.targetItemId);

    if (!item) {
      return;
    }

    updateMenuItem(item.id, {
      [change.action.field]: change.action.afterValue
    } as Partial<MenuItem>);

    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      userId: mockUser.id,
      userName: mockUser.name,
      eventType: "change_approved",
      entityType: "menu_item",
      entityId: item.id,
      originalMessage: change.originalMessage,
      summary: change.summary,
      beforeValue: change.action.beforeValue,
      afterValue: change.action.afterValue,
      createdAt: new Date().toISOString()
    };

    setAuditLog((current) => [entry, ...current]);
    setPendingChange(null);
  }

  function rejectChange() {
    setPendingChange(null);
  }

  const value = {
    restaurant,
    location,
    user: mockUser,
    categories,
    menuItems: items,
    auditLog,
    pendingChange,
    parseCommand,
    setPendingChange,
    approveChange,
    rejectChange,
    updateMenuItem
  };

  return <MenuSyncContext.Provider value={value}>{children}</MenuSyncContext.Provider>;
}

export function useMenuSync() {
  const context = useContext(MenuSyncContext);

  if (!context) {
    throw new Error("useMenuSync must be used inside MenuSyncProvider");
  }

  return context;
}
