"use client"

import { SignIn } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="w-full flex-1 flex items-center justify-center flex-grow">
      <Link href="/" className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4")}>
        <div className="flex items-center gap-2">
          <ChevronLeft className="size-4" /> Home
        </div>
      </Link>
      <SignIn />
    </div>
  )
}