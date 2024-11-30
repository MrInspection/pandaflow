import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { EB_Garamond } from "next/font/google"

import "./globals.css"
import { ReactNode } from "react"
import { Providers } from "@/components/providers"
import { ClerkProvider } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "PandaFlow",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
      <body className="font-sans bg-brand-50 text-brand-950 antialiased">
      <Providers>{children}</Providers>
      </body>
      </html>
    </ClerkProvider>
  )
}
