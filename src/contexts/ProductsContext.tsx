import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as staticProducts, deriveStockStatus, isPurchasable, stockStatusLabel, type Product } from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Storefront catalog.
 *
 * Static data (src/data/products.ts) is the supplier-verified source of truth
 * for content: names, specs, features, shipping, warranty, SEO. Supabase is the
 * source of truth for OPERATIONAL state — price, stock, active visibility,
 * images, and compare-at price — so edits made in the admin dashboard go live
 * immediately without a redeploy.
 *
 * When Supabase is unconfigured or has no matching rows, the static catalog
 * stands in, so the site always renders.
 */

export interface StorefrontProduct extends Product {}

interface ProductsContextType {
  /** Catalog as the storefront should display it (active products only unless inactive rows exist). */
  products: StorefrontProduct[];
  /** Fetch a product by slug from the live catalog. */
  getBySlug: (slug: string) => StorefrontProduct | undefined;
  /** True once a Supabase catalog has been fetched (even if it came back empty). */
  synced: boolean;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

type CatalogRow = {
  id: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  stock: number;
  low_stock_threshold: number;
  active: boolean;
  images: string[] | null;
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Product[]>(staticProducts);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    supabase
      .from("products")
      .select("id, slug, price, compare_at_price, stock, low_stock_threshold, active, images")
      .then(({ data }) => {
        if (cancelled || !data || data.length === 0) {
          if (!cancelled) setSynced(true);
          return;
        }
        // Merge operational state onto the verified static content.
        const merged = staticProducts.map((p) => {
          const row = (data as unknown as CatalogRow[]).find((r) => r.id === p.id);
          if (!row) return p;
          const inventory = {
            ...p.inventory,
            unitsOnHand: row.stock,
            lowStockThreshold: row.low_stock_threshold,
          };
          const stockStatus = deriveStockStatus(inventory);
          // Admin-managed images replace the static placeholders entirely when
          // present (non-empty array); otherwise the static gallery stands in.
          const dbImages = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
          const compareAt =
            row.compare_at_price !== null && Number(row.compare_at_price) > Number(row.price)
              ? Number(row.compare_at_price)
              : undefined;
          return {
            ...p,
            price: Number(row.price),
            compareAtPrice: compareAt,
            images: dbImages.length > 0 ? dbImages : p.images,
            inventory,
            stockStatus,
            inStock: isPurchasable(stockStatus),
            availabilityLabel:
              row.active === false
                ? "Currently Unavailable"
                : stockStatusLabel(stockStatus),
          };
        });
        const active = merged.filter((p) => p.availabilityLabel !== "Currently Unavailable");
        if (!cancelled) {
          setCatalog(active.length > 0 ? active : merged);
          setSynced(true);
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
