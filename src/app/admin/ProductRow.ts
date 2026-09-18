export type ProductRow = {
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
  created_at: string;
};

export type ReviewRow = {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string | null;
  body: string;
  approved: boolean;
  created_at: string;
};

/** URL-safe slug from a product name; keeps digits and existing dashes. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
