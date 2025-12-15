import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function SiteHeader() {
  const user = await currentUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-100 h-16 w-full border-gray-200 border-b bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="z-40 flex items-center gap-2 font-bold">
            <Image
              src="/pandaflow.png"
              alt="PandaFlow Logo"
              className="h-7 w-auto"
              width={40}
              height={40}
            />
            PandaFlow
          </Link>
          <div className="flex h-full items-center space-x-2">
            {user ? (
              <>
                <SignOutButton>
                  <Button size="sm" variant="ghost">
                    Sign out
                  </Button>
                </SignOutButton>
                <Link
                  href="/dashboard"
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Dashboard <ArrowRight className="size-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" }),
                  )}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                  )}
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Sign Up <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
