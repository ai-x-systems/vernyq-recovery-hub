import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  products as staticProducts,
  deriveStockStatus,
  isPurchasable,
  stockStatusLabel,
  DEFAULT_SHIPPING,
  DEFAULT_WARRANTY,
  type Product,
} from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Storefront catalog.
 *
 * Supabase `products` rows are the live source of truth for the storefront —
 * every field the admin can edit (title, description, tagline, badge, price,
 * compare-at, specs, features, what's included, SEO, images, stock,
 * visibility, reviews toggle) is read from the database and rendered as-is.
 *
 * Static data (src/data/products.ts) is the supplier-verified fallback used
 * when Supabase is unconfigured or has no rows for a known product, so the
 * site always renders verified content. A DB-only product (created in the
 * admin) renders entirely from its DB row.
 */

export interface StorefrontProduct extends Product {}

interface ProductsContextType {
  products: StorefrontProduct[];
  getBySlug: (slug: string) => StorefrontProduct | undefined;
  /** True once the initial Supabase fetch completed (even if empty). */
  synced: boolean;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

type CatalogRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  badge: string | null;
  description: string | null;
  short_description: string | null;
  tagline: string | null;
  seo_title: string | null;
  seo_description: string | null;
  specifications: Record<string, string> | null;
  features: { title?: string; description?: string }[] | null;
  whats_included: string[] | null;
  images: string[] | null;
  stock: number;
  low_stock_threshold: number;
  active: boolean;
  reviews_enabled: boolean | null;
};

function rowToProduct(row: CatalogRow, fallback?: Product): Product {
  const inventory = {
    unitsOnHand: row.stock,
    lowStockThreshold: row.low_stock_threshold,
  };
  const stockStatus = deriveStockStatus(inventory);

  // DB values win; verified static content stands in where the DB is empty.
  const dbImages = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
  const dbSpecs = row.specifications && Object.keys(row.specifications).length > 0
    ? row.specifications
    : undefined;
  const dbFeatures = Array.isArray(row.features) && row.features.length > 0
    ? row.features
        .filter((f) => f && typeof f.title === "string")
        .map((f) => ({ title: f.title as string, description: typeof f.description === "string" ? f.description : "" }))
    : undefined;
  const dbIncluded = Array.isArray(row.whats_included) && row.whats_included.length > 0
    ? row.whats_included.filter((i): i is string => typeof i === "string" && i.length > 0)
    : undefined;

  const compareAt =
    row.compare_at_price !== null && Number(row.compare_at_price) > Number(row.price)
      ? Number(row.compare_at_price)
      : undefined;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? fallback?.tagline ?? row.short_description ?? "",
    shortDescription: row.short_description ?? fallback?.shortDescription ?? "",
    description: row.description ?? fallback?.description ?? "",
    price: Number(row.price),
    compareAtPrice: compareAt ?? fallback?.compareAtPrice,
    images: dbImages.length > 0 ? dbImages : fallback?.images ?? [],
    badge: row.badge ?? fallback?.badge,
    specifications: dbSpecs ?? fallback?.specifications ?? {},
    whatsIncluded: dbIncluded ?? fallback?.whatsIncluded ?? [],
    features: dbFeatures ?? fallback?.features ?? [],
    shipping: fallback?.shipping ?? DEFAULT_SHIPPING,
    warranty: fallback?.warranty ?? DEFAULT_WARRANTY,
    category: fallback?.category ?? "cold-plunge-tubs",
    inventory,
    stockStatus,
    inStock: isPurchasable(stockStatus),
    availabilityLabel:
      row.active === false
        ? "Currently Unavailable"
        : stockStatusLabel(stockStatus),
    fulfillment: fallback?.fulfillment ?? {
      supplierId: "INTERNAL",
      supplierSku: row.id.toUpperCase(),
      warehouseRegion: "US",
      dispatchBusinessDays: 3,
      deliveryBusinessDaysEstimate: 7,
      incoterms: "DDP",
    },
    seo: {
      title: row.seo_title ?? `${row.name} | VERNYQ`,
      description: row.seo_description ?? row.short_description ?? "",
    },
    reviewsEnabled: row.reviews_enabled !== false,
  };
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Product[]>(staticProducts);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    supabase
      .from("products")
      .select("*")
      .then(({ data }) => {
        if (cancelled) return;
        setSynced(true);
        if (!data || data.length === 0) return;

        const rows = data as unknown as CatalogRow[];
        // Active rows drive the public catalog; inactive known products fall
        // back to their static entry only if every product is inactive
        // (prevents an empty storefront from a single toggle mistake).
        const mapped = rows
          .map((row) => rowToProduct(row, staticProducts.find((p) => p.id === row.id)))
          .filter((p) => p.availabilityLabel !== "Currently Unavailable");

        if (mapped.length > 0) {
          setCatalog(mapped);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<ProductsContextType>(
    () => ({
      products: catalog,
      getBySlug: (slug: string) => catalog.find((p) => p.slug === slug),
      synced,
    }),
    [catalog, synced]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
