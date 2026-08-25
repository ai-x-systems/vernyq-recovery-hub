import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  overline?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export function CTABlock({ overline, title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref, dark = false }: CTABlockProps) {
  return (
    <section className={`py-20 lg:py-28 ${dark ? "bg-[#0A182E] text-[#faf9f7]" : "bg-[#f3f1ee] text-[#0A182E]"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          {overline && <p className="text-overline mb-3 text-[#0084FF]">{overline}</p>}
          <h2 className="text-h2">{title}</h2>
          {description && <p className={`text-body-lg mt-4 leading-relaxed ${dark ? "text-[#faf9f7]/70" : "text-[#555555]"}`}>{description}</p>}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href={primaryHref}
              className={`inline-flex items-center justify-center gap-2 h-12 px-8 text-body-sm font-medium rounded-[0.5rem] transition-colors ${
                dark ? "bg-[#faf9f7] text-[#0A182E] hover:bg-[#faf9f7]/90" : "bg-[#0A182E] text-[#faf9f7] hover:bg-[#0A182E]/90"
              }`}
            >
              {primaryLabel}
              <ArrowRight className="size-4" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className={`inline-flex items-center justify-center gap-2 h-12 px-8 text-body-sm font-medium rounded-[0.5rem] border transition-colors ${
                  dark ? "border-[#faf9f7]/20 text-[#faf9f7] hover:bg-[#faf9f7]/10" : "border-[#0A182E]/20 text-[#0A182E] hover:bg-[#0A182E]/5"
                }`}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
