export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badge?: string;
  specifications: Record<string, string>;
  dimensions?: string;
  whatsIncluded: string[];
  features: { title: string; description: string }[];
  shipping: { estimated: string; note: string };
  warranty: { duration: string; coverage: string };
  variants?: ProductVariant[];
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "v1",
    slug: "vernyq-v1",
    name: "VERNYQ V1",
    tagline: "All-in-one cold plunge system for serious recovery.",
    description:
      "The VERNYQ V1 is a complete cold water immersion system engineered for home use. Every component — tub, chiller, filtration, and insulation — is integrated into one purpose-built unit. No third-party add-ons. No compromises. Just a premium recovery tool designed to perform, day after day.",
    price: 3499,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
    ],
    badge: "Flagship",
    specifications: {
      "Tub Capacity": "300 liters / 80 gallons",
      "Cooling System": "Integrated chiller, 0.5 HP compressor",
      "Temperature Range": "2°C – 15°C (36°F – 59°F)",
      Filtration: "5-micron cartridge filter + UV sterilization",
      Insulation: "12mm closed-cell foam, full-wrap",
      Exterior: "Marine-grade stainless steel shell",
      Interior: "Medical-grade tub liner",
      "Noise Level": "< 45 dB during cooling",
      Weight: "95 kg / 209 lbs (empty)",
      "Power Requirement": "110V / 60Hz, standard outlet",
      Drainage: "Integrated drain with garden hose adapter",
      Cover: "Insulated rigid cover included",
    },
    dimensions: '180 cm × 80 cm × 75 cm (71" × 31" × 30")',
    whatsIncluded: [
      "VERNYQ V1 cold plunge tub",
      "Integrated cooling chiller unit",
      "5-micron cartridge filter (1 included)",
      "UV sterilization module",
      "Insulated rigid cover",
      "Garden hose drainage adapter",
      "Setup guide & quick-start manual",
      "1-year manufacturer warranty",
    ],
    features: [
      {
        title: "Integrated Cooling",
        description:
          "Built-in chiller maintains your target temperature without ice or external equipment. Set it and forget it.",
      },
      {
        title: "Advanced Filtration",
        description:
          "5-micron cartridge filter and UV sterilization keep water clean between changes. Spend less time maintaining, more time recovering.",
      },
      {
        title: "Full-Wrap Insulation",
        description:
          "12mm closed-cell foam insulation minimizes energy consumption and maintains temperature stability even in warm environments.",
      },
      {
        title: "Built to Last",
        description:
          "Marine-grade stainless steel exterior and medical-grade interior liner. Engineered for daily use over years, not months.",
      },
    ],
    shipping: {
      estimated: "5–10 business days",
      note: "White-glove delivery available for select areas. Freight shipping to curbside included.",
    },
    warranty: {
      duration: "1 year",
      coverage:
        "Covers manufacturing defects in the tub, chiller, and filtration system. See warranty page for full details.",
    },
    category: "cold-plunge-tubs",
    inStock: true,
  },
  {
    id: "v1-pro",
    slug: "vernyq-v1-pro",
    name: "VERNYQ V1 Pro",
    tagline: "Enhanced capacity. Advanced filtration. Maximum recovery.",
    description:
      "The V1 Pro takes everything that makes the V1 exceptional and elevates it. Larger capacity, dual-stage filtration, and a more powerful chiller for athletes and dedicated users who demand the most from their cold plunge.",
    price: 4999,
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    ],
    badge: "Premium",
    specifications: {
      "Tub Capacity": "400 liters / 106 gallons",
      "Cooling System": "Integrated chiller, 1.0 HP compressor",
      "Temperature Range": "1°C – 15°C (34°F – 59°F)",
      Filtration: "Dual-stage: 5-micron + activated carbon + UV",
      Insulation: "20mm closed-cell foam, full-wrap",
      Exterior: "Brushed stainless steel shell",
      Interior: "Medical-grade tub liner",
      "Noise Level": "< 42 dB during cooling",
      Weight: "120 kg / 265 lbs (empty)",
      "Power Requirement": "110V / 60Hz, standard outlet",
      Drainage: "Integrated drain with quick-connect adapter",
      Cover: "Insulated rigid cover with hydraulic assist",
      Connectivity: "Wi-Fi temperature monitoring",
    },
    dimensions: '200 cm × 90 cm × 80 cm (79" × 35" × 31")',
    whatsIncluded: [
      "VERNYQ V1 Pro cold plunge tub",
      "Integrated cooling chiller (1.0 HP)",
      "Dual-stage filtration system",
      "UV sterilization module",
      "Insulated rigid cover with hydraulic assist",
      "Quick-connect drainage adapter",
      "Wi-Fi temperature monitoring module",
      "Setup guide & quick-start manual",
      "2-year manufacturer warranty",
    ],
    features: [
      {
        title: "Dual-Stage Filtration",
        description:
          "Combines 5-micron mechanical filtration, activated carbon, and UV sterilization for the cleanest water in the industry.",
      },
      {
        title: "Powerful Chiller",
        description:
          "1.0 HP compressor cools faster and maintains temperature even in demanding conditions. Reaches target temp in under 4 hours.",
      },
      {
        title: "Smart Monitoring",
        description:
          "Built-in Wi-Fi lets you monitor and adjust temperature from your phone. Know your plunge is ready before you step outside.",
      },
      {
        title: "Premium Construction",
        description:
          "Brushed stainless steel exterior with reinforced insulation. Designed for commercial-grade durability in a residential package.",
      },
    ],
    shipping: {
      estimated: "7–14 business days",
      note: "White-glove delivery included. Room-of-choice placement and packaging removal.",
    },
    warranty: {
      duration: "2 years",
      coverage:
        "Extended coverage on all components including chiller, filtration, and structural elements. See warranty page for details.",
    },
    category: "cold-plunge-tubs",
    inStock: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceDetailed(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}
