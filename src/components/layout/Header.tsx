"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { VernyqLogo } from "@/components/ui/logo";

const navLinks = [
  { label: "Shop", href: "/cold-plunge-tubs" },
  { label: "Science", href: "/science" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#e0ddd8]"
            : "bg-[#faf9f7]/80 backdrop-blur-sm"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-2 text-[#0A182E] hover:text-[#555555] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-body-sm font-medium transition-colors hover:text-[#0A182E]",
                    pathname === link.href ? "text-[#0A182E]" : "text-[#555555]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              <VernyqLogo variant="full" color="dark" className="h-9 lg:h-10" />
            </Link>

            <div className="flex items-center gap-3 lg:gap-6">
              <button
                className="hidden lg:block p-2 text-[#555555] hover:text-[#0A182E] transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>

              <button
                onClick={openCart}
                className="relative p-2 text-[#555555] hover:text-[#0A182E] transition-colors"
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 size-4.5 bg-[#0084FF] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link
                href="/cold-plunge-tubs"
                className="hidden lg:inline-flex items-center justify-center h-9 px-5 bg-[#0084FF] text-white text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0084FF]/90 transition-colors shadow-sm"
              >
                Shop Cold Plunges
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-[#faf9f7] border-b border-[#e0ddd8] shadow-lg z-50">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-6 py-3 text-body font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#0A182E] bg-[#f3f1ee]"
                      : "text-[#555555] hover:bg-[#f3f1ee]/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-[#e0ddd8] mt-2 pt-2 px-6">
                <Link
                  href="/cold-plunge-tubs"
                  className="flex items-center justify-center h-11 bg-[#0084FF] text-white text-body-sm font-medium rounded-[0.5rem] w-full"
                >
                  Shop Cold Plunges
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
