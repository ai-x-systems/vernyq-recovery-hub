import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Plus, X, Trash2, ExternalLink, Star, Check, ChevronDown, ChevronUp, Search,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { ProductRow, ReviewRow } from "./ProductRow";
import { slugify } from "./ProductRow";
import { SHARED_SPECIFICATIONS } from "@/data/products";

// ---------- Building blocks ----------

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-caption font-medium text-[#0A182E] block mb-1.5">
        {label}
        {hint && <span className="text-[#888888] font-normal"> — {hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-10 px-3 bg-white border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors";
const areaCls =
  "w-full px-3 py-2.5 bg-white border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] transition-colors resize-y";

function CharCount({ value, min, ideal }: { value: number; min?: number; ideal?: number }) {
  const ok = (!min || value >= min) && (!ideal || value <= ideal);
  return (
    <p className={`text-caption mt-1 text-right ${ok ? "text-[#888888]" : "text-amber-600"}`}>
      {value} chars{ideal ? ` (target ≤ ${ideal})` : ""}
    </p>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-[#e0ddd8] rounded-[0.5rem] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#e0ddd8] bg-[#faf9f7]">
        <h2 className="text-body font-medium text-[#0A182E]">{title}</h2>
        {subtitle && <p className="text-caption text-[#888888] mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div>
        <p className="text-body-sm font-medium text-[#0A182E]">{label}</p>
        {hint && <p className="text-caption text-[#888888] mt-0.5">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-[#4a8a5c]" : "bg-[#ccc]"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

function ReviewStars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`size-3.5 ${i <= value ? "fill-[#b8923e] text-[#b8923e]" : "text-[#e0ddd8]"}`} aria-hidden="true" />
      ))}
    </span>
  );
}

// ---------- Section: Media ----------

function MediaSection({ product, onChange, onNotify }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void; onNotify: (m: string) => void }) {
  const [url, setUrl] = useState("");
  const imgs = product.images || [];

  const add = () => {
    const v = url.trim();
    if (!v) return;
    if (!/^https?:\/\//i.test(v)) {
      onNotify("Image URL must start with http:// or https://");
      return;
    }
    onChange({ images: [...imgs, v] });
    setUrl("");
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...imgs];
    const to = idx + dir;
    if (to < 0 || to >= next.length) return;
    [next[idx], next[to]] = [next[to], next[idx]];
    onChange({ images: next });
  };

  const remove = (idx: number) => onChange({ images: imgs.filter((_, i) => i !== idx) });

  return (
    <Card title="Media" subtitle="First image is the primary shot across cards, gallery, and social previews.">
      {imgs.length === 0 ? (
        <p className="text-caption text-amber-600">No images yet — the storefront will fall back to placeholder imagery.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {imgs.map((img, idx) => (
            <div key={`${img}-${idx}`} className="relative group aspect-square rounded-[0.375rem] overflow-hidden border border-[#e0ddd8] bg-[#faf9f7]">
              <img src={img} alt="" className="w-full h-full object-cover" />
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#0A182E] text-white text-[10px] font-medium rounded">Primary</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="Move earlier"
                  className="p-1.5 bg-white/90 rounded text-[#0A182E] disabled:opacity-40 hover:bg-white">←</button>
                <button type="button" onClick={() => remove(idx)} aria-label="Remove image"
                  className="p-1.5 bg-white/90 rounded text-red-600 hover:bg-white">✕</button>
                <button type="button" onClick={() => move(idx, 1)} disabled={idx === imgs.length - 1} aria-label="Move later"
                  className="p-1.5 bg-white/90 rounded text-[#0A182E] disabled:opacity-40 hover:bg-white">→</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste image URL (https://...)"
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} className={inputCls} />
        <button type="button" onClick={add} className="h-10 px-4 bg-[#0A182E] text-white text-caption font-medium rounded-[0.375rem] hover:bg-[#0A182E]/90 shrink-0">Add</button>
      </div>
    </Card>
  );
}

// ---------- Section: Pricing ----------

function PricingSection({ product, onChange }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void }) {
  return (
    <Card title="Pricing">
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Price (USD)">
          <input type="number" defaultValue={Number(product.price)} step="0.01" min="0" key={`price-${product.id}-${product.price}`}
            onBlur={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0 && v !== Number(product.price)) onChange({ price: v }); }}
            className={inputCls} />
        </Field>
        <Field label="Compare-at" hint="show only if higher than price">
          <input type="number" defaultValue={product.compare_at_price ? Number(product.compare_at_price) : ""} step="0.01" min="0" placeholder="—"
            key={`cap-${product.id}-${product.compare_at_price}`}
            onBlur={(e) => { const v = parseFloat(e.target.value); const next = isNaN(v) || v <= 0 ? null : v; if (next !== (product.compare_at_price ? Number(product.compare_at_price) : null)) onChange({ compare_at_price: next }); }}
            className={inputCls} />
        </Field>
        <Field label="Badge" hint="e.g. New, Best Seller">
          <input defaultValue={product.badge || ""} maxLength={24} placeholder="—"
            key={`badge-${product.id}-${product.badge}`}
            onBlur={(e) => { const v = e.target.value.trim(); if (v !== (product.badge || "")) onChange({ badge: v || null }); }}
            className={inputCls} />
        </Field>
      </div>
    </Card>
  );
}

// ---------- Section: Inventory ----------

function InventorySection({ product, onChange }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void }) {
  const state = product.stock <= 0 ? "Sold out" : product.stock <= product.low_stock_threshold ? "Low stock" : "In stock";
  return (
    <Card title="Inventory" subtitle="Customers see a status label, never the raw count.">
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Units on hand">
          <input type="number" defaultValue={product.stock} min="0" key={`stock-${product.id}-${product.stock}`}
            onBlur={(e) => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 0 && v !== product.stock) onChange({ stock: v }); }}
            className={`${inputCls} ${product.stock <= product.low_stock_threshold ? "border-amber-300 bg-amber-50" : ""}`} />
          <p className={`text-caption mt-1.5 ${state === "Low stock" ? "text-amber-600" : state === "Sold out" ? "text-red-600" : "text-[#888888]"}`}>
            Currently: {state}
          </p>
        </Field>
        <Field label="Low-stock alert at">
          <input type="number" defaultValue={product.low_stock_threshold} min="0" key={`lst-${product.id}-${product.low_stock_threshold}`}
            onBlur={(e) => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 0 && v !== product.low_stock_threshold) onChange({ low_stock_threshold: v }); }}
            className={inputCls} />
        </Field>
        <Field label="Status">
          <button type="button" onClick={() => onChange({ active: !product.active })}
            className={`h-10 px-4 rounded-[0.375rem] text-caption font-medium border transition-colors ${product.active ? "bg-green-50 text-green-700 border-green-200" : "bg-[#f3f1ee] text-[#888888] border-[#e0ddd8]"}`}>
            {product.active ? "Active — visible on storefront" : "Hidden — removed from storefront"}
          </button>
        </Field>
      </div>
    </Card>
  );
}

// ---------- Section: Specifications ----------

function SpecsSection({ product, onChange }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void }) {
  const specs: Record<string, string> = product.specifications && Object.keys(product.specifications).length > 0
    ? product.specifications
    : { ...SHARED_SPECIFICATIONS, Model: product.name.replace("VERNYQ ", "") };
  const [rows, setRows] = useState<[string, string][]>(Object.entries(specs));
  const [dirty, setDirty] = useState(false);

  const commit = () => {
    const clean: Record<string, string> = {};
    rows.forEach(([k, v]) => { if (k.trim() && v.trim()) clean[k.trim()] = v.trim(); });
    onChange({ specifications: clean });
    setDirty(false);
  };

  return (
    <Card title="Specifications" subtitle="Rendered verbatim in the Technical Details table. Only supplier-verified specs should be published.">
      <div className="space-y-2">
        {rows.map(([k, v], i) => (
          <div key={i} className="flex gap-2">
            <input value={k} onChange={(e) => { const next = [...rows]; next[i] = [e.target.value, v]; setRows(next); setDirty(true); }}
              placeholder="Label (e.g. Chiller)" className={`${inputCls} sm:w-1/3`} />
            <input value={v} onChange={(e) => { const next = [...rows]; next[i] = [k, e.target.value]; setRows(next); setDirty(true); }}
              placeholder="Value (e.g. Integrated, 1 HP)" className={inputCls} />
            <button type="button" onClick={() => { setRows(rows.filter((_, j) => j !== i)); setDirty(true); }}
              aria-label="Remove spec" className="p-2 text-[#888888] hover:text-red-600 shrink-0"><X className="size-4" /></button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => { setRows([...rows, ["", ""]]); setDirty(true); }}
          className="inline-flex items-center gap-1.5 h-9 px-4 border border-[#e0ddd8] rounded-[0.375rem] text-caption font-medium text-[#555555] hover:border-[#0A182E] hover:text-[#0A182E]">
          <Plus className="size-3.5" /> Add specification
        </button>
        {dirty && (
          <button type="button" onClick={commit} className="h-9 px-5 bg-[#0A182E] text-white text-caption font-medium rounded-[0.375rem] hover:bg-[#0A182E]/90">
            Save specifications
          </button>
        )}
      </div>
    </Card>
  );
}

// ---------- Section: Features ----------

function FeaturesSection({ product, onChange }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void }) {
  const features = product.features && product.features.length > 0
    ? product.features
    : [{ title: "", description: "" }];
  const [rows, setRows] = useState<{ title: string; description: string }[]>(
    features.map((f) => ({ title: f.title || "", description: f.description || "" }))
  );
  const [dirty, setDirty] = useState(false);

  const commit = () => {
    onChange({ features: rows.filter((r) => r.title.trim()) });
    setDirty(false);
  };

  return (
    <Card title="Features" subtitle="The conversion-driving capability grid on the product page.">
      <div className="space-y-4">
        {rows.map((f, i) => (
          <div key={i} className="border border-[#e0ddd8] rounded-[0.375rem] p-4 space-y-3 bg-[#faf9f7]">
            <div className="flex gap-2">
              <input value={f.title} onChange={(e) => { const next = [...rows]; next[i] = { ...f, title: e.target.value }; setRows(next); setDirty(true); }}
                placeholder="Feature title (e.g. Wi-Fi + App Control)" className={inputCls} />
              <button type="button" onClick={() => { setRows(rows.filter((_, j) => j !== i)); setDirty(true); }}
                aria-label="Remove feature" className="p-2 text-[#888888] hover:text-red-600 shrink-0"><X className="size-4" /></button>
            </div>
            <textarea rows={2} value={f.description} onChange={(e) => { const next = [...rows]; next[i] = { ...f, description: e.target.value }; setRows(next); setDirty(true); }}
              placeholder="One or two sentences on why it matters." className={areaCls} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => { setRows([...rows, { title: "", description: "" }]); setDirty(true); }}
          className="inline-flex items-center gap-1.5 h-9 px-4 border border-[#e0ddd8] rounded-[0.375rem] text-caption font-medium text-[#555555] hover:border-[#0A182E] hover:text-[#0A182E]">
          <Plus className="size-3.5" /> Add feature
        </button>
        {dirty && (
          <button type="button" onClick={commit} className="h-9 px-5 bg-[#0A182E] text-white text-caption font-medium rounded-[0.375rem] hover:bg-[#0A182E]/90">
            Save features
          </button>
        )}
      </div>
    </Card>
  );
}

// ---------- Section: What's included ----------

function IncludedSection({ product, onChange }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void }) {
  const items = product.whats_included && product.whats_included.length > 0 ? product.whats_included : [];
  const [rows, setRows] = useState<string[]>(items);
  const [dirty, setDirty] = useState(false);

  const commit = () => {
    onChange({ whats_included: rows.map((r) => r.trim()).filter(Boolean) });
    setDirty(false);
  };

  return (
    <Card title="What's in the Box" subtitle="Every line renders as a checklist item on the product page.">
      <div className="space-y-2">
        {rows.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={(e) => { const next = [...rows]; next[i] = e.target.value; setRows(next); setDirty(true); }}
              placeholder={`Included item ${i + 1}`} className={inputCls} />
            <button type="button" onClick={() => { setRows(rows.filter((_, j) => j !== i)); setDirty(true); }}
              aria-label="Remove item" className="p-2 text-[#888888] hover:text-red-600 shrink-0"><X className="size-4" /></button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => { setRows([...rows, ""]); setDirty(true); }}
          className="inline-flex items-center gap-1.5 h-9 px-4 border border-[#e0ddd8] rounded-[0.375rem] text-caption font-medium text-[#555555] hover:border-[#0A182E] hover:text-[#0A182E]">
          <Plus className="size-3.5" /> Add item
        </button>
        {dirty && (
          <button type="button" onClick={commit} className="h-9 px-5 bg-[#0A182E] text-white text-caption font-medium rounded-[0.375rem] hover:bg-[#0A182E]/90">
            Save items
          </button>
        )}
      </div>
    </Card>
  );
}

// ---------- Section: SEO ----------

function SeoSection({ product, onChange }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void }) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://vernyq.com";
  const seoTitle = product.seo_title || `${product.name} | VERNYQ`;
  const seoDesc = product.seo_description || product.short_description || "";

  return (
    <Card title="Search engine listing" subtitle="How this product appears in Google results and social shares.">
      <div className="space-y-4">
        <Field label="SEO title" hint="fallback: product name">
          <input defaultValue={product.seo_title || ""} key={`seot-${product.id}-${product.seo_title}`} maxLength={70}
            placeholder={`${product.name} | VERNYQ`}
            onBlur={(e) => { const v = e.target.value.trim(); if (v !== (product.seo_title || "")) onChange({ seo_title: v || null }); }}
            className={inputCls} />
          <CharCount value={seoTitle.length} ideal={60} />
        </Field>
        <Field label="Meta description" hint="fallback: short description">
          <textarea rows={3} defaultValue={product.seo_description || ""} key={`seod-${product.id}-${product.seo_description}`} maxLength={300}
            onBlur={(e) => { const v = e.target.value.trim(); if (v !== (product.seo_description || "")) onChange({ seo_description: v || null }); }}
            className={areaCls} />
          <CharCount value={seoDesc.length} ideal={160} />
        </Field>

        {/* Google preview */}
        <div className="border border-[#e0ddd8] rounded-[0.375rem] p-4 bg-[#faf9f7]">
          <p className="text-caption text-[#888888] mb-3">Search result preview</p>
          <p className="text-caption text-[#4a8a5c]">{origin}/product/{product.slug}</p>
          <p className="text-body text-[#1a0dab] mt-1 truncate">{seoTitle}</p>
          <p className="text-body-sm text-[#555555] mt-1 line-clamp-2">{seoDesc || "Add a meta description so this line isn't guessed by Google."}</p>
        </div>
      </div>
    </Card>
  );
}

// ---------- Section: Reviews moderation ----------

function ReviewsSection({ product, onChange, onNotify }: { product: ProductRow; onChange: (patch: Partial<ProductRow>) => void; onNotify: (m: string) => void }) {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved">("pending");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("product_reviews").select("*").eq("product_id", product.id).order("created_at", { ascending: false });
    setReviews((data as unknown as ReviewRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [product.id]);

  const setApproved = async (r: ReviewRow, approved: boolean) => {
    await supabase.from("product_reviews").update({ approved }).eq("id", r.id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("product_reviews").delete().eq("id", id);
    load();
  };

  const shown = reviews.filter((r) => (filter === "pending" ? !r.approved : r.approved));
  const approvedCount = reviews.filter((r) => r.approved);
  const avg = approvedCount.length > 0
    ? (approvedCount.reduce((s, r) => s + r.rating, 0) / approvedCount.length).toFixed(1)
    : "—";

  return (
    <Card title="Reviews" subtitle={`${approvedCount.length} published · average ${avg}/5`}>
      <Toggle
        checked={product.reviews_enabled !== false}
        onChange={(v) => { onChange({ reviews_enabled: v }); onNotify(v ? "Reviews enabled" : "Reviews hidden from the product page"); }}
        label="Show reviews on product page"
        hint="When off, the reviews section is removed for customers (submitted reviews are kept)."
      />
      <div className="flex gap-2 pt-2">
        {(["pending", "approved"] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)}
            className={`h-8 px-4 rounded-full text-caption font-medium border transition-colors ${filter === f ? "bg-[#0A182E] text-white border-[#0A182E]" : "bg-white text-[#555555] border-[#e0ddd8]"}`}>
            {f === "pending" ? `Pending (${reviews.filter((r) => !r.approved).length})` : `Approved (${approvedCount.length})`}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-body-sm text-[#888888]">Loading reviews...</p>
      ) : shown.length === 0 ? (
        <p className="text-body-sm text-[#888888]">No {filter} reviews.</p>
      ) : (
        <div className="space-y-3">
          {shown.map((r) => (
            <div key={r.id} className="border border-[#e0ddd8] rounded-[0.375rem] p-4 bg-[#faf9f7]">
              <div className="flex flex-wrap items-center gap-2">
                <ReviewStars value={r.rating} />
                <p className="text-body-sm font-medium text-[#0A182E]">{r.title || "(no headline)"}</p>
                <span className="text-caption text-[#888888] ml-auto">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-body-sm text-[#555555] mt-2 whitespace-pre-wrap">{r.body}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-caption text-[#888888]">— {r.author_name}</span>
                <div className="ml-auto flex gap-2">
                  {r.approved ? (
                    <button type="button" onClick={() => setApproved(r, false)} className="h-8 px-3 border border-[#e0ddd8] rounded-[0.375rem] text-caption font-medium text-[#555555] hover:text-[#0A182E]">Unpublish</button>
                  ) : (
                    <button type="button" onClick={() => setApproved(r, true)} className="h-8 px-3 bg-[#4a8a5c] text-white rounded-[0.375rem] text-caption font-medium hover:bg-[#4a8a5c]/90 inline-flex items-center gap-1"><Check className="size-3.5" /> Approve &amp; publish</button>
                  )}
                  <button type="button" onClick={() => remove(r.id)} aria-label="Delete review" className="h-8 px-2.5 border border-[#e0ddd8] rounded-[0.375rem] text-[#888888] hover:text-red-600"><Trash2 className="size-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// ---------- Section: Danger zone ----------

function DangerZone({ product, onDeleted }: { product: ProductRow; onDeleted: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState("");

  const destroy = async () => {
    await supabase.from("products").delete().eq("id", product.id);
    onDeleted();
  };

  if (!confirming) {
    return (
      <div className="border border-red-200 rounded-[0.5rem] p-5 bg-red-50/50">
        <p className="text-body-sm font-medium text-[#0A182E]">Danger zone</p>
        <p className="text-caption text-[#888888] mt-1">Deleting removes the product from the catalog permanently. Prefer "Hidden" to just take it offline.</p>
        <button type="button" onClick={() => setConfirming(true)} className="mt-3 h-9 px-4 border border-red-300 text-red-700 rounded-[0.375rem] text-caption font-medium hover:bg-red-50">
          Delete product
        </button>
      </div>
    );
  }

  return (
    <div className="border border-red-300 rounded-[0.5rem] p-5 bg-red-50">
      <p className="text-body-sm font-medium text-red-700">Type "{product.slug}" to confirm deletion</p>
      <div className="flex flex-wrap gap-2 mt-3">
        <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={product.slug} className={`${inputCls} sm:w-72`} />
        <button type="button" disabled={typed !== product.slug} onClick={destroy}
          className="h-10 px-5 bg-red-600 text-white rounded-[0.375rem] text-caption font-medium hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed">
          Permanently delete
        </button>
        <button type="button" onClick={() => { setConfirming(false); setTyped(""); }} className="h-10 px-4 border border-[#e0ddd8] rounded-[0.375rem] text-caption font-medium text-[#555555]">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ---------- Main editor ----------

export function ProductEditor({ product, onBack, onSaved, onDeleted }: {
  product: ProductRow;
  onBack: () => void;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [draft, setDraft] = useState<ProductRow>(product);
  const [savingField, setSavingField] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  const notify = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2500);
  };

  const patch = async (p: Partial<ProductRow>) => {
    const merged = { ...draft, ...p };
    setDraft(merged);
    setSavingField(true);
    const { error } = await supabase.from("products").update(p).eq("id", product.id);
    setSavingField(false);
    if (error) {
      notify("Save failed — check your connection and try again");
      return;
    }
    onSaved();
    notify("Saved — live on the storefront");
  };

  const nameCommit = (name: string) => {
    const v = name.trim();
    if (!v || v === product.name) return;
    const next: Partial<ProductRow> = { name: v };
    if (!slugEdited) next.slug = slugify(v);
    patch(next);
  };

  const slugValid = useMemo(() => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug), [draft.slug]);

  return (
    <div>
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 sticky top-16 z-30 bg-[#faf9f7]/95 backdrop-blur-md py-3 -mt-3">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[#555555] hover:text-[#0A182E] transition-colors">
          <ArrowLeft className="size-4" /> Products
        </button>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-[0.375rem] overflow-hidden bg-[#f3f1ee] shrink-0">
            {(draft.images || [])[0] && <img src={(draft.images || [])[0]} alt="" className="w-full h-full object-cover" />}
          </div>
          <p className="text-body font-medium text-[#0A182E] truncate">{draft.name || "Untitled product"}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a href={`/product/${product.slug}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-body-sm text-[#0084FF] hover:text-[#3399FF]">
            <ExternalLink className="size-3.5" /> View
          </a>
          {savingField && <span className="text-caption text-[#888888]">Saving…</span>}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A182E] text-white text-body-sm px-4 py-2.5 rounded-[0.375rem] shadow-lg">
          {toast}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Main column */}
        <div className="space-y-6 min-w-0">
          <Card title="Product details">
            <div className="space-y-4">
              <Field label="Title">
                <input defaultValue={product.name} key={`name-${product.id}-${product.name}`} maxLength={120}
                  onBlur={(e) => nameCommit(e.target.value)} className={inputCls} />
              </Field>
              <Field label="URL handle" hint="changes break old links — update ads/QR codes">
                <input defaultValue={product.slug} key={`slug-${product.id}-${product.slug}`}
                  onBlur={(e) => {
                    const v = slugify(e.target.value);
                    setSlugEdited(true);
                    if (v && v !== product.slug && slugValid) patch({ slug: v });
                    else if (v && v !== product.slug) notify("Slug can only contain lowercase letters, numbers, and dashes");
                  }}
                  className={`${inputCls} ${slugValid ? "" : "border-red-300"}`} />
              </Field>
              <Field label="Tagline" hint="hero line under the title">
                <textarea rows={2} defaultValue={product.tagline || ""} key={`tag-${product.id}-${product.tagline}`} maxLength={200}
                  onBlur={(e) => { const v = e.target.value.trim(); if (v !== (product.tagline || "")) patch({ tagline: v || null }); }}
                  className={areaCls} />
              </Field>
              <Field label="Short description" hint="cards, checkout summaries, meta fallback">
                <textarea rows={2} defaultValue={product.short_description || ""} key={`sd-${product.id}-${product.short_description}`} maxLength={300}
                  onBlur={(e) => { const v = e.target.value.trim(); if (v !== (product.short_description || "")) patch({ short_description: v || null }); }}
                  className={areaCls} />
              </Field>
              <Field label="Full description" hint="the Overview section story">
                <textarea rows={6} defaultValue={product.description || ""} key={`desc-${product.id}-${product.description}`} maxLength={5000}
                  onBlur={(e) => { const v = e.target.value.trim(); if (v !== (product.description || "")) patch({ description: v || null }); }}
                  className={areaCls} />
              </Field>
            </div>
          </Card>

          <SpecsSection product={product} onChange={patch} />
          <FeaturesSection product={product} onChange={patch} />
          <IncludedSection product={product} onChange={patch} />
          <SeoSection product={product} onChange={patch} />
          <ReviewsSection product={product} onChange={patch} onNotify={notify} />
        </div>

        {/* Side column */}
        <div className="space-y-6 lg:sticky lg:top-32">
          <MediaSection product={product} onChange={patch} onNotify={notify} />
          <PricingSection product={product} onChange={patch} />
          <InventorySection product={product} onChange={patch} />
          <DangerZone product={product} onDeleted={onDeleted} />
        </div>
      </div>
    </div>
  );
}
