"use client";
import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { FAQAccordion } from "@/components/commerce/FAQAccordion";
import { faqData, faqCategories } from "@/data/faq";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filtered = activeCategory ? faqData.filter(f => f.category === activeCategory) : faqData;

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Frequently Asked Questions</h1>
          <p className="text-body-lg text-[#555555] mt-3">Everything you need to know about VERNYQ products, cold plunging, shipping, and more.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8 max-w-3xl">
          <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 text-body-sm font-medium rounded-[0.375rem] transition-colors ${!activeCategory ? "bg-[#0A182E] text-[#faf9f7]" : "bg-[#f3f1ee] text-[#555555] hover:bg-[#eae7e2]"}`}>All</button>
          {faqCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-body-sm font-medium rounded-[0.375rem] transition-colors ${activeCategory === cat ? "bg-[#0A182E] text-[#faf9f7]" : "bg-[#f3f1ee] text-[#555555] hover:bg-[#eae7e2]"}`}>{cat}</button>
          ))}
        </div>
        <div className="max-w-3xl pb-16"><FAQAccordion items={filtered} /></div>
        <div className="border-t border-[#e0ddd8] py-12 text-center">
          <p className="text-body text-[#555555]">Still have questions?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 mt-4 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors">Contact Our Team →</Link>
        </div>
      </div>
    </div>
  );
}
