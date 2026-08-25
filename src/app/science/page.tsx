import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/commerce/Breadcrumbs';
import { CTABlock } from '@/components/commerce/CTABlock';

export const metadata: Metadata = {
  title: 'Science',
  description: 'Evidence-based information about cold water immersion, recovery science, and practical cold plunge guidance.',
};

export default function SciencePage() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Science' }]} />
        <div className="py-12 lg:py-20 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Understanding Cold Water Immersion</h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">Cold water immersion has been studied extensively in exercise science, sports medicine, and recovery research.</p>
        </div>
        <div className="max-w-3xl pb-20 space-y-16">
          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">What is Cold Water Immersion?</h2>
            <p className="text-body text-[#555555] leading-relaxed">Cold water immersion (CWI) is the practice of submerging the body in water at temperatures typically below 15&#176;C (59&#176;F). It has been used in various forms for centuries.</p>
          </section>
          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">Temperature and Duration</h2>
            <p className="text-body text-[#555555] leading-relaxed">Most research uses temperatures between 10-15&#176;C for durations of 10-15 minutes. Sessions of 2-5 minutes are common for recovery.</p>
          </section>
          <section>
            <h2 className="text-h2 text-[#0A182E] mb-4">Safety Considerations</h2>
            <p className="text-body text-[#555555] leading-relaxed">Always consult a healthcare provider before beginning cold exposure, especially with pre-existing conditions. Never practice cold water immersion alone in deep water.</p>
          </section>
        </div>
      </div>
      <CTABlock overline="Experience It" title="Start Your Recovery Practice" description="A VERNYQ cold plunge makes consistent cold exposure simple." primaryLabel="Shop Cold Plunges" primaryHref="/cold-plunge-tubs" />
    </div>
  );
}
