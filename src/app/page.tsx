import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Droplets,
  Timer,
  Repeat,
  Home,
  Thermometer,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { blogPosts } from "@/data/blog";
import { faqData } from "@/data/faq";
import { ProductCard } from "@/components/commerce/ProductCard";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { TrustBar } from "@/components/commerce/TrustBar";
import { FAQAccordion } from "@/components/commerce/FAQAccordion";
import { CTABlock } from "@/components/commerce/CTABlock";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";

export const metadata = {
  title: "VERNYQ — Premium Cold Plunge Systems | Home Recovery Equipment",
  description:
    "Premium all-in-one cold plunge systems engineered for home recovery. Integrated cooling, filtration, and insulation. Designed to perform. Built to last.",
};

export default function HomePage() {
  const flagship = products[0];
  const previewFaqs = faqData.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center bg-[#0A182E] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1800&q=80"
            alt="Cold water recovery system"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A182E]/90 via-[#0A182E]/70 to-transparent" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-overline text-[#0084FF] mb-4">Premium Recovery Systems</p>
            <h1 className="text-display text-[#faf9f7]">
              COLD WATER.
              <br />
              CLEARER RECOVERY.
            </h1>
            <p className="text-body-lg text-[#faf9f7]/70 mt-6 max-w-lg leading-relaxed">
              All-in-one cold plunge systems engineered for serious recovery. Integrated cooling, filtration, and insulation — designed to perform, day after day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/cold-plunge-tubs" className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#faf9f7] text-[#0A182E] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#faf9f7]/90 transition-colors">
                Shop Cold Plunges
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/science" className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[#faf9f7]/20 text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#faf9f7]/10 transition-colors">
                Explore the Science
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* FEATURED PRODUCT */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee]">
              <Image src={flagship.images[0]} alt={flagship.name} fill className="object-cover" />
              {flagship.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A182E] text-[#faf9f7] text-caption font-medium rounded-[0.25rem]">
                  {flagship.badge}
                </div>
              )}
            </div>
            <div>
              <p className="text-overline text-[#0084FF] mb-3">Flagship</p>
              <h2 className="text-h2 text-[#0A182E]">{flagship.name}</h2>
              <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">{flagship.tagline}</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-body-sm text-[#555555]">
                  <Thermometer className="size-4 text-[#0084FF] flex-shrink-0" />
                  {flagship.specifications["Temperature Range"]}
                </div>
                <div className="flex items-center gap-3 text-body-sm text-[#555555]">
                  <Droplets className="size-4 text-[#0084FF] flex-shrink-0" />
                  {flagship.specifications["Filtration"]}
                </div>
                <div className="flex items-center gap-3 text-body-sm text-[#555555]">
                  <Zap className="size-4 text-[#0084FF] flex-shrink-0" />
                  {flagship.specifications["Power Requirement"]}
                </div>
              </div>
              <p className="text-price text-[#0A182E] mt-6">{formatPrice(flagship.price)}</p>
              <p className="text-caption text-[#888888] mt-1">Freight shipping included</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <AddToCartButton product={flagship} />
                <Link href={`/product/${flagship.slug}`} className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[#e0ddd8] text-[#0A182E] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#f3f1ee] transition-colors">
                  View Full Details
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VERNYQ */}
      <section className="py-20 lg:py-28 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Why Vernyq"
            title="Engineered for Recovery. Built to Last."
            description="Every VERNYQ system is designed as a complete solution — not a collection of parts you assemble yourself."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {[
              { icon: Zap, title: "All-in-One Design", description: "Integrated chiller, filtration, and insulation. No third-party add-ons required." },
              { icon: Shield, title: "Premium Materials", description: "Marine-grade stainless steel exterior with medical-grade interior liner." },
              { icon: Award, title: "Consistent Performance", description: "Maintain your exact target temperature, every session, without ice." },
              { icon: Home, title: "Home-Ready", description: "Standard 110V outlet. No special electrical work. Set up in under an hour." },
              { icon: Repeat, title: "Low Maintenance", description: "Built-in filtration and UV sterilization. Change water every 2–4 weeks." },
              { icon: Timer, title: "Always Ready", description: "Set your temperature. Walk outside. Plunge. No preparation needed." },
            ].map((item) => (
              <div key={item.title} className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6 lg:p-8">
                <div className="size-10 rounded-[0.5rem] bg-[#0084FF]/10 flex items-center justify-center mb-4">
                  <item.icon className="size-5 text-[#0084FF]" />
                </div>
                <h3 className="text-h3 text-[#0A182E]">{item.title}</h3>
                <p className="text-body-sm text-[#555555] mt-2 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL-IN-ONE DIFFERENCE */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-overline text-[#0084FF] mb-3">The Vernyq Difference</p>
              <h2 className="text-h2 text-[#0A182E]">What Makes an All-in-One System Different</h2>
              <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
                Most cold plunge setups require you to buy a tub, a separate chiller, filters, and figure out how to connect everything. A VERNYQ system arrives as one integrated unit.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  { label: "Traditional Setup", items: ["Buy tub separately", "Buy chiller separately", "Buy filters separately", "Assembly required", "Multiple warranty providers"], dark: true },
                  { label: "VERNYQ System", items: ["Complete tub + chiller", "Integrated filtration", "Pre-assembled", "Single manufacturer warranty"], dark: false },
                ].map((option) => (
                  <div key={option.label} className={`rounded-[0.5rem] p-5 border ${option.dark ? "border-[#e0ddd8] bg-[#faf9f7]" : "border-[#0084FF]/30 bg-[#0084FF]/5"}`}>
                    <p className={`text-body-sm font-medium ${option.dark ? "text-[#555555]" : "text-[#0084FF]"} mb-3`}>{option.label}</p>
                    <ul className="space-y-2">
                      {option.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-body-sm text-[#0A182E]">
                          <div className={`size-1.5 rounded-full ${option.dark ? "bg-[#e0ddd8]" : "bg-[#0084FF]"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee]">
                <Image src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&q=80" alt="Cold plunge engineering" width={1200} height={900} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING */}
      <section className="py-20 lg:py-28 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Engineering" title="Built with Purpose" description="Every component is selected for performance, durability, and long-term reliability." />
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            {flagship.features.map((feature) => (
              <div key={feature.title} className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6 lg:p-8">
                <h3 className="text-h3 text-[#0A182E]">{feature.title}</h3>
                <p className="text-body-sm text-[#555555] mt-2 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOVERY ROUTINE */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="aspect-[4/3] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee]">
                <Image src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80" alt="Home recovery routine" width={1200} height={900} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p className="text-overline text-[#0084FF] mb-3">Your Routine</p>
              <h2 className="text-h2 text-[#0A182E]">Recovery That Fits Your Life</h2>
              <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
                A cold plunge at home means your recovery tool is always ready. No driving to a facility. No waiting for availability. Just step outside and start.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { step: "01", title: "Set Your Temperature", desc: "Choose your target — typically 3°C–10°C." },
                  { step: "02", title: "Step In", desc: "Enter the plunge and control your breathing." },
                  { step: "03", title: "Recover", desc: "2–5 minutes of cold exposure. Step out, warm up, feel the difference." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="text-overline text-[#0084FF] mt-0.5 flex-shrink-0">{item.step}</span>
                    <div>
                      <p className="text-body font-medium text-[#0A182E]">{item.title}</p>
                      <p className="text-body-sm text-[#555555] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="py-20 lg:py-28 bg-[#0A182E]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-overline text-[#0084FF] mb-3">The Science</p>
              <h2 className="text-h2 text-[#faf9f7]">Cold Exposure Research</h2>
              <p className="text-body-lg text-[#faf9f7]/70 mt-4 leading-relaxed">
                Cold water immersion has been studied extensively in exercise science and recovery research. While findings vary, consistent themes emerge around temperature, duration, and frequency.
              </p>
              <p className="text-body text-[#faf9f7]/50 mt-4 leading-relaxed">
                We believe in evidence-based recovery. That means understanding what the research shows — and what it doesn&apos;t.
              </p>
              <Link href="/science" className="inline-flex items-center gap-2 text-body-sm font-medium text-[#0084FF] mt-6 hover:text-[#3399FF] transition-colors">
                Explore the Science
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "2–5", label: "Minutes typical" },
                { stat: "2–4×", label: "Per week" },
                { stat: "3–10°C", label: "Temperature range" },
                { stat: "50+", label: "Years of research" },
              ].map((item) => (
                <div key={item.label} className="bg-[#faf9f7]/5 border border-[#faf9f7]/10 rounded-[0.5rem] p-6 text-center">
                  <p className="text-h2 text-[#faf9f7]">{item.stat}</p>
                  <p className="text-caption text-[#faf9f7]/50 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Our Systems" title="Cold Plunge Systems" description="Two tiers of premium recovery. Both designed as complete all-in-one solutions." />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-14 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Questions" title="Frequently Asked" description="Everything you need to know before purchasing." />
          <div className="mt-14 max-w-3xl mx-auto">
            <FAQAccordion items={previewFaqs} />
            <div className="text-center mt-8">
              <Link href="/faq" className="inline-flex items-center gap-2 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors">
                View All FAQs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Journal" title="From the Blog" description="Research, setup guides, and recovery education." />
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[16/10] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
                  <Image src={post.image} alt={post.title} width={600} height={375} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-caption text-[#0084FF]">{post.category}</span>
                  <span className="text-caption text-[#e0ddd8]">·</span>
                  <span className="text-caption text-[#888888]">{post.readingTime}</span>
                </div>
                <h3 className="text-h3 text-[#0A182E] group-hover:text-[#0084FF] transition-colors">{post.title}</h3>
                <p className="text-body-sm text-[#555555] mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-body-sm font-medium text-[#0084FF] hover:text-[#3399FF] transition-colors">
              View All Articles
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTABlock
        overline="Get Started"
        title="Your Recovery Routine Starts Here"
        description="Premium cold plunge systems delivered to your home. Free freight shipping included."
        primaryLabel="Shop Cold Plunges"
        primaryHref="/cold-plunge-tubs"
        secondaryLabel="Explore the Science"
        secondaryHref="/science"
        dark
      />
    </div>
  );
}
