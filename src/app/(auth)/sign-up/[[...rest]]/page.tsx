"use client";

import { SignUp } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  return (
    <div className="flex w-full flex-1 grow items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 left-4",
        )}
      >
        <div className="flex items-center gap-2">
          <ChevronLeft className="size-4" /> Home
        </div>
      </Link>
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
    </div>
  );
}
