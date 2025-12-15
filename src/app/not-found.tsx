import Link from "next/link";
import { Heading } from "@/components/headings";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-25">
      <SiteHeader />
      <main className="mx-auto flex grow items-center justify-center">
        <div className="container px-4">
          <div className="flex max-w-md flex-col items-center justify-center text-center">
            <p className="mb-4 w-fit rounded-xl border px-2 py-1 font-medium text-xs">
              404
            </p>
            <Heading className="mb-6 font-extrabold text-4xl md:text-5xl">
              Page Not Found
            </Heading>
            <p className="mb-6 text-muted-foreground">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              This is perhaps a temporary issue, so please try again later.
            </p>
            <Link href="/" className={cn(buttonVariants())}>
              Go back home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
