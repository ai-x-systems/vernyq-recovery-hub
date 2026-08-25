"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Truck, Shield, RotateCcw, Package, Plus, Minus, Mail, ArrowRight } from "lucide-react";
import { formatPrice } from "@/data/products";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { SectionHeader } from "@/components/commerce/SectionHeader";

function SpecTable({ specifications }: { specifications: Record<string, string> }) {
  return (
    <div className="border border-[#e0ddd8] rounded-[0.5rem] overflow-hidden">
      {Object.entries(specifications).map(([key, value], index) => (
        <div key={key} className={`flex flex-col sm:flex-row sm:items-center ${index !== 0 ? "border-t border-[#e0ddd8]" : ""}`}>
          <div className="sm:w-1/3 px-5 py-3.5 bg-[#f3f1ee]">
            <span className="text-body-sm font-medium text-[#0A182E]">{key}</span>
          </div>
          <div className="sm:w-2/3 px-5 py-3.5">
            <span className="text-body-sm text-[#555555]">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailContent({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cold Plunge Tubs", href: "/cold-plunge-tubs" }, { label: product.name }]} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pb-16 lg:pb-24">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/3] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee] mb-3">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-[0.375rem] overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-[#0A182E]" : "border-transparent hover:border-[#e0ddd8]"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-[#0084FF]/10 text-[#0084FF] text-caption font-medium rounded-[0.25rem] mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-h1 text-[#0A182E]">{product.name}</h1>
            <p className="text-body-lg text-[#555555] mt-3 leading-relaxed">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-price text-[#0A182E]">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-body text-[#888888] line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
            <p className="text-caption text-[#888888] mt-1">Freight shipping included · Payment processed after order review</p>

            <div className="flex items-center gap-2 mt-5">
              <div className="size-2 rounded-full bg-[#4a8a5c]" />
              <span className="text-body-sm text-[#4a8a5c]">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div className="mt-6 space-y-2">
              {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Check className="size-4 text-[#0084FF] shrink-0" />
                  <span className="text-body-sm text-[#555555]"><span className="text-[#0A182E] font-medium">{key}:</span> {value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-4">
                <label className="text-body-sm font-medium text-[#0A182E]">Quantity</label>
                <div className="flex items-center border border-[#e0ddd8] rounded-[0.375rem]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-[#555555] hover:text-[#0A182E] transition-colors">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-body-sm font-medium text-[#0A182E] border-x border-[#e0ddd8]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-[#555555] hover:text-[#0A182E] transition-colors">
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => addItem(product, quantity)}
                disabled={!product.inStock}
                className="w-full h-12 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart — {formatPrice(product.price * quantity)}
              </button>

              <Link href="/contact" className="flex items-center justify-center gap-2 h-10 w-full border border-[#e0ddd8] text-[#555555] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#f3f1ee] transition-colors">
                <Mail className="size-4" /> Ask a Question
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Truck, label: product.shipping.estimated },
                { icon: Shield, label: `${product.warranty.duration} Warranty` },
                { icon: RotateCcw, label: "30-Day Returns" },
                { icon: Package, label: "Freight Included" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-caption text-[#888888]">
                  <item.icon className="size-4 text-[#0084FF]" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <section className="py-16 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Included" title="What's in the Box" description="Everything you need to start cold plunging." align="left" />
          <div className="grid sm:grid-cols-2 gap-3 mt-10 max-w-3xl">
            {product.whatsIncluded.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] px-4 py-3">
                <Check className="size-4 text-[#0084FF] shrink-0" />
                <span className="text-body-sm text-[#0A182E]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-overline text-[#0084FF] mb-3">Specifications</p>
              <h2 className="text-h2 text-[#0A182E]">Technical Details</h2>
              {product.dimensions && (
                <p className="text-body-sm text-[#555555] mt-4"><span className="font-medium text-[#0A182E]">Dimensions:</span> {product.dimensions}</p>
              )}
            </div>
            <SpecTable specifications={product.specifications} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-[#f3f1ee]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader overline="Engineering" title="Key Features" description="Designed for performance, built for durability." />
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

      {/* Shipping & Warranty */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <Truck className="size-6 text-[#0084FF] mb-4" />
              <h3 className="text-h3 text-[#0A182E]">Shipping</h3>
              <p className="text-body-sm text-[#555555] mt-2">Estimated delivery: {product.shipping.estimated}</p>
              <p className="text-caption text-[#888888] mt-1">{product.shipping.note}</p>
              <a href="/shipping" className="inline-flex items-center gap-1 text-caption text-[#0084FF] mt-3 hover:text-[#3399FF] transition-colors">Shipping details →</a>
            </div>
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <Shield className="size-6 text-[#0084FF] mb-4" />
              <h3 className="text-h3 text-[#0A182E]">Warranty</h3>
              <p className="text-body-sm text-[#555555] mt-2">{product.warranty.duration} manufacturer warranty</p>
              <p className="text-caption text-[#888888] mt-1">{product.warranty.coverage}</p>
              <a href="/warranty" className="inline-flex items-center gap-1 text-caption text-[#0084FF] mt-3 hover:text-[#3399FF] transition-colors">Warranty details →</a>
            </div>
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
              <RotateCcw className="size-6 text-[#0084FF] mb-4" />
              <h3 className="text-h3 text-[#0A182E]">Returns</h3>
              <p className="text-body-sm text-[#555555] mt-2">30-day return window from delivery date</p>
              <p className="text-caption text-[#888888] mt-1">Product must be in original condition.</p>
              <a href="/returns" className="inline-flex items-center gap-1 text-caption text-[#0084FF] mt-3 hover:text-[#3399FF] transition-colors">Return policy →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
