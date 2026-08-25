import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-caption text-[#888888]">
        <li>
          <Link href="/" className="hover:text-[#0A182E] transition-colors">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 text-[#e0ddd8]" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[#0A182E] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#0A182E]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
