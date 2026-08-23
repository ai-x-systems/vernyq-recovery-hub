export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "cold-water-immersion-explained",
    title: "Cold Water Immersion: What the Research Actually Says",
    excerpt:
      "A clear, evidence-based overview of cold water immersion — what it does, how it works, and what the current research supports.",
    content: `
## Understanding Cold Water Immersion

Cold water immersion (CWI) has become one of the most discussed recovery methods in sports science and wellness. But what does the research actually say?

### The Basics

When your body is exposed to cold water, several physiological responses occur. Blood vessels constrict, reducing blood flow to extremities. Heart rate increases. The body activates thermoregulatory mechanisms to maintain core temperature.

### What Research Shows

Studies in exercise science have examined cold water immersion's effects on recovery markers including inflammation, muscle soreness, and perceived recovery. Results vary based on temperature, duration, individual factors, and what outcomes are measured.

### Temperature and Duration Matter

Most research uses temperatures between 10°C–15°C (50°F–59°F) for durations of 10–15 minutes. Some studies use colder temperatures for shorter periods. The specific protocol can significantly affect outcomes.

### Important Considerations

Cold water immersion is not appropriate for everyone. Individuals with cardiovascular conditions, Raynaud's disease, or cold urticaria should consult a healthcare provider before beginning cold exposure practice.

### The Bottom Line

The research on cold water immersion is evolving. While many people report subjective benefits, the scientific evidence varies by outcome measure. We recommend approaching cold plunge practice as one component of a broader recovery strategy, and consulting with healthcare professionals for personalized guidance.

---

*This article is for educational purposes only and does not constitute medical advice.*
    `,
    author: "VERNYQ Research",
    authorRole: "Editorial Team",
    publishedDate: "2025-01-15",
    readingTime: "6 min read",
    category: "Science",
    tags: [
      "cold water immersion",
      "cold plunge research",
      "recovery science",
      "cold exposure",
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
  },
  {
    id: "2",
    slug: "how-to-set-up-cold-plunge",
    title: "How to Set Up Your Cold Plunge at Home",
    excerpt:
      "A practical guide to choosing the right location, preparing your space, and getting your cold plunge system running smoothly.",
    content: `
## Setting Up Your Cold Plunge

Getting your cold plunge set up correctly from the start will save you time and ensure the best experience. Here's what to consider.

### Choosing the Right Location

Your cold plunge needs a flat, level surface with access to:
- A standard 110V power outlet
- A drainage point (floor drain or garden hose access)
- Adequate ventilation space (at least 12 inches on all sides)

Both indoor and outdoor placements work. Consider proximity to a bathroom or changing area for convenience.

### Preparing the Space

Before your plunge arrives:
1. Measure your intended space carefully
2. Ensure the floor can support the weight (tub + water = 300+ kg)
3. Clear the path from delivery point to placement location
4. If outdoors, ensure the surface drains well

### Initial Setup

1. Place the tub on your prepared surface
2. Connect the drainage adapter
3. Fill with clean tap water
4. Plug in and set your target temperature
5. Allow 2–6 hours for initial cooling

### First Use

Wait until water reaches your target temperature before your first session. Start with 1–2 minutes at a comfortable cold temperature and gradually increase duration and decrease temperature over subsequent sessions.

### Maintenance Routine

After setup, establish a simple maintenance routine:
- Check water clarity daily
- Clean or replace filters as needed
- Change water every 2–4 weeks
- Keep the cover on when not in use
    `,
    author: "VERNYQ Team",
    authorRole: "Product Team",
    publishedDate: "2025-01-10",
    readingTime: "5 min read",
    category: "Setup",
    tags: ["cold plunge setup", "home cold plunge", "installation guide"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
  },
  {
    id: "3",
    slug: "cold-plunge-vs-ice-bath",
    title: "Cold Plunge vs. Ice Bath: What's the Difference?",
    excerpt:
      "A straightforward comparison of purpose-built cold plunge systems versus traditional ice baths, and which approach works best for consistent recovery.",
    content: `
## Cold Plunge vs. Ice Bath

The terms are often used interchangeably, but there are meaningful differences between a dedicated cold plunge system and a traditional ice bath.

### Ice Baths

An ice bath typically refers to a container filled with water and ice. It's the traditional method used by athletes for decades. The temperature depends on how much ice you add and ambient conditions.

**Pros:**
- Low initial cost
- Portable
- Simple to set up

**Cons:**
- Requires ongoing ice purchases
- Temperature is inconsistent and hard to control
- Water quality degrades quickly
- No filtration or sanitation
- Time-consuming to prepare each session

### Cold Plunge Systems

A cold plunge system like VERNYQ is a purpose-built unit with integrated cooling, filtration, and insulation. It maintains a set temperature automatically.

**Pros:**
- Consistent, precise temperature control
- Built-in filtration keeps water clean
- Available on demand — no preparation needed
- Lower long-term cost vs. daily ice purchases
- Designed for daily use

**Cons:**
- Higher upfront investment
- Requires electrical connection
- Fixed location (not portable)

### Which Is Right for You?

If you're new to cold exposure and want to experiment, ice baths are accessible. But for consistent, daily cold plunge practice, a dedicated system eliminates the friction of preparation and temperature uncertainty.

The best cold plunge is the one you'll actually use regularly.
    `,
    author: "VERNYQ Team",
    authorRole: "Editorial Team",
    publishedDate: "2025-01-05",
    readingTime: "4 min read",
    category: "Education",
    tags: [
      "cold plunge vs ice bath",
      "ice bath comparison",
      "cold plunge benefits",
    ],
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export const blogCategories = [...new Set(blogPosts.map((p) => p.category))];
