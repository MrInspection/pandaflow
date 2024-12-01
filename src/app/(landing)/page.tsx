import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/headings"
import { CheckIcon, Star } from "lucide-react"
import { ShinyButton } from "@/components/shiny-button"
import { MockDiscordUI } from "@/components/mock-discord-ui"
import { AnimatedList } from "@/components/ui/animated-list"
import { DiscordMessage } from "@/components/discord-message"
import Image from "next/image"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Icons } from "@/components/icons"

export default function HomePage() {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PREMIUM",
      email: "diakhaby.ousmane@outlook.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`

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
            <div
              className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
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
                      email: "tomcucherosset@hotmail.fr",
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
                      email: "diakhaby.ousmane@outlook.com",
                      plan: "PREMIUM",
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
                      recurringRevenue: "$7.500 USD",
                      growth: "+10.45%",
                    }}
                  />
                </AnimatedList>
              </MockDiscordUI>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Intuitive Monitoring
            </h2>
            <Heading>Stay ahead with real-time insights</Heading>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* Bento grids */}
            <section className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 tracking-tight text-brand-950 max-lg:text-center font-medium">
                    Real-time notifications
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Get notified about critical events the moment they happen, no matter if you&apos;re at home or on
                    the go.
                  </p>
                </div>
                <div
                  className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div
                    className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <Image
                      className="size-full object-cover object-top"
                      src="/phone-screen.png"
                      alt="Phone screen displaying app interface"
                      fill draggable={false}
                    />
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
            </section>
            <section className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div
                className="relative flex h-full flex-col hoverflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 tracking-tight text-brand-950 max-lg:text-center font-medium">
                    Track any event
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    From new user sign-ups to successfully payments, PandaFlow notifies you for all critical events in
                    your SaaS.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <Image
                    src="/bento-any-event.png"
                    alt="Bento box illustrating event tracking"
                    className="w-full max-lg:max-w-xs"
                    width={500}
                    height={300}
                    draggable={false}
                  />
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </section>
            <section className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 tracking-tight text-brand-950 max-lg:text-center font-medium">
                    Track any properties
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Add any custom data you like to an event, such as a user email, a purchase amount or an exceeded
                    quota.
                  </p>
                </div>
                <div
                  className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    src="/bento-custom-data.png"
                    alt="Bento box illustrating custom data tracking"
                    className="w-full max-lg:max-w-xs"
                    width={500}
                    height={300}
                    draggable={false}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </section>
            <section className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 tracking-tight text-brand-950 max-lg:text-center font-medium">
                    Easy integration
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Connect PandaFlow with your existing workflows in minutes and call our intuitive logging API from
                    any language.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div
                    className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div
                          className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                          pandaflow.js
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="max-h-[30rem] select-all">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            "pre[class*=\"language-\"]": {
                              ...oneDark["pre[class*=\"language-\"]"],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            "code[class*=\"language-\"]": {
                              ...oneDark["code[class*=\"language-\"]"],
                              background: "transparent",
                            },
                          }}>
                          {codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </section>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative py-24 sm:py-32 bg-white">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-brand-600">
              Real-World Experiences
            </h2>
            <Heading className="text-center">What our customers say</Heading>
          </div>

          {/* Customer testimonials */}
          <section
            className="mx-auto grid max-w-2xl grid-cols-2 px-4 lg:mx-auto lg:max-w-none lg:grid-cols-2 max-lg:divide-y lg:divide-x divide-gray-200">
            <div
              className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>
              <p
                className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PandaFlow has been a game-changer for me. I&apos;ve been using it for two months now and seeing sales
                pop up in real-time is super satisfying.
              </p>
              <div
                className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  alt="Random User"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p className="font-semibold flex items-center">
                  Laura Anderson
                  <Icons.verificationBadge className="size-4 inline-block ml-1.5 " />
                </p>
                <p className="text-sm text-gray-600">@landerson</p>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>
              <p
                className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PandaFlow&apos;s being paying off for our SaaS. Nice to have simple way to see how we&apos;re doing day-to-day to help us make better decisions.
              </p>
              <div
                className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  alt="Random User"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <p className="font-semibold flex items-center">
                  Tom Cucherosset
                  <Icons.verificationBadge className="size-4 inline-block ml-1.5 " />
                </p>
                <p className="text-sm text-gray-600">@inkflow</p>
              </div>
            </div>

          </section>


        </MaxWidthWrapper>
      </section>
    </>
  )
}
