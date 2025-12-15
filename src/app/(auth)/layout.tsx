import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="flex min-h-screen flex-col bg-white">{children}</div>;
}
