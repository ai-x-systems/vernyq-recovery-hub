// ============================================================
// VERNYQ product catalog
//
// SOURCE OF TRUTH: supplier-confirmed facts only (see brief).
// Anything not verified is OMITTED — do not invent specs.
// Flags for human review are marked with REVIEW: comments.
// ============================================================

export interface Inventory {
  /** Internal operational data — never displayed as a customer-facing count. */
  unitsOnHand: number;
  lowStockThreshold: number;
  /** Force a special state (e.g. "preorder") regardless of unit count. */
  override?: "preorder" | "unavailable";
}

export type InventoryStatus =
  | "in_stock"
  | "low_stock"
  | "sold_out"
  | "preorder"
  | "unavailable";

/**
 * INTERNAL fulfillment profile. Never render any of this customer-facing.
 * Supplier identity and commercial terms are intentionally NOT stored in
 * this public repository — they live in internal ops records. This profile
 * only captures the fulfillment facts needed to run the store.
 */
export interface FulfillmentProfile {
  supplierId: string; // neutral internal ID — real identity in ops records
  supplierSku: string;
  warehouseRegion: string;
  dispatchBusinessDays: number;
  deliveryBusinessDaysEstimate: number;
  /** Delivered Duty Paid — no import charges for U.S. customers. */
  incoterms: "DDP";
}

export interface ProductSeo {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badge?: string;
  specifications: Record<string, string>;
  dimensions?: string;
  whatsIncluded: string[];
  features: { title: string; description: string }[];
  shipping: { estimated: string; note: string };
  warranty: { duration: string; coverage: string };
  category: string;
  /** Derived from inventory — kept for cart/checkout compatibility. */
  inStock: boolean;
  stockStatus: InventoryStatus;
  availabilityLabel: string;
  inventory: Inventory;
  /** INTERNAL — never render customer-facing. */
  fulfillment: FulfillmentProfile;
  seo: ProductSeo;
}

// ------------------------------------------------------------
// SHARED, VERIFIED SPECIFICATIONS (identical for V3 and A3)
// ------------------------------------------------------------
const SHARED_SPECIFICATIONS: Record<string, string> = {
  Type: "All-in-one cold plunge (cooling + heating)",
  "Temperature Range": "1–40°C (34–104°F)",
  Chiller: "Integrated, 1 HP",
  Connectivity: "Wi-Fi with app control",
  Power: "110V / 60Hz (standard outlet)",
  Installation: "Freestanding",
};

const SHARED_FEATURES: { title: string; description: string }[] = [
  {
    title: "Cooling & Heating",
    description:
      "One unit covers the full 1–40°C range — cold plunges, warm soaks, or contrast routines, all from the same tub.",
  },
  {
    title: "Integrated 1 HP Chiller",
    description:
      "Cools and heats without ice. Set a target temperature and the chiller holds it, session after session.",
  },
  {
    title: "Wi-Fi + App Control",
    description:
      "Adjust and monitor your water temperature from your phone — your plunge is ready before you are.",
  },
  {
    title: "Plug-In Simple",
    description:
      "Runs on a standard 110V / 60Hz outlet. Freestanding design — no special wiring required.",
  },
  {
    title: "U.S. Warehouse Stock",
    description:
      "Ships from a U.S. warehouse. Dispatch in roughly 3 business days after payment verification, delivery in roughly 7.",
  },
];

// Customer-facing shipping copy — conservative, matches confirmed fulfillment facts.
const SHIPPING_COPY = {
  estimated: "≈ 7 business days after dispatch",
  note:
    "Dispatch in roughly 3 business days after payment verification. Freight includes ground-level unloading at mainland U.S. residential addresses. Indoor placement and installation are not included. Remote or special-service areas may incur additional charges.",
};

// Customer-facing warranty copy — matches confirmed terms exactly.
const WARRANTY_COPY = {
  duration: "1 year",
  coverage:
    "Covers qualifying non-human-caused damage with replacement parts, major component replacement, and whole-unit replacement in qualifying cases. Online customer service and after-sales engineering support included. After the warranty period, replacement parts may be chargeable.",
};

// ------------------------------------------------------------
// MEDIA
// REVIEW BEFORE LAUNCH: supplier product photos/videos are not yet in the
// repo. Both models currently share neutral water/recovery imagery and MUST
// be replaced with verified V3 / A3 supplier media before publishing — do
// not present these as the exact product appearance.
// ------------------------------------------------------------
const PLACEHOLDER_GALLERY = [
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80",
  "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80",
];

// REVIEW BEFORE LAUNCH: retail price has not been finalized by the owner.
// Same value for both models because V3 and A3 are identical in performance;
// the only verified difference is appearance.
const LAUNCH_PRICE = 3999;

export function deriveStockStatus(inv: Inventory): InventoryStatus {
  if (inv.override) return inv.override;
  if (inv.unitsOnHand <= 0) return "sold_out";
  if (inv.unitsOnHand <= inv.lowStockThreshold) return "low_stock";
  return "in_stock";
}

export function stockStatusLabel(status: InventoryStatus): string {
  switch (status) {
    case "in_stock":
      return "In Stock — Ships from our U.S. warehouse";
    case "low_stock":
      return "Low Stock — Ships from our U.S. warehouse";
    case "preorder":
      return "Available for Preorder";
    case "sold_out":
      return "Sold Out";
    case "unavailable":
      return "Currently Unavailable";
  }
}

export function isPurchasable(status: InventoryStatus): boolean {
  return status === "in_stock" || status === "low_stock" || status === "preorder";
}

const V3: Product = {
  id: "vernyq-v3",
  slug: "vernyq-v3-all-in-one-cold-plunge",
  name: "VERNYQ V3",
  tagline: "All-in-one cold plunge. Cooling and heating from 1°C to 40°C — one unit, one standard outlet.",
  shortDescription:
    "Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.",
  description:
    "The VERNYQ V3 is a complete cold water immersion system in a single freestanding unit. An integrated 1 HP chiller cools down to 1°C and heats up to 40°C, so one product covers cold plunges, warm soaks, and contrast routines. Wi-Fi and app control let you set your target temperature from your phone, and it all runs on a standard 110V outlet — fill it, plug it in, set your temperature.",
  price: LAUNCH_PRICE,
  images: PLACEHOLDER_GALLERY,
  specifications: { Model: "V3", ...SHARED_SPECIFICATIONS },
  whatsIncluded: [
    "VERNYQ V3 all-in-one unit (tub with integrated 1 HP chiller)",
  ],
  features: SHARED_FEATURES,
  shipping: SHIPPING_COPY,
  warranty: WARRANTY_COPY,
  category: "cold-plunge-tubs",
  inStock: true,
  stockStatus: "in_stock",
  availabilityLabel: "",
  inventory: {
    // Supplier-confirmed current U.S. units. Internal data — the site shows
    // a stock status, never this count. Update here or via the admin panel.
    unitsOnHand: 6,
    lowStockThreshold: 3,
  },
  fulfillment: {
    supplierId: "SUP-001",
    supplierSku: "VQ-V3-US",
    warehouseRegion: "US",
    dispatchBusinessDays: 3,
    deliveryBusinessDaysEstimate: 7,
    incoterms: "DDP",
  },
  seo: {
    title: "VERNYQ V3 All-in-One Cold Plunge | 1–40°C Cooling & Heating",
    description:
      "All-in-one cold plunge with cooling & heating, 1–40°C range, 1 HP integrated chiller, and Wi-Fi app control. U.S. stock, delivery in about a week.",
  },
};

const A3: Product = {
  id: "vernyq-a3",
  slug: "vernyq-a3-all-in-one-cold-plunge",
  name: "VERNYQ A3",
  tagline: "All-in-one cold plunge with the same 1–40°C performance — in a different design.",
  shortDescription:
    "Cooling + heating, 1–40°C. Integrated 1 HP chiller, Wi-Fi app control, standard 110V outlet.",
  description:
    "The VERNYQ A3 delivers the identical performance as the V3 — the same integrated 1 HP chiller, the same 1–40°C cooling and heating range, the same Wi-Fi app control — in a different exterior design. If you want the full VERNYQ all-in-one experience and prefer the A3 look, you give up nothing else. Runs on a standard 110V outlet; fill it, plug it in, set your temperature.",
  price: LAUNCH_PRICE,
  images: PLACEHOLDER_GALLERY,
  specifications: { Model: "A3", ...SHARED_SPECIFICATIONS },
  whatsIncluded: [
    "VERNYQ A3 all-in-one unit (tub with integrated 1 HP chiller)",
  ],
  features: SHARED_FEATURES,
  shipping: SHIPPING_COPY,
  warranty: WARRANTY_COPY,
  category: "cold-plunge-tubs",
  inStock: true,
  stockStatus: "in_stock",
  availabilityLabel: "",
  inventory: {
    unitsOnHand: 21,
    lowStockThreshold: 3,
  },
  fulfillment: {
    supplierId: "SUP-001",
    supplierSku: "VQ-A3-US",
    warehouseRegion: "US",
    dispatchBusinessDays: 3,
    deliveryBusinessDaysEstimate: 7,
    incoterms: "DDP",
  },
  seo: {
    title: "VERNYQ A3 All-in-One Cold Plunge | 1–40°C Cooling & Heating",
    description:
      "All-in-one cold plunge with cooling & heating, 1–40°C range, 1 HP integrated chiller, and Wi-Fi app control. U.S. stock, delivery in about a week.",
  },
};

// Normalize derived fields so cart/checkout keep working.
function finalize(p: Product): Product {
  const stockStatus = deriveStockStatus(p.inventory);
  return {
    ...p,
    stockStatus,
    inStock: isPurchasable(stockStatus),
    availabilityLabel: stockStatusLabel(stockStatus),
  };
}

export const products: Product[] = [V3, A3].map(finalize);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceDetailed(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}
