import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CTABlock } from "@/components/commerce/CTABlock";

export default function Collection() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cold Plunge Tubs" }]} />

        {/* Header */}
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#1a1a1a]">Cold Plunge Tubs</h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
            Premium all-in-one cold plunge systems designed for serious home
            recovery. Integrated cooling, filtration, and insulation — everything
            you need in one unit.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Education */}
        <section className="py-16 border-t border-[#e0ddd8]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-overline text-[#4a7c8a] mb-3">
                Why All-in-One
              </p>
              <h2 className="text-h2 text-[#1a1a1a]">
                Everything You Need. Nothing You Don't.
              </h2>
              <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
                Every VERNYQ system integrates tub, chiller, filtration, and
                insulation into a single unit. No separate purchases, no
                compatibility concerns, no assembly required.
              </p>
              <Link
                to="/science"
                className="inline-flex items-center gap-2 text-body-sm font-medium text-[#4a7c8a] mt-6 hover:text-[#6ba3b0] transition-colors"
              >
                Learn About Cold Exposure
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Integrated Chiller", desc: "No ice required" },
                { label: "Filtration Built-In", desc: "5-micron + UV" },
                { label: "Full Insulation", desc: "Energy efficient" },
                { label: "Standard Outlet", desc: "110V / 60Hz" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"
                >
                  <p className="text-body-sm font-medium text-[#1a1a1a]">
                    {item.label}
                  </p>
                  <p className="text-caption text-[#888888] mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
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
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What's included in each system?",
                a: "Every VERNYQ system includes the tub, integrated chiller, filtration system, UV sterilization module, insulated cover, drainage adapter, and setup guide.",
              },
              {
                q: "Do I need a special power outlet?",
                a: "No. Both the V1 and V1 Pro use a standard 110V / 60Hz outlet — the same as most household appliances in the US.",
              },
              {
                q: "How long does shipping take?",
                a: "Standard delivery takes 5–10 business days for the V1 and 7–14 business days for the V1 Pro. Freight shipping is included in the price.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-5"
              >
                <p className="text-body font-medium text-[#1a1a1a]">
                  {item.q}
                </p>
                <p className="text-body-sm text-[#555555] mt-2">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-[#4a7c8a] hover:text-[#6ba3b0] transition-colors"
            >
              View All FAQs
              <ArrowRight className="size-4" />
            </Link>
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
