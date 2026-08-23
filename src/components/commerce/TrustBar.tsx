import { Shield, Truck, HeadphonesIcon, RotateCcw } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Free Freight Shipping",
    description: "Included in every order",
  },
  {
    icon: Shield,
    title: "Manufacturer Warranty",
    description: "1–2 year coverage",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Expert help when you need it",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Hassle-free return process",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-[#e0ddd8] bg-[#f3f1ee]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex-shrink-0 size-10 rounded-[0.5rem] bg-[#faf9f7] border border-[#e0ddd8] flex items-center justify-center">
                <item.icon className="size-5 text-[#4a7c8a]" />
              </div>
              <div>
                <p className="text-body-sm font-medium text-[#1a1a1a]">
                  {item.title}
                </p>
                <p className="text-caption text-[#888888] mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
