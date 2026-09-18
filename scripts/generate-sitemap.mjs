import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "../src/data/products.ts";
import { blogPosts } from "../src/data/blog.ts";

/**
 * Generates public/sitemap.xml before each build (`prebuild` script).
 *
 * Sources every real route from the app's data so it never drifts:
 * static pages, the collection, one URL per product, and blog articles.
 * Product/blog URLs are emitted only when the content exists — an
 * unauthenticated Vercel build can't query Supabase, so admin-added
 * products won't appear here. Add new static routes to STATIC_ROUTES.
 */

const SITE = process.env.SITE_URL || "https://vernyq.com";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/cold-plunge-tubs", priority: "0.9", changefreq: "weekly" },
  { path: "/science", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/shipping", priority: "0.5", changefreq: "yearly" },
  { path: "/warranty", priority: "0.5", changefreq: "yearly" },
  { path: "/returns", priority: "0.5", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

const today = new Date().toISOString().slice(0, 10);

const urls = [];

for (const r of STATIC_ROUTES) {
  urls.push(
    `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  );
}

for (const p of products) {
  urls.push(
    `  <url>\n    <loc>${SITE}/product/${p.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`
  );
}

for (const post of blogPosts) {
  const lastmod = new Date(post.publishedDate).toISOString().slice(0, 10);
  urls.push(
    `  <url>\n    <loc>${SITE}/blog/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const outDir = resolve(process.cwd(), "public");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "sitemap.xml"), xml);
console.log(`sitemap.xml generated: ${urls.length} URLs (site: ${SITE})`);
