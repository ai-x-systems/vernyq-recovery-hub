import { useLocation, useNavigate, useSearchParams as useRouterSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function usePathname(): string {
  const { pathname } = useLocation();
  return pathname;
}

export function useRouter() {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      push: (url: string) => navigate(url),
      replace: (url: string) => navigate(url, { replace: true }),
      back: () => navigate(-1),
      refresh: () => window.location.reload(),
      prefetch: async () => {},
    }),
    [navigate]
  );
}

export function useSearchParams(): [URLSearchParams, (params: URLSearchParams | Record<string, string>) => void] {
  const [searchParams, setSearchParams] = useRouterSearchParams();
  const set = (params: URLSearchParams | Record<string, string>) => {
    if (params instanceof URLSearchParams) {
      setSearchParams(params);
    } else {
      setSearchParams(params);
    }
  };
  return [searchParams, set];
}

export function useServerInsertedHTML() {
  // no-op in Vite
}
