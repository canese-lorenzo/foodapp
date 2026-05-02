import type { Location, MenuCategory, MenuItem, MockUser, Restaurant } from "@/lib/types";

export const mockUser: MockUser = {
  id: "user-1",
  name: "Luca Manager",
  email: "luca@casaverde.example",
  role: "manager"
};

export const restaurant: Restaurant = {
  id: "restaurant-1",
  name: "Casa Verde",
  country: "Spain",
  timezone: "Atlantic/Canary",
  currency: "EUR",
  defaultLanguage: "en"
};

export const location: Location = {
  id: "location-1",
  restaurantId: restaurant.id,
  name: "Main Dining Room",
  address: "Calle del Puerto 18, Las Palmas",
  timezone: "Atlantic/Canary"
};

export const categories: MenuCategory[] = [
  { id: "cat-starters", name: "Starters", sortOrder: 1 },
  { id: "cat-pasta", name: "Pasta", sortOrder: 2 },
  { id: "cat-mains", name: "Mains", sortOrder: 3 },
  { id: "cat-desserts", name: "Desserts", sortOrder: 4 }
];

const now = new Date().toISOString();
const channels = { website: "available", glovo: "available", ubereats: "available", justeat: "available" } as const;

export const menuItems: MenuItem[] = [
  {
    id: "item-bruschetta",
    restaurantId: restaurant.id,
    categoryId: "cat-starters",
    name: "Tomato Bruschetta",
    description: "Grilled sourdough with marinated tomatoes, basil, and olive oil.",
    basePrice: 6.5,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-octopus",
    restaurantId: restaurant.id,
    categoryId: "cat-starters",
    name: "Octopus Salad",
    description: "Tender octopus with potatoes, paprika, parsley, and lemon.",
    basePrice: 14,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["molluscs"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-margherita",
    restaurantId: restaurant.id,
    categoryId: "cat-mains",
    name: "Margherita Pizza",
    description: "San Marzano tomato, mozzarella, basil, and extra virgin olive oil.",
    basePrice: 10.5,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten", "milk"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: { glovo: 11.5, ubereats: 11.9 },
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-diavola",
    restaurantId: restaurant.id,
    categoryId: "cat-mains",
    name: "Diavola Pizza",
    description: "Spicy salami, tomato, mozzarella, oregano, and chili oil.",
    basePrice: 12.5,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten", "milk"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-carbonara",
    restaurantId: restaurant.id,
    categoryId: "cat-pasta",
    name: "Carbonara",
    description: "Spaghetti with egg yolk, pecorino, black pepper, and guanciale.",
    basePrice: 13,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten", "egg", "milk"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-pesto",
    restaurantId: restaurant.id,
    categoryId: "cat-pasta",
    name: "Pesto Linguine",
    description: "Linguine with basil pesto, toasted pine nuts, and aged parmesan.",
    basePrice: 12,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten", "nuts", "milk"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-truffle-burger",
    restaurantId: restaurant.id,
    categoryId: "cat-mains",
    name: "Truffle Burger",
    description: "Beef patty, truffle mayo, provolone, rocket, and brioche bun.",
    basePrice: 15.5,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten", "egg", "milk"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-vegan-burger",
    restaurantId: restaurant.id,
    categoryId: "cat-mains",
    name: "Vegan Burger",
    description: "Plant patty, tomato relish, lettuce, pickles, and toasted bun.",
    basePrice: 14,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-sea-bass",
    restaurantId: restaurant.id,
    categoryId: "cat-mains",
    name: "Grilled Sea Bass",
    description: "Whole sea bass with herbs, lemon, seasonal greens, and potatoes.",
    basePrice: 19,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["fish"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-curry",
    restaurantId: restaurant.id,
    categoryId: "cat-mains",
    name: "Chicken Curry",
    description: "Coconut curry with chicken, jasmine rice, coriander, and lime.",
    basePrice: 11.9,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: [],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-tiramisu",
    restaurantId: restaurant.id,
    categoryId: "cat-desserts",
    name: "Tiramisu",
    description: "Mascarpone cream, espresso-soaked ladyfingers, and cocoa.",
    basePrice: 6,
    currency: "EUR",
    availabilityStatus: "available",
    allergens: ["gluten", "egg", "milk"],
    imageUrl: "",
    channelAvailability: { ...channels },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "available" },
    updatedAt: now
  },
  {
    id: "item-lemon-tart",
    restaurantId: restaurant.id,
    categoryId: "cat-desserts",
    name: "Lemon Tart",
    description: "Buttery tart shell, lemon curd, and toasted meringue.",
    basePrice: 5.5,
    currency: "EUR",
    availabilityStatus: "unavailable",
    allergens: ["gluten", "egg", "milk"],
    imageUrl: "",
    channelAvailability: { website: "unavailable", glovo: "unavailable", ubereats: "unavailable", justeat: "unavailable" },
    channelPriceOverrides: {},
    locationAvailability: { [location.id]: "unavailable" },
    updatedAt: now
  }
];
