"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({ children, redirectUrl }: { children: React.ReactNode; redirectUrl?: string }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoading && !isAuthenticated) {
      const returnTo = redirectUrl || window.location.pathname;
      router.push(`/auth?redirect=${encodeURIComponent(returnTo)}`);
    }
  }, [isAuthenticated, isLoading, redirectUrl, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
        <div className="text-[#888888] text-body-sm">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
