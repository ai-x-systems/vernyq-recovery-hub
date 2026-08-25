import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = { title: 'Terms of Service', description: 'VERN YQ terms of service.' };

export default function TermsPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Terms of Service</h1>
          <p className="text-body-sm text-[#888888] mt-3">Last updated: January 2025</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-8">
          <section><p className="text-body text-[#555555] leading-relaxed">These Terms of Service govern your use of the VERNYQ website and purchase of VERNYQ products.</p></section>
          <section><h2 className="text-h3 text-[#0A182E] mb-3">Pricing</h2><p className="text-body-sm text-[#555555] leading-relaxed">All prices are in US Dollars. We reserve the right to modify prices at any time.</p></section>
          <section><h2 className="text-h3 text-[#0A182E] mb-3">Orders</h2><p className="text-body-sm text-[#555555] leading-relaxed">Placing an order constitutes an offer to purchase. Orders are subject to payment verification before processing.</p></section>
          <section><h2 className="text-h3 text-[#0A182E] mb-3">Contact</h2><p className="text-body-sm text-[#555555] leading-relaxed">For questions about these terms, contact us at support@vernyq.com.</p></section>
        </div>
      </div>
    </div>
  );
}
