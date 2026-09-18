"use client";

import { useParams } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";
import { getProduct } from "@/data/products";
import { useProducts } from "@/contexts/ProductsContext";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { CTABlock } from "@/components/commerce/CTABlock";
import { FAQAccordion } from "@/components/commerce/FAQAccordion";
import { faqData } from "@/data/faq";
import { ProductDetailContent } from "./ProductDetailContent";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Seo } from "@/components/commerce/Seo";

/** Model-specific FAQs — same-performance framing, no invented differences. */
const MODEL_FAQS = [
  {
    id: "v3-a3-difference",
    question: "What's the difference between the V3 and the A3?",
    answer:
      "Performance is identical — same integrated 1 HP chiller, same 1–40°C cooling and heating range, same Wi-Fi app control. The only difference is the exterior design, so you can pick the look you prefer.",
  },
  {
    id: "does-it-heat",
    question: "Does it only make cold water?",
    answer:
      "No. The integrated chiller both cools and heats, covering a full 1°C to 40°C range — cold plunges, warm soaks, and contrast routines from the same unit.",
  },
  {
    id: "power-requirement",
    question: "Do I need special wiring?",
    answer:
      "No. The unit runs on a standard 110V / 60Hz outlet. It's freestanding — place it on a flat, level surface, fill it, plug it in, and set your temperature in the app.",
  },
  {
    id: "app-control",
    question: "How does the app control work?",
    answer:
      "The unit connects to your home Wi-Fi. From the app you can set and monitor your target temperature remotely, so the water is ready when you want to plunge.",
  },
  {
    id: "shipping-included",
    question: "What does delivery include?",
    answer:
      "Free freight shipping from our U.S. warehouse, including ground-level unloading at mainland U.S. residential addresses. Dispatch is roughly 3 business days after payment verification, with delivery in roughly 7. Indoor placement and installation are not included, and remote or special-service areas may incur additional charges.",
  },
];

export default function ProductPage() {
  const { getBySlug, products } = useProducts();
  const { slug } = useParams<{ slug: string }>();
  const product = getBySlug(slug!);

  if (!product) {
    return (
      <>
        <Seo title="Product Not Found | VERNYQ" canonicalPath={`/product/${slug}`} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-h1 text-[#0A182E] mb-4">Product Not Found</h1>
          <p className="text-body-lg text-[#555555] mb-8">The product you're looking for doesn't exist or is no longer available.</p>
          <a href="/cold-plunge-tubs" className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">
            View All Products
          </a>
        </div>
      </>
    );
  }

  // Model-specific FAQs first, then matching site FAQs (Setup + Products).
  const siteFaqs = faqData.filter((f) => f.category === "Products" || f.category === "Setup").slice(0, 3);
  const pageFaqs = [
    ...MODEL_FAQS.map((f) => ({ ...f, category: "Product" })),
    ...siteFaqs,
  ];

  // Sibling model — same performance, different design. Filter to what the
  // live catalog currently offers (an inactive sibling shouldn't be suggested).
  const sibling = products.filter((p) => p.id !== product.id);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: typeof window !== "undefined" ? window.location.origin + "/" : "/" },
      { "@type": "ListItem", position: 2, name: "Cold Plunge Tubs", item: typeof window !== "undefined" ? window.location.origin + "/cold-plunge-tubs" : "/cold-plunge-tubs" },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <div>
      <Seo jsonLd={breadcrumbJsonLd} title={product.seo.title} />
      <ProductDetailContent product={product} />

      {/* Model FAQ */}
      <section className="py-16 lg:py-24 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Questions" title={`${product.name} FAQ`} />
          <div className="mt-10 max-w-3xl mx-auto">
            <FAQAccordion items={pageFaqs} />
          </div>
        </div>
      </section>

      {/* Sibling comparison — same performance, different design */}
      {sibling.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              overline="Compare"
              title={`Also Consider the ${sibling[0].name}`}
              description="Same 1–40°C performance and identical features — a different exterior design."
            />
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-10 max-w-4xl mx-auto">
              {sibling.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <p className="text-center mt-8">
              <LinkIcon className="inline size-4 text-[#0084FF] mr-1 -mt-0.5" aria-hidden="true" />
              <a href={`/product/${sibling[0].slug}`} className="text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors">
                View the {sibling[0].name} →
              </a>
            </p>
          </div>
        </section>
      )}

      <CTABlock
        title="Ready When You Are"
        description={`${product.name} — free freight shipping from our U.S. warehouse, delivered in about a week.`}
        primaryLabel="Add to Cart"
        primaryHref="/cold-plunge-tubs"
        secondaryLabel="Ask a Question"
        secondaryHref="/contact"
      />
    </div>
  );
}
