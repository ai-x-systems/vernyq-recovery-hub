// Shim for next-themes — no-op
export function useTheme() {
  return { theme: "light", setTheme: () => {} };
}
