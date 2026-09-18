"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const soldOut = !product.inStock;

  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#0A182E] text-[#faf9f7] text-caption font-medium rounded-[0.25rem]">
              {product.badge}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-h3 group-hover:text-[#0084FF] transition-colors">{product.name}</h3>
          <p className="text-body-sm text-[#555555] leading-relaxed">{product.tagline}</p>
          {product.specifications["Temperature Range"] && (
            <p className="text-caption text-[#888888]">{product.specifications["Temperature Range"]}</p>
          )}
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                product.stockStatus === "sold_out" || product.stockStatus === "unavailable"
                  ? "bg-[#c4544a]"
                  : product.stockStatus === "preorder"
                    ? "bg-[#b8923e]"
                    : "bg-[#4a8a5c]"
              }`}
            />
            <span className="text-caption text-[#888888]">{product.availabilityLabel}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-price">{formatPrice(product.price)}</p>
            <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[#0084FF] opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
