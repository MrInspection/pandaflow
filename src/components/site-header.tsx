import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { currentUser } from "@clerk/nextjs/server"

export default async function SiteHeader() {
  const user = await currentUser()

  return (
    <nav
      className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b backdrop-blur-lg border-gray-200 bg-white/80 transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-40 font-bold">
            PandaFlow
          </Link>
          <div className="h-full flex items-center space-x-2">
            {user ?
              <>
                <SignOutButton>
                  <Button size="sm" variant="ghost">Sign out</Button>
                </SignOutButton>
                <Link href="/dashboard" className={cn(buttonVariants({ size: "sm" }))}>
                  Dashboard <ArrowRight className="size-4" />
                </Link>
              </>
              :
              <>
                <Link href="/pricing" className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}>
                  Pricing
                </Link>
                <Link href="/sign-in" className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
                  Log In
                </Link>
                <Link href="/sign-up" className={cn(buttonVariants({ size: "sm" }))}>
                  Sign Up <ArrowRight className="size-4" />
                </Link>
              </>
            }
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}