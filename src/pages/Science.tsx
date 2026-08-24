import { Link } from "react-router";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { CTABlock } from "@/components/commerce/CTABlock";

export default function Science() {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Science" }]} />

        {/* Hero */}
        <div className="py-12 lg:py-20 max-w-3xl">
          <p className="text-overline text-[#0084FF] mb-3">
            The Science of Recovery
          </p>
          <h1 className="text-h1 text-[#0A182E]">
            Understanding Cold Water Immersion
          </h1>
          <p className="text-body-lg text-[#555555] mt-4 leading-relaxed">
            Cold water immersion has been studied extensively in exercise science,
            sports medicine, and recovery research. Here's what the evidence
            suggests — and what remains unknown.
          </p>
        </div>

        {/* Medical disclaimer */}
        <div className="flex items-start gap-3 p-5 bg-[#b8923e]/10 border border-[#b8923e]/20 rounded-[0.5rem] mb-16">
          <AlertTriangle className="size-5 text-[#b8923e] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-body-sm font-medium text-[#0A182E]">
              Important Disclaimer
            </p>
            <p className="text-caption text-[#555555] mt-1 leading-relaxed">
              This page is for educational purposes only. It does not constitute
              medical advice. Cold water immersion may not be appropriate for
              everyone. Consult a healthcare professional before beginning any
              cold exposure practice, especially if you have cardiovascular
              conditions, Raynaud's disease, cold urticaria, or other health
              concerns.
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="max-w-3xl pb-20">
          {/* Section: What is CWI */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              What is Cold Water Immersion?
            </h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              Cold water immersion (CWI) is the practice of submerging the body
              in water at temperatures typically below 15°C (59°F). It has been
              used in various forms for centuries, from traditional bathing
              practices to modern athletic recovery protocols.
            </p>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              In a recovery context, CWI is typically performed after exercise
              or training. The practice involves immersing part or all of the
              body for a set duration, then allowing the body to warm naturally.
            </p>
          </article>

          {/* Section: Physiological Response */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              The Physiological Response
            </h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              When exposed to cold water, the body initiates several
              physiological responses:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Vasoconstriction",
                  desc: "Blood vessels near the skin surface constrict, redirecting blood flow toward the core to maintain core temperature.",
                },
                {
                  title: "Increased Heart Rate",
                  desc: "Heart rate may increase as the body responds to the cold stimulus. This response varies significantly between individuals.",
                },
                {
                  title: "Thermoregulatory Response",
                  desc: "The body activates mechanisms to generate heat, including shivering and metabolic adjustments.",
                },
                {
                  title: "Nervous System Activation",
                  desc: "Cold exposure activates the sympathetic nervous system, which may influence alertness and perceived energy levels.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5"
                >
                  <h3 className="text-body font-medium text-[#0A182E]">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-[#555555] mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Section: What Research Shows */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              What Does the Research Show?
            </h2>
            <p className="text-body text-[#555555] leading-relaxed mb-4">
              Research on CWI and recovery has produced mixed but informative
              results. Key findings include:
            </p>
            <div className="space-y-3">
              {[
                "Some studies suggest CWI may reduce perceived muscle soreness after exercise, though results are not consistent across all populations and exercise types.",
                "The effects of CWI on subsequent exercise performance are debated. Some research suggests it may blunt long-term training adaptations when used immediately after resistance training.",
                "Temperature, duration, timing, and individual factors all influence outcomes. There is no single \"optimal\" protocol that applies to everyone.",
                "Most studies use temperatures between 10°C–15°C (50°F–59°F) for durations of 10–15 minutes, but protocols vary widely.",
                "The psychological effects — including alertness, mood, and perceived recovery — are reported by many practitioners but are harder to measure objectively.",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <div className="size-1.5 rounded-full bg-[#0084FF] mt-2.5 flex-shrink-0" />
                  <p className="text-body text-[#555555] leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Section: Temperature & Duration */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Temperature and Duration
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
                <p className="text-overline text-[#0084FF] mb-2">Temperature</p>
                <p className="text-h3 text-[#0A182E]">10°C – 15°C</p>
                <p className="text-body-sm text-[#555555] mt-2">
                  (50°F – 59°F) — commonly used range in research studies.
                  Some practitioners prefer colder temperatures.
                </p>
              </div>
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-6">
                <p className="text-overline text-[#0084FF] mb-2">Duration</p>
                <p className="text-h3 text-[#0A182E]">2 – 5 minutes</p>
                <p className="text-body-sm text-[#555555] mt-2">
                  Common for recovery purposes. Some extend to 10–15 minutes.
                  Consistent practice matters more than extreme duration.
                </p>
              </div>
            </div>
            <p className="text-body text-[#555555] leading-relaxed mt-6">
              Start conservatively and adjust based on your experience and
              comfort. Lower temperatures require shorter durations. There is no
              single correct protocol — individual tolerance and goals matter.
            </p>
          </article>

          {/* Section: Consistency */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              The Role of Consistency
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              Like many recovery practices, consistency appears to matter more
              than intensity. Regular, moderate cold exposure may provide more
              cumulative benefit than occasional extreme sessions. This is one
              reason why having a cold plunge system at home — ready whenever
              you need it — can support a sustainable recovery routine.
            </p>
          </article>

          {/* Section: Safety */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              Safety Considerations
            </h2>
            <div className="space-y-3">
              {[
                "Always consult a healthcare provider before beginning cold exposure, especially with pre-existing conditions.",
                "Never practice cold water immersion alone, particularly in deep water.",
                "Exit the water immediately if you experience numbness, dizziness, difficulty breathing, or chest pain.",
                "Allow your body to warm gradually after immersion.",
                "Avoid cold water immersion if you are pregnant, have uncontrolled hypertension, or have a diagnosed heart condition.",
                "Start with shorter durations and warmer temperatures, and progress gradually.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <AlertTriangle className="size-4 text-[#b8923e] mt-1 flex-shrink-0" />
                  <p className="text-body-sm text-[#555555]">{text}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Section: Our Approach */}
          <article className="mb-16">
            <h2 className="text-h2 text-[#0A182E] mb-4">
              The VERNYQ Approach
            </h2>
            <p className="text-body text-[#555555] leading-relaxed">
              We believe in evidence-informed recovery. That means understanding
              what research shows, acknowledging what remains uncertain, and
              designing products that make consistent practice easy and safe. We
              don't make medical claims. We build tools that support your
              recovery practice.
            </p>
          </article>

          {/* References placeholder */}
          <div className="border-t border-[#e0ddd8] pt-8">
            <p className="text-overline text-[#888888] mb-4">
              Further Reading
            </p>
            <div className="space-y-2">
              {[
                "Cochrane, D. J. (2011). Alternating hot and cold water immersion for athlete recovery: a review. Physical Therapy in Sport.",
                "Bleakley, C. M., & Davison, G. W. (2010). What is the biochemical and physiological rationale for using cold-water immersion in exercise recovery? British Journal of Sports Medicine.",
                "Machado, A. F., et al. (2016). Can water temperature and immersion time influence the effect of cold water immersion on muscle soreness? A systematic review and meta-analysis.",
                "Costello, J. T., et al. (2015). Whole-body cryotherapy (extreme cold air exposure) for preventing and treating muscle soreness after exercise in adults. Cochrane Database of Systematic Reviews.",
              ].map((ref, i) => (
                <p key={i} className="text-caption text-[#888888]">
                  [{i + 1}] {ref}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTABlock
        overline="Experience It"
        title="Start Your Recovery Practice"
        description="A VERNYQ cold plunge makes consistent cold exposure simple."
        primaryLabel="Shop Cold Plunges"
        primaryHref="/cold-plunge-tubs"
      />
    </div>
  );
}
