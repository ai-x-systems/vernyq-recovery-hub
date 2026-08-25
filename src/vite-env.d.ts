/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VLY_APP_ID?: string;
  readonly VITE_VLY_MONITORING_URL?: string;
  readonly NEXT_PUBLIC_CONVEX_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
