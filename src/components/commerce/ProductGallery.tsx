import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  /** Marks the first image as high priority for loading. */
  priority?: boolean;
}

/**
 * Accessible product image gallery: large main image with thumbnail
 * selector. Keyboard-operable (buttons), with descriptive alt text.
 */
export function ProductGallery({ images, name, priority = false }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const current = images[selected] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-[0.75rem] overflow-hidden bg-[#f3f1ee] mb-3">
        <img
          src={current}
          alt={`${name} — view ${selected + 1} of ${images.length}`}
          className="w-full h-full object-cover"
          loading={priority && selected === 0 ? "eager" : "lazy"}
          fetchPriority={priority && selected === 0 ? "high" : "auto"}
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3" role="group" aria-label={`${name} image thumbnails`}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-pressed={selected === i}
              className={`aspect-square rounded-[0.375rem] overflow-hidden border-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#0084FF] ${
                selected === i ? "border-[#0A182E]" : "border-transparent hover:border-[#e0ddd8]"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
