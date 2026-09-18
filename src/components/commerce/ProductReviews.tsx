import { useState } from "react";
import { Star, Check, ChevronDown, MessageSquarePlus } from "lucide-react";
import { useProductReviews, submitReview, type ProductReview } from "@/lib/reviews";
import { SectionHeader } from "@/components/commerce/SectionHeader";

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= Math.round(value) ? "fill-[#b8923e] text-[#b8923e]" : "text-[#e0ddd8]"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Verified-purchase-free moderation note — reviews publish only after approval. */
function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <div className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Stars value={review.rating} />
        {review.title && <p className="text-body font-medium text-[#0A182E]">{review.title}</p>}
        <span className="text-caption text-[#888888] ml-auto">{formatDate(review.created_at)}</span>
      </div>
      <p className="text-body-sm text-[#555555] mt-3 leading-relaxed whitespace-pre-wrap">{review.body}</p>
      <p className="text-caption text-[#888888] mt-3">{review.author_name}</p>
    </div>
  );
}

function ReviewForm({ productId, onSubmitted }: { productId: string; onSubmitted: () => void }) {
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await submitReview({ productId, authorName, rating, title, body });
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    setDone(true);
    onSubmitted();
  };

  if (done) {
    return (
      <div className="bg-[#faf9f7] border border-[#4a8a5c]/30 rounded-[0.5rem] p-6 text-center">
        <Check className="size-6 text-[#4a8a5c] mx-auto mb-2" aria-hidden="true" />
        <p className="text-body font-medium text-[#0A182E]">Thank you — your review was submitted.</p>
        <p className="text-body-sm text-[#555555] mt-1">It will appear once our team has approved it.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6 space-y-4">
      <p className="text-body font-medium text-[#0A182E]">Write a review</p>
      <div>
        <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Your rating *</label>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={rating === i}
              aria-label={`${i} star${i > 1 ? "s" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i)}
              className="p-0.5"
            >
              <Star
                className={`size-6 ${(hovered || rating) >= i ? "fill-[#b8923e] text-[#b8923e]" : "text-[#e0ddd8]"}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Name *</label>
          <input
            type="text"
            required
            maxLength={80}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="First name, or a nickname"
            className="w-full h-11 px-4 bg-white border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
          />
        </div>
        <div>
          <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Headline</label>
          <input
            type="text"
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum it up in a line"
            className="w-full h-11 px-4 bg-white border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Review *</label>
        <textarea
          required
          maxLength={2000}
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="How is your plunge? What should other customers know?"
          className="w-full px-4 py-3 bg-white border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors resize-none"
        />
      </div>
      {error && <p className="text-body-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="h-11 px-6 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50"
      >
        {busy ? "Submitting..." : "Submit Review"}
      </button>
      <p className="text-caption text-[#888888]">Reviews are moderated before publishing.</p>
    </form>
  );
}

export function ProductReviews({ productId, productName }: { productId: string; productName: string }) {
  const { reviews, count, average, loading } = useProductReviews(productId);
  const [formOpen, setFormOpen] = useState(false);
  const [listExpanded, setListExpanded] = useState(false);

  // Don't render the section when reviews are off or nothing exists yet and
  // the form is closed — keeps product pages clean pre-launch.
  if (loading) return null;

  const visible = listExpanded ? reviews : reviews.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-[#faf9f7]" aria-labelledby="reviews-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader overline="Reviews" title={`${productName} Reviews`} />
        {count > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Stars value={average} className="size-5" />
            <p className="text-body-sm text-[#555555]">
              <span className="font-medium text-[#0A182E]">{average.toFixed(1)}</span> · {count} review{count !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="mt-10 max-w-3xl mx-auto space-y-4">
          {reviews.length === 0 ? (
            <p className="text-body-sm text-[#888888] text-center">
              No reviews yet — be the first to share your experience.
            </p>
          ) : (
            visible.map((r) => <ReviewCard key={r.id} review={r} />)
          )}

          {reviews.length > 3 && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setListExpanded(!listExpanded)}
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors"
                aria-expanded={listExpanded}
              >
                {listExpanded ? "Show fewer" : `Show all ${count} reviews`}
                <ChevronDown className={`size-4 transition-transform ${listExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
          )}

          {formOpen ? (
            <ReviewForm productId={productId} onSubmitted={() => setFormOpen(false)} />
          ) : (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center gap-2 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors"
              >
                <MessageSquarePlus className="size-4" aria-hidden="true" />
                Write a review
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
