import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface ProductReview {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string | null;
  body: string;
  approved: boolean;
  created_at: string;
}

/**
 * Approved customer reviews for a product, plus aggregate stats used for
 * the summary row and Product JSON-LD (aggregateRating).
 */
export function useProductReviews(productId: string | undefined) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!productId || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    setReviews((data as unknown as ProductReview[]) || []);
    setLoading(false);
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  const count = reviews.length;
  const average = count > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;

  return { reviews, loading, count, average };
}

export interface ReviewSubmission {
  productId: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
}

/** Submits a review for moderation. Returns an error message or null. */
export async function submitReview(sub: ReviewSubmission): Promise<string | null> {
  if (!isSupabaseConfigured) return "Reviews are not available right now.";
  const { error } = await supabase.from("product_reviews").insert({
    product_id: sub.productId,
    author_name: sub.authorName.trim().slice(0, 80),
    rating: sub.rating,
    title: sub.title.trim().slice(0, 120) || null,
    body: sub.body.trim().slice(0, 2000),
    approved: false,
  });
  return error ? "Could not submit your review. Please try again." : null;
}
