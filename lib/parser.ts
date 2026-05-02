import type { ChangeRequest, MenuItem, ParsedChangeResult } from "@/lib/types";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\w\s.\u20ac-]/g, " ").replace(/\s+/g, " ").trim();
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function findItem(fragment: string, items: MenuItem[]) {
  const normalizedFragment = normalize(fragment);

  if (!normalizedFragment) {
    return [];
  }

  return items.filter((item) => {
    const itemName = normalize(item.name);
    return itemName.includes(normalizedFragment) || normalizedFragment.includes(itemName);
  });
}

function buildRequest(params: {
  originalMessage: string;
  item: MenuItem;
  createdBy: string;
  field: "availabilityStatus" | "basePrice";
  beforeValue: string | number;
  afterValue: string | number;
  summary: string;
  warning?: string;
  confidence: number;
}): ChangeRequest {
  return {
    id: makeId("change"),
    createdBy: params.createdBy,
    originalMessage: params.originalMessage,
    status: "pending_approval",
    confidence: params.confidence,
    riskLevel: params.field === "basePrice" ? "medium" : "low",
    summary: params.summary,
    warning: params.warning,
    createdAt: new Date().toISOString(),
    action: {
      id: makeId("action"),
      actionType: params.field === "basePrice" ? "update_price" : "update_availability",
      targetItemId: params.item.id,
      field: params.field,
      beforeValue: params.beforeValue,
      afterValue: params.afterValue
    }
  };
}

export function parseMenuCommand(message: string, items: MenuItem[], createdBy: string): ParsedChangeResult {
  const normalized = normalize(message);

  const availabilityMatch = normalized.match(/^(?:mark|set|make)\s+(.+?)\s+(unavailable|available)$/);

  if (availabilityMatch) {
    const [, itemFragment, status] = availabilityMatch;
    const matches = findItem(itemFragment, items);

    if (matches.length === 0) {
      return {
        ok: false,
        kind: "no_match",
        message: `I could not find a menu item matching "${itemFragment}". Try the exact item name.`
      };
    }

    if (matches.length > 1) {
      return {
        ok: false,
        kind: "ambiguous",
        message: `I found multiple possible matches for "${itemFragment}". Choose one before publishing.`,
        matches
      };
    }

    const item = matches[0];
    const nextStatus = status as "available" | "unavailable";

    return {
      ok: true,
      request: buildRequest({
        originalMessage: message,
        item,
        createdBy,
        field: "availabilityStatus",
        beforeValue: item.availabilityStatus,
        afterValue: nextStatus,
        summary: `${item.name} will be marked ${nextStatus} on the source-of-truth menu.`,
        warning: "Website preview updates after approval. Delivery channels are not connected in P0.",
        confidence: 0.94
      })
    };
  }

  const priceMatch = normalized.match(/^increase\s+(.+?)\s+by\s+\u20ac?\s?(\d+(?:\.\d{1,2})?)$/);

  if (priceMatch) {
    const [, itemFragment, amountText] = priceMatch;
    const matches = findItem(itemFragment, items);
    const amount = Number(amountText);

    if (matches.length === 0) {
      return {
        ok: false,
        kind: "no_match",
        message: `I could not find a menu item matching "${itemFragment}". Try the exact item name.`
      };
    }

    if (matches.length > 1) {
      return {
        ok: false,
        kind: "ambiguous",
        message: `I found multiple possible matches for "${itemFragment}". Choose one before publishing.`,
        matches
      };
    }

    const item = matches[0];
    const nextPrice = Number((item.basePrice + amount).toFixed(2));

    return {
      ok: true,
      request: buildRequest({
        originalMessage: message,
        item,
        createdBy,
        field: "basePrice",
        beforeValue: item.basePrice,
        afterValue: nextPrice,
        summary: `${item.name} will increase from EUR ${item.basePrice.toFixed(2)} to EUR ${nextPrice.toFixed(2)}.`,
        warning: "Price changes are medium risk. Review carefully before approval.",
        confidence: 0.91
      })
    };
  }

  return {
    ok: false,
    kind: "unsupported",
    message: "I can parse availability changes and price increases for P0. Try: mark tiramisu unavailable, make tiramisu available, or increase margherita by 1."
  };
}
