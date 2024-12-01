import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/headings"
import { CheckIcon } from "lucide-react"
import { ShinyButton } from "@/components/shiny-button"
import { MockDiscordUI } from "@/components/mock-discord-ui"
import { AnimatedList } from "@/components/ui/animated-list"
import { DiscordMessage } from "@/components/discord-message"

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
                "Track sales, new users, or any other event",
              ].map((item, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <CheckIcon className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton href="/sign-up"
                           className="relative z-10 h-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Start
                For Free Today</ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <MockDiscordUI>
                <AnimatedList>
                  <DiscordMessage
                    avatarSource="/brand-asset-profile-picture.png"
                    avatarAlt="PandaFlow Avatar"
                    username="PandaFlow"
                    timestamp="Today at 09:11 AM"
                    title="👤 New user signed up"
                    badgeText="Acquisition"
                    badgeColor="#43b581"
                    content={{
                      name: "Tom CUCHEROSSET",
                      email: "tom.cucherosset@gmail.com",
                    }}
                  />
                  <DiscordMessage
                    avatarSource="/brand-asset-profile-picture.png"
                    avatarAlt="PandaFlow Avatar"
                    username="PandaFlow"
                    timestamp="Today at 10:30 AM"
                    title="💶 Payment Received"
                    badgeText="Cashflow"
                    badgeColor="#faa61a"
                    content={{
                      amount: "$49.00 USD",
                      email: "marc.dubois@gmail.com",
                      plan: "PREMIUM"
                    }}
                  />
                  <DiscordMessage
                    avatarSource="/brand-asset-profile-picture.png"
                    avatarAlt="PandaFlow Avatar"
                    username="PandaFlow"
                    timestamp="Today at 12:00 PM"
                    title="🏆 Revenue Milestone Reached"
                    badgeText="Milestone"
                    badgeColor="#5865f2"
                    content={{
                      recurringRevenue: "$7.5000 USD",
                      growth: "+10.45%",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
    </>
  )
}
