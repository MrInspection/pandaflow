import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/headings"
import { CheckIcon } from "lucide-react"
import { ShinyButton } from "@/components/shiny-button"

export default function HomePage() {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Heading>
                <span>Real-Time Saas Insights,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              PandaFlow is the easiest way to monitor your SaaS. Get instant notifications for{" "}
              <span className="font-semibold text-gray-700">sales, new users, or any other event</span>
              {" "}send directly to
              your Discord.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col sm:items-start">
              {[
                "Real-time Discord alerts for critical events",
                "Buy once, use forever for your needs",
                "Track sales, new users, or any other event"
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <CheckIcon className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton href="/sign-up" className="relative z-10 h-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Start For Free Today</ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
