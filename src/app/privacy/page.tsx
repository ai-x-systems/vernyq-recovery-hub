import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'VERN YQ privacy policy.' };

export default function PrivacyPage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Privacy Policy</h1>
          <p className="text-body-sm text-[#888888] mt-3">Last updated: January 2025</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-8">
          <section><p className="text-body text-[#555555] leading-relaxed">This Privacy Policy describes how VERNYQ collects, uses, and shares information when you visit our website and purchase our products.</p></section>
          <section><h2 className="text-h3 text-[#0A182E] mb-3">Information We Collect</h2><p className="text-body-sm text-[#555555] leading-relaxed">We collect information you provide directly, including your name, email address, shipping address, phone number, and payment information when you place an order.</p></section>
          <section><h2 className="text-h3 text-[#0A182E] mb-3">Information Sharing</h2><p className="text-body-sm text-[#555555] leading-relaxed">We do not sell your personal information. We share information only with service providers who assist in order fulfillment and payment processing.</p></section>
          <section><h2 className="text-h3 text-[#0A182E] mb-3">Contact</h2><p className="text-body-sm text-[#555555] leading-relaxed">For privacy-related inquiries, contact us at support@vernyq.com.</p></section>
        </div>
      </div>
    </div>
  );
}
