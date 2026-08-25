"use client";

import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { FAQAccordion } from "@/components/commerce/FAQAccordion";
import { faqData } from "@/data/faq";
import type { Product } from "@/data/products";

export function CollectionContent({ products }: { products: Product[] }) {
  return (
    <>
      {/* Product Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pb-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* FAQ */}
      <section className="py-16 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Questions"
            title="Common Questions"
            description="Need more information before deciding?"
          />
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {faqData.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-5">
                <p className="text-body font-medium text-[#0A182E]">{item.question}</p>
                <p className="text-body-sm text-[#555555] mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
