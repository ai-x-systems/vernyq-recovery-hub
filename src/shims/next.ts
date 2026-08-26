// Shim for `next` — no-ops for server-only exports
export type Metadata = Record<string, unknown>;
export const metadata: Metadata = {};

export function notFound(): never {
  throw new Error("notFound() called in Vite environment");
}
