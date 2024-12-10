"use client"

import { SignUp } from "@clerk/nextjs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center flex-grow">
      <Link href="/" className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4")}>
        <div className="flex items-center gap-2">
          <ChevronLeft className="size-4" /> Home
        </div>
      </Link>
      <SignUp />
    </div>
  )
}