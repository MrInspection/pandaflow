import { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function AuthLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Link href="/" className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4")}>
        <div className="flex items-center gap-2">
          <ChevronLeft className="size-4" /> Home
        </div>
      </Link>
      {children}
    </div>
  )
}