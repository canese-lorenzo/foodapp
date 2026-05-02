export type UserRole = "owner" | "manager" | "staff";

export type AvailabilityStatus = "available" | "unavailable";

export type ChangeStatus = "pending_approval" | "approved" | "rejected";

export type ActionType = "update_availability" | "update_price";

export interface Restaurant {
  id: string;
  name: string;
  country: string;
  timezone: string;
  currency: string;
  defaultLanguage: string;
}

export interface Location {
  id: string;
  restaurantId: string;
  name: string;
  address: string;
  timezone: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  availabilityStatus: AvailabilityStatus;
  allergens: string[];
  imageUrl: string;
  channelAvailability: Record<string, AvailabilityStatus>;
  channelPriceOverrides: Record<string, number | undefined>;
  locationAvailability: Record<string, AvailabilityStatus>;
  updatedAt: string;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ChangeAction {
  id: string;
  actionType: ActionType;
  targetItemId: string;
  field: "availabilityStatus" | "basePrice";
  beforeValue: string | number;
  afterValue: string | number;
}

export interface ChangeRequest {
  id: string;
  createdBy: string;
  originalMessage: string;
  status: ChangeStatus;
  confidence: number;
  riskLevel: "low" | "medium";
  summary: string;
  warning?: string;
  createdAt: string;
  action: ChangeAction;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  eventType: "change_approved";
  entityType: "menu_item";
  entityId: string;
  originalMessage: string;
  summary: string;
  beforeValue: string | number;
  afterValue: string | number;
  createdAt: string;
}

export interface ParsedChangeSuccess {
  ok: true;
  request: ChangeRequest;
}

export interface ParsedChangeFailure {
  ok: false;
  kind: "no_match" | "ambiguous" | "unsupported";
  message: string;
  matches?: MenuItem[];
}

export type ParsedChangeResult = ParsedChangeSuccess | ParsedChangeFailure;
