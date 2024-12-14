import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Heading } from "@/components/headings"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-25">
      <SiteHeader/>
      <main className="flex-grow flex items-center justify-center mx-auto">
        <div className="container px-4">
          <div className="max-w-md flex flex-col items-center justify-center text-center">
            <p className="mb-4 border rounded-xl w-fit px-2 py-1 font-medium text-xs">404</p>
            <Heading className="text-4xl md:text-5xl font-extrabold mb-6">
              Page Not Found
            </Heading>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              This is perhaps a temporary issue, so please try again later.
            </p>
            <Link href="/" className={cn(buttonVariants())}>
              Go back home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter/>
    </div>
  )
}