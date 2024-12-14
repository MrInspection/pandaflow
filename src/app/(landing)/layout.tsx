import { ReactNode } from "react"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

export default function LandingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}