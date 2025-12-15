import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "PandaFlow",
  description: "Real-Time SaaS Insights, Delivered to Your Discord.",
  openGraph: {
    url: "https://pandaflow.vercel.app",
    title: "PandaFlow",
    description: "Real-Time SaaS Insights, Delivered to Your Discord.",
    images: [
      {
        url: "https://pandaflow.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "PandaFlow",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)} suppressHydrationWarning>
        <body className="bg-brand-50 font-sans text-brand-950 antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
