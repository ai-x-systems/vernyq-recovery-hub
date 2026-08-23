import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/data/faq";

interface FAQAccordionProps {
  items: FaqItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-[#e0ddd8] border border-[#e0ddd8] rounded-[0.5rem] overflow-hidden">
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#f3f1ee]/50 transition-colors"
          >
            <span className="text-body font-medium text-[#1a1a1a]">
              {item.question}
            </span>
            <span className="flex-shrink-0 size-8 rounded-full border border-[#e0ddd8] flex items-center justify-center">
              {openId === item.id ? (
                <Minus className="size-4 text-[#1a1a1a]" />
              ) : (
                <Plus className="size-4 text-[#1a1a1a]" />
              )}
            </span>
          </button>
          {openId === item.id && (
            <div className="px-5 pb-5">
              <p className="text-body-sm text-[#555555] leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
