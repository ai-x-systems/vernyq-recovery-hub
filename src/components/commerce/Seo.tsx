import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  /** Path starting with "/" — combined with the current origin for canonical/OG URL. */
  canonicalPath?: string;
  type?: "website" | "product" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Client-side SEO manager for the SPA. Sets document.title, meta
 * description, canonical URL, Open Graph / Twitter tags, and injects a
 * JSON-LD script that is removed on unmount.
 */
export function Seo({ title, description, canonicalPath, type = "website", image, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const url = window.location.origin + (canonicalPath ?? window.location.pathname);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [title, description, canonicalPath, type, image, jsonLd]);

  return null;
}
