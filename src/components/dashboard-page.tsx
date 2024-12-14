"use client"

import { ReactNode } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import { Heading } from "@/components/headings"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardPageProps {
  title: string
  children?: ReactNode
  hideBackButton?: boolean
  cta?: ReactNode
}

export function DashboardPage({ title, children, hideBackButton, cta }: DashboardPageProps) {
  const router = useRouter()
  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="w-full p-6 sm:px-8 sm:pb-0 sm:pt-8 flex justify-between border-gray-200">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-6">
            {hideBackButton ? null : (
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-fit bg-white"
                variant="outline"
              >
                <ChevronLeft className="size-4" />
              </Button>
            )}
            <Heading className="sm:text-4xl">{title}</Heading>
          </div>

          {cta ? <div>{cta}</div> : null}
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}
