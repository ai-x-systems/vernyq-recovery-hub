import { Link } from "react-router";
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
          <Link to="/" className="hover:text-[#1a1a1a] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 text-[#e0ddd8]" />
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-[#1a1a1a] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1a1a1a]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
