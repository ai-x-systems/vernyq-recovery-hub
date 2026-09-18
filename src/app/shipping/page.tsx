import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = { title: 'Shipping', description: 'Information about shipping, delivery, and large-item handling for VERNYQ products.' };

export default function ShippingPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shipping' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Shipping Policy</h1>
          <p className="text-body-lg text-[#555555] mt-3">Information about shipping, delivery, and large-item handling.</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-12">
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Shipping Regions</h2><p className="text-body text-[#555555] leading-relaxed">We currently ship within the contiguous United States. Orders ship from our U.S. warehouse. Remote or special-service areas may incur additional charges — we&apos;ll confirm any extra cost before processing your order. We do not ship to Alaska, Hawaii, or international addresses at this time.</p></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Shipping Cost</h2><p className="text-body text-[#555555] leading-relaxed">Freight shipping is included in the product price for all orders within the contiguous United States.</p></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Delivery Times</h2><div className="space-y-3">
            <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"><p className="text-body-sm font-medium text-[#0A182E]">VERNYQ V3 &amp; A3 — All-in-One Systems</p><p className="text-body-sm text-[#555555] mt-1">Dispatch in roughly 3 business days after payment verification. Delivery in roughly 7 business days after dispatch.</p></div>
          </div></section>
          <section><h2 className="text-h2 text-[#0A182E] mb-4">Large-Item Delivery</h2><p className="text-body text-[#555555] leading-relaxed">Your plunge ships via freight carrier, which will contact you to schedule delivery. Delivery includes ground-level unloading at mainland U.S. residential addresses. Indoor placement and installation are not included.</p></section>
        </div>
      </div>
    </div>
  );
}
