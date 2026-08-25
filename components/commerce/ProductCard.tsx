"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] rounded-[0.5rem] overflow-hidden bg-[#f3f1ee] mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#0A182E] text-[#faf9f7] text-caption font-medium rounded-[0.25rem]">
              {product.badge}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-h3 group-hover:text-[#0084FF] transition-colors">
            {product.name}
          </h3>
          <p className="text-body-sm text-[#555555] leading-relaxed">
            {product.tagline}
          </p>
          {product.specifications["Temperature Range"] && (
            <p className="text-caption text-[#888888]">
              {product.specifications["Temperature Range"]}
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            <p className="text-price">{formatPrice(product.price)}</p>
            <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[#0084FF] opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
