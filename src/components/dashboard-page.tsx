import { ReactNode } from "react"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Heading } from "@/components/headings"
import Link from "next/link"

interface DashboardPageProps {
  title: string
  children?: ReactNode
  hideBackButton?: boolean
  cta?: ReactNode
}

export function DashboardPage({ title, children, hideBackButton, cta }: DashboardPageProps) {
  return (
    <section className="flex-1 size-full flex flex-col">
      <div className="p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="flex max-sm:flex-col sm:items-center gap-y-2 gap-x-8">
          {hideBackButton ? null : <Link href="/dashboard" className={buttonVariants({ variant: "outline", className: "w-fit bg-white" })}>
            <ChevronLeft className="size-4" />
          </Link>}
          <Heading>{title}</Heading>
          {cta ? <div>{cta}</div> : null}
        </div>
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}
