export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqData: FaqItem[] = [
  // Products
  {
    id: "what-is-vernyc",
    question: "What is a VERNYQ all-in-one cold plunge?",
    answer:
      "A VERNYQ system is a complete cold water immersion unit in one package: the tub with an integrated 1 HP chiller that cools and heats from 1°C to 40°C, Wi-Fi app control, and operation on a standard 110V outlet. Fill it, plug it in, and set your temperature.",
    category: "Products",
  },
  {
    id: "v3-vs-a3",
    question: "What's the difference between the V3 and the A3?",
    answer:
      "Performance is identical — same integrated 1 HP chiller, same 1–40°C cooling and heating range, same Wi-Fi app control. The only difference is the exterior design, so you can pick the look you prefer.",
    category: "Products",
  },
  {
    id: "does-it-heat",
    question: "Can it heat water too, or only cool it?",
    answer:
      "It does both. The integrated chiller covers a full 1°C to 40°C range, so the same unit handles cold plunges, warm soaks, and contrast routines.",
    category: "Products",
  },
  // Cold Plunging
  {
    id: "what-temp",
    question: "What temperature should I set my cold plunge to?",
    answer:
      "Most users find 3°C – 10°C (37°F – 50°F) effective for recovery. Beginners should start at the higher end and gradually lower the temperature as they adapt. Listen to your body and consult a healthcare provider if you have concerns.",
    category: "Cold Plunging",
  },
  {
    id: "how-often",
    question: "How often should I cold plunge?",
    answer:
      "Many users benefit from 2–4 sessions per week, but frequency depends on your goals, training load, and personal tolerance. Consistency matters more than intensity. Start with what feels manageable and build from there.",
    category: "Cold Plunging",
  },
  {
    id: "how-long",
    question: "How long should each session last?",
    answer:
      "Sessions of 2–5 minutes are common for recovery purposes. Some users extend to 10–15 minutes. The key is maintaining a consistent temperature rather than pushing for extreme duration.",
    category: "Cold Plunging",
  },
  // Setup
  {
    id: "power-requirement",
    question: "What power does the unit require?",
    answer:
      "Every VERNYQ system runs on a standard 110V / 60Hz outlet — the same as most household appliances in the US. No special electrical work is required. We recommend a dedicated circuit to avoid sharing with high-draw appliances.",
    category: "Setup",
  },
  {
    id: "where-to-place",
    question: "Where should I place my cold plunge?",
    answer:
      "The unit is freestanding and can be placed indoors or outdoors on a flat, level surface. Ensure adequate drainage nearby and access to a power outlet, with clearance around the unit for ventilation.",
    category: "Setup",
  },
  // Shipping
  {
    id: "shipping-time",
    question: "How long does shipping take?",
    answer:
      "We dispatch from our U.S. warehouse roughly 3 business days after payment verification, and delivery typically takes about 7 business days after dispatch.",
    category: "Shipping",
  },
  {
    id: "shipping-cost",
    question: "Is shipping included in the price?",
    answer:
      "Yes. Freight shipping within the contiguous United States is included in the product price, including ground-level unloading at residential addresses. Remote or special-service areas may incur additional charges, which we confirm before processing your order.",
    category: "Shipping",
  },
  {
    id: "international-shipping",
    question: "Do you ship internationally?",
    answer:
      "We currently ship within the contiguous United States. International shipping is not available at this time.",
    category: "Shipping",
  },
  // Warranty & Returns
  {
    id: "warranty-coverage",
    question: "What does the warranty cover?",
    answer:
      "Every VERNYQ system includes a 1-year manufacturer warranty covering qualifying non-human-caused damage: replacement parts, major component replacement, and whole-unit replacement in qualifying cases. Online customer service and after-sales engineering support are included. See our Warranty page for full details.",
    category: "Warranty",
  },
  {
    id: "return-policy",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return window from the date of delivery. The product must be in its original condition. Return shipping for large items may apply. See our Returns page for full details.",
    category: "Returns",
  },
  // Payments
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers and manual payment requests. After placing your order, you'll receive instructions for your selected payment method. Payment is verified manually before your order is processed.",
    category: "Payments",
  },
  {
    id: "payment-process",
    question: "How does payment verification work?",
    answer:
      "After you place an order, our team manually verifies your payment. For bank transfers, you can upload payment proof for faster processing. For payment requests, we'll email you a secure payment link.",
    category: "Payments",
  },
];

export const faqCategories = [...new Set(faqData.map((f) => f.category))];
