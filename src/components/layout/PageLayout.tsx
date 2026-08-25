"use client";

import { ReactNode } from "react";
import { CartDrawer } from "@/components/commerce/CartDrawer";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <CartDrawer />
    </>
  );
}
