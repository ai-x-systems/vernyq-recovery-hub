import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = { title: 'Returns', description: 'VERN YQ return policy and return process.' };

export default function ReturnsPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Returns' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Return Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">We want you to be satisfied with your purchase. Here's our return policy.</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-12">
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Return Window</h2><p className="text-body text-[#555555] leading-relaxed">You may return your VERNYQ product within 30 days of delivery.</p></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Return Process</h2><div className="space-y-4">
            {[{ s: "01", t: "Contact Support", d: "Email support@vernyq.com with your order number." }, { s: "02", t: "Receive Authorization", d: "Our team will provide return instructions." }, { s: "03", t: "Prepare for Shipment", d: "Package the product securely." }, { s: "04", t: "Refund Processing", d: "Refund processed within 5-10 business days." }].map(i => (
              <div key={i.s} className="flex gap-4"><span className="text-overline text-[#0084FF] mt-0.5 shrink-0">{i.s}</span><div><p className="text-body font-medium text-[#0A182E]">{i.t}</p><p className="text-body-sm text-[#555555] mt-0.5">{i.d}</p></div></div>
            ))}
          </div></section>
        </div>
      </div>
    </div>
  );
}
