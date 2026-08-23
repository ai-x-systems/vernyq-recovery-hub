import { Link } from "react-router";
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

export function CTABlock({
  overline,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  dark = false,
}: CTABlockProps) {
  return (
    <section
      className={`py-20 lg:py-28 ${dark ? "bg-[#1a1a1a] text-[#faf9f7]" : "bg-[#f3f1ee] text-[#1a1a1a]"}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          {overline && (
            <p
              className={`text-overline mb-3 ${dark ? "text-[#4a7c8a]" : "text-[#4a7c8a]"}`}
            >
              {overline}
            </p>
          )}
          <h2 className="text-h2">{title}</h2>
          {description && (
            <p
              className={`text-body-lg mt-4 leading-relaxed ${dark ? "text-[#faf9f7]/70" : "text-[#555555]"}`}
            >
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to={primaryHref}
              className={`inline-flex items-center justify-center gap-2 h-12 px-8 text-body-sm font-medium rounded-[0.5rem] transition-colors ${
                dark
                  ? "bg-[#faf9f7] text-[#1a1a1a] hover:bg-[#faf9f7]/90"
                  : "bg-[#1a1a1a] text-[#faf9f7] hover:bg-[#1a1a1a]/90"
              }`}
            >
              {primaryLabel}
              <ArrowRight className="size-4" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                to={secondaryHref}
                className={`inline-flex items-center justify-center gap-2 h-12 px-8 text-body-sm font-medium rounded-[0.5rem] border transition-colors ${
                  dark
                    ? "border-[#faf9f7]/20 text-[#faf9f7] hover:bg-[#faf9f7]/10"
                    : "border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/5"
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
