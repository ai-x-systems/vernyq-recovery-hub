"use client";

import { useState } from "react";
import Link from "next/link";
import { Truck, Shield, RotateCcw, Thermometer, Wifi, Zap } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useProductReviews } from "@/lib/reviews";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { SpecTable } from "@/components/commerce/SpecTable";
import { Seo } from "@/components/commerce/Seo";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { BuyBox } from "@/components/commerce/BuyBox";
import { ProductReviews } from "@/components/commerce/ProductReviews";

function buildProductJsonLd(product: Product, reviews?: { count: number; average: number }) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://vernyq.com";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: { "@type": "Brand", name: "VERNYQ" },
    sku: product.fulfillment.supplierSku,
    url: `${origin}/product/${product.slug}`,
    ...(reviews && reviews.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviews.average.toFixed(1),
            reviewCount: reviews.count,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: `${origin}/product/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability:
        product.stockStatus === "sold_out" || product.stockStatus === "unavailable"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
      },
    },
  };
}

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Place it",
    desc: "Freestanding unit — indoors or outdoors on a flat, level surface near a standard 110V outlet.",
  },
  {
    step: "02",
    title: "Fill & connect",
    desc: "Fill with a garden hose, plug in, and connect the unit to your Wi-Fi via the app.",
  },
  {
    step: "03",
    title: "Set your temperature",
    desc: "Choose anywhere from 1°C to 40°C in the app. The integrated 1 HP chiller holds it there.",
  },
  {
    step: "04",
    title: "Plunge",
    desc: "Your water is ready when you are — every session, no ice runs, no prep.",
  },
];

export function ProductDetailContent({ product }: { product: Product }) {
  const { addItem } = useCart();
  const available = product.inStock;
  const [added, setAdded] = useState(false);
  // Reviews feed both the public section and the aggregateRating JSON-LD.
  const { count: reviewCount, average: reviewAverage } = useProductReviews(
    product.reviewsEnabled === false ? undefined : product.id
  );

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      <Seo
        title={product.seo.title}
        description={product.seo.description}
        canonicalPath={`/product/${product.slug}`}
        type="product"
        image={product.images[0]}
        jsonLd={buildProductJsonLd(product, { count: reviewCount, average: reviewAverage })}
      />

      {/* ---------- HERO: gallery + buy box ---------- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Cold Plunge Tubs", href: "/cold-plunge-tubs" }, { label: product.name }]}
        />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pb-16 lg:pb-24">
          <ProductGallery images={product.images} name={product.name} priority />
          <div className="lg:py-4">
            <h1 className="text-h1 text-[#0A182E]">{product.name}</h1>
            <p className="text-body-lg text-[#555555] mt-3 leading-relaxed">{product.tagline}</p>
            <div className="mt-8">
              <BuyBox
                product={product}
                highlights={[
                  "Cooling + heating: 1–40°C",
                  "Integrated 1 HP chiller",
                  "Wi-Fi + app control",
                  "Runs on a standard 110V outlet",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- OVERVIEW ---------- */}
      <section className="py-16 lg:py-24 bg-[#f3f1ee]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-overline text-[#0084FF] mb-3">Overview</p>
          <h2 className="text-h2 text-[#0A182E]">
            One unit. Complete cold and hot therapy.
          </h2>
          <p className="text-body text-[#555555] mt-6 leading-relaxed">{product.description}</p>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { icon: Thermometer, stat: "1–40°C", label: "Cool & heat" },
              { icon: Zap, stat: "1 HP", label: "Integrated chiller" },
              { icon: Wifi, stat: "App", label: "Wi-Fi control" },
            ].map((s) => (
              <div key={s.label} className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-4 lg:p-6 text-center">
                <s.icon className="size-5 text-[#0084FF] mx-auto mb-2" aria-hidden="true" />
                <p className="text-h3 text-[#0A182E]">{s.stat}</p>
                <p className="text-caption text-[#888888] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT'S INCLUDED ---------- */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Included"
            title="What's in the Box"
            description="One integrated unit — everything is built in."
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-3 mt-10 max-w-3xl">
            {product.whatsIncluded.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] px-4 py-3">
                <span className="size-1.5 rounded-full bg-[#0084FF] shrink-0" aria-hidden="true" />
                <span className="text-body-sm text-[#0A182E]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Setup"
            title="How It Works"
            description="From box to first plunge in an afternoon."
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 list-none">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.step} className="flex gap-4 sm:block">
                <span className="text-overline text-[#0084FF] mt-0.5 flex-shrink-0 sm:mb-3">{s.step}</span>
                <div>
                  <p className="text-body font-medium text-[#0A182E]">{s.title}</p>
                  <p className="text-body-sm text-[#555555] mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- KEY FEATURES ---------- */}
      <section className="py-16 lg:py-24 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Engineering" title="Key Features" description="Verified capabilities — no exaggeration." />
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            {product.features.map((feature) => (
              <div key={feature.title} className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6 lg:p-8">
                <h3 className="text-h3 text-[#0A182E]">{feature.title}</h3>
                <p className="text-body-sm text-[#555555] mt-2 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SPECS ---------- */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-overline text-[#0084FF] mb-3">Specifications</p>
              <h2 className="text-h2 text-[#0A182E]">Technical Details</h2>
              <p className="text-body-sm text-[#555555] mt-4 leading-relaxed">
                The V3 and A3 share identical performance. The only difference between the two models is appearance.
              </p>
              {product.dimensions && (
                <p className="text-body-sm text-[#555555] mt-4">
                  <span className="font-medium text-[#0A182E]">Dimensions:</span> {product.dimensions}
                </p>
              )}
            </div>
            <SpecTable specifications={product.specifications} />
          </div>
        </div>
      </section>

      {/* ---------- SHIPPING / WARRANTY / RETURNS ---------- */}
      <section className="py-16 lg:py-24 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <Truck className="size-6 text-[#0084FF] mb-4" aria-hidden="true" />
              <h3 className="text-h3 text-[#0A182E]">Shipping</h3>
              <p className="text-body-sm text-[#555555] mt-2">Estimated delivery: {product.shipping.estimated}</p>
              <p className="text-caption text-[#888888] mt-1 leading-relaxed">{product.shipping.note}</p>
              <Link href="/shipping" className="inline-flex items-center gap-1 text-caption text-[#0084FF] mt-3 hover:text-[#3399FF] transition-colors">
                Shipping details →
              </Link>
            </div>
            <div className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <Shield className="size-6 text-[#0084FF] mb-4" aria-hidden="true" />
              <h3 className="text-h3 text-[#0A182E]">Warranty</h3>
              <p className="text-body-sm text-[#555555] mt-2">{product.warranty.duration} manufacturer warranty</p>
              <p className="text-caption text-[#888888] mt-1 leading-relaxed">{product.warranty.coverage}</p>
              <Link href="/warranty" className="inline-flex items-center gap-1 text-caption text-[#0084FF] mt-3 hover:text-[#3399FF] transition-colors">
                Warranty details →
              </Link>
            </div>
            <div className="bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <RotateCcw className="size-6 text-[#0084FF] mb-4" aria-hidden="true" />
              <h3 className="text-h3 text-[#0A182E]">Returns</h3>
              <p className="text-body-sm text-[#555555] mt-2">30-day return window from delivery date.</p>
              <p className="text-caption text-[#888888] mt-1">Product must be in original condition.</p>
              <Link href="/returns" className="inline-flex items-center gap-1 text-caption text-[#0084FF] mt-3 hover:text-[#3399FF] transition-colors">
                Return policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      {product.reviewsEnabled !== false && <ProductReviews productId={product.id} productName={product.name} />}

      {/* ---------- MOBILE STICKY PURCHASE BAR ---------- */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-[#faf9f7]/95 backdrop-blur-md border-t border-[#e0ddd8] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-body-sm font-medium text-[#0A182E] truncate">{product.name}</p>
            <p className="text-caption text-[#888888]">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!available}
            className="ml-auto h-11 px-5 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {added ? "Added ✓" : available ? "Add to Cart" : product.stockStatus === "sold_out" ? "Sold Out" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
