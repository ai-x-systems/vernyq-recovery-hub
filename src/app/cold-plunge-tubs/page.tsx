"use client";

import { useProducts } from "@/contexts/ProductsContext";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { CTABlock } from "@/components/commerce/CTABlock";
import { FAQAccordion } from "@/components/commerce/FAQAccordion";
import { Seo } from "@/components/commerce/Seo";
import { ProductCard } from "@/components/commerce/ProductCard";
import { faqData } from "@/data/faq";
import { Check } from "lucide-react";

const COLLECTION_FAQS = [
  {
    id: "which-model",
    category: "Products",
    question: "Which model should I choose — V3 or A3?",
    answer:
      "Both deliver identical performance: 1–40°C cooling and heating, an integrated 1 HP chiller, and Wi-Fi app control. The only difference is the exterior design — pick the one you prefer.",
  },
  {
    id: "col-temp-range",
    category: "Products",
    question: "Can it heat as well as cool?",
    answer:
      "Yes. Every VERNYQ all-in-one unit covers 1°C to 40°C — cold plunges, warm soaks, and contrast routines from the same tub.",
  },
  {
    id: "col-delivery",
    category: "Shipping",
    question: "How fast is delivery?",
    answer:
      "We dispatch from our U.S. warehouse roughly 3 business days after payment verification, and delivery typically takes about 7 business days. Free freight shipping includes ground-level unloading at mainland U.S. residential addresses.",
  },
];

export default function CollectionPage() {
  const { products } = useProducts();
  const origin = typeof window !== "undefined" ? window.location.origin : "https://vernyq.com";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VERNYQ Cold Plunge Tubs",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${origin}/product/${p.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "Cold Plunge Tubs", item: `${origin}/cold-plunge-tubs` },
    ],
  };

  return (
    <div>
      <Seo
        title="Cold Plunge Tubs | VERNYQ V3 & A3 All-in-One Systems"
        description="Shop VERNYQ all-in-one cold plunge systems. Cooling & heating from 1–40°C, integrated 1 HP chiller, Wi-Fi app control. U.S. stock, free freight shipping."
        canonicalPath="/cold-plunge-tubs"
        image={products[0]?.images[0]}
        jsonLd={[itemListJsonLd, breadcrumbJsonLd]}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cold Plunge Tubs" }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Cold Plunge Tubs</h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
            All-in-one systems that cool and heat from 1°C to 40°C — an integrated 1 HP chiller,
            Wi-Fi app control, and a standard 110V plug. U.S. warehouse stock, free freight shipping,
            delivered in about a week.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Same performance, different design */}
        <section className="pb-20" aria-labelledby="same-performance">
          <div className="border border-[#e0ddd8] rounded-[0.75rem] bg-[#f3f1ee] p-6 lg:p-10">
            <h2 id="same-performance" className="text-h3 text-[#0A182E]">
              V3 vs A3 — same performance, different design
            </h2>
            <p className="text-body-sm text-[#555555] mt-2 max-w-2xl leading-relaxed">
              Both models are identical where it matters. Choose by appearance.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-6 max-w-3xl">
              {[
                "Cooling + heating: 1–40°C",
                "Integrated 1 HP chiller",
                "Wi-Fi + app control",
                "Standard 110V / 60Hz outlet",
                "Freestanding — no installation",
                "Free freight shipping to the U.S.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-body-sm text-[#0A182E]">
                  <Check className="size-4 text-[#0084FF] shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className="py-16 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Questions"
            title="Common Questions"
            description="Need more information before deciding?"
          />
          <div className="mt-10 max-w-3xl mx-auto">
            <FAQAccordion items={COLLECTION_FAQS} />
            <div className="text-center mt-8">
              <a href="/faq" className="inline-flex items-center gap-2 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors">
                View All FAQs →
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        title="Have Questions?"
        description="Our team is here to help you find the right system for your recovery needs."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </div>
  );
}
