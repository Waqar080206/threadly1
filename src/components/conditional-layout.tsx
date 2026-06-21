"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/nav";

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Nav />}

      {children}
    </>
  );
}