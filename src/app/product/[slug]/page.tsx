"use client";

import { useParams } from "react-router-dom";
import { products, getProduct } from "@/data/products";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { CTABlock } from "@/components/commerce/CTABlock";
import { FAQAccordion } from "@/components/commerce/FAQAccordion";
import { faqData } from "@/data/faq";
import { ProductDetailContent } from "./ProductDetailContent";
import { ProductCard } from "@/components/commerce/ProductCard";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug!);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-h1 text-[#0A182E] mb-4">Product Not Found</h1>
        <p className="text-body-lg text-[#555555] mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/cold-plunge-tubs" className="inline-flex items-center gap-2 h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors">
          View All Products
        </a>
      </div>
    );
  }

  const productFaqs = faqData.filter((f) => f.category === "Products" || f.category === "Setup");
  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <div>
      <ProductDetailContent product={product} />

      <section className="py-16 lg:py-24 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Questions" title="Product FAQ" />
          <div className="mt-10 max-w-3xl mx-auto">
            <FAQAccordion items={productFaqs} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader overline="Compare" title="Other Systems" />
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-10 max-w-4xl mx-auto">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock
        title="Ready to Recover?"
        description={`${product.name} — delivered to your home with everything you need.`}
        primaryLabel="Add to Cart"
        primaryHref="/cold-plunge-tubs"
        secondaryLabel="Ask a Question"
        secondaryHref="/contact"
      />
    </div>
  );
}
