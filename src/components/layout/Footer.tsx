import { Link } from "react-router";

const footerLinks = {
  Shop: [
    { label: "Cold Plunge Tubs", href: "/cold-plunge-tubs" },
  ],
  Learn: [
    { label: "Science", href: "/science" },
    { label: "Journal", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  Support: [
    { label: "Shipping", href: "/shipping" },
    { label: "Warranty", href: "/warranty" },
    { label: "Returns", href: "/returns" },
    { label: "Contact", href: "/contact" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Order Tracking", href: "/tracking" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#faf9f7]/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-16 lg:py-20">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-overline text-[#faf9f7]/50 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-body-sm text-[#faf9f7]/70 hover:text-[#faf9f7] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand + Newsletter */}
        <div className="border-t border-[#faf9f7]/10 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <span className="text-xl font-semibold tracking-[0.15em] text-[#faf9f7]">
                VERNYQ
              </span>
              <p className="text-body-sm text-[#faf9f7]/50 mt-3 leading-relaxed">
                Premium cold plunge systems engineered for home recovery.
                Designed to perform. Built to last.
              </p>
            </div>

            <div className="max-w-sm w-full">
              <h3 className="text-overline text-[#faf9f7]/50 mb-3">
                Stay Updated
              </h3>
              <form
                className="flex"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-10 px-4 bg-[#faf9f7]/5 border border-[#faf9f7]/10 rounded-l-[0.5rem] text-body-sm text-[#faf9f7] placeholder:text-[#faf9f7]/30 focus:outline-none focus:border-[#4a7c8a]/50"
                />
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#faf9f7] text-[#1a1a1a] text-body-sm font-medium rounded-r-[0.5rem] hover:bg-[#faf9f7]/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#faf9f7]/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-[#faf9f7]/40">
            © {new Date().getFullYear()} VERNYQ. All rights reserved.
          </p>
          <p className="text-caption text-[#faf9f7]/40">
            Premium recovery systems. Made for the dedicated.
          </p>
        </div>
      </div>
    </footer>
  );
}
