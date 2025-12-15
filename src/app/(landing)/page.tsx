import { CheckIcon, Star } from "lucide-react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DiscordMessage } from "@/components/discord-message";
import { Heading } from "@/components/headings";
import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MockDiscordUI } from "@/components/mock-discord-ui";
import { ShinyButton } from "@/components/shiny-button";
import { AnimatedList } from "@/components/ui/animated-list";

export default function HomePage() {
  const codeSnippet = `await fetch("${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/events", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY"
  }
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
})`;

  return (
    <>
      <section className="relative bg-brand-25 py-24 sm:py-32">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto flex flex-col items-center gap-10 text-center">
            <div>
              <Heading>
                <span>Real-Time Saas Insights,</span>
                <br />
                <span className="relative bg-linear-to-r from-brand-700 to-brand-800 bg-clip-text text-transparent">
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>
            <p className="max-w-prose text-pretty text-center text-base/7 text-gray-600">
              PandaFlow is the easiest way to monitor your SaaS. Get instant
              notifications for{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>{" "}
              send directly to your Discord.
            </p>
            <ul className="flex flex-col space-y-2 text-left text-base/7 text-gray-600 sm:items-start">
              {[
                "Real-time Discord alerts for critical events",
                "Buy once, use forever for your needs",
                "Track sales, new users, or any other event",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-1.5 text-left">
                  <CheckIcon className="size-5 shrink-0 text-brand-700" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <ShinyButton
                href="/sign-up"
                className="relative z-10 h-10 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 top-24 bottom-24 bg-brand-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
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
      <section className="relative bg-brand-25 py-24 sm:py-32">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center font-semibold text-base/7 text-brand-600">
              Intuitive Monitoring
            </h2>
            <Heading className="text-center">
              Stay ahead with real-time insights
            </Heading>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* Bento grids */}
            <section className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 font-medium text-brand-950 text-lg/7 tracking-tight max-lg:text-center">
                    Real-time notifications
                  </p>
                  <p className="mt-2 max-w-lg text-gray-600 text-sm/6 max-lg:text-center">
                    Get notified about critical events the moment they happen,
                    no matter if you&apos;re at home or on the go.
                  </p>
                </div>
                <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-gray-700 border-x-[3cqw] border-t-[3cqw] bg-gray-900 shadow-2xl">
                    <Image
                      className="size-full object-cover object-top"
                      src="/phone-screen.jpg"
                      alt="Phone screen displaying app interface"
                      fill
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-4xl" />
            </section>
            <section className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
              <div className="hoverflow-hidden relative flex h-full flex-col rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 font-medium text-brand-950 text-lg/7 tracking-tight max-lg:text-center">
                    Track any event
                  </p>
                  <p className="mt-2 max-w-lg text-gray-600 text-sm/6 max-lg:text-center">
                    From new user sign-ups to successfully payments, PandaFlow
                    notifies you for all critical events in your SaaS.
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
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-4xl" />
            </section>
            <section className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 font-medium text-brand-950 text-lg/7 tracking-tight max-lg:text-center">
                    Track any properties
                  </p>
                  <p className="mt-2 max-w-lg text-gray-600 text-sm/6 max-lg:text-center">
                    Add any custom data you like to an event, such as a user
                    email, a purchase amount or an exceeded quota.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
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
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
            </section>
            <section className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 font-medium text-brand-950 text-lg/7 tracking-tight max-lg:text-center">
                    Easy integration
                  </p>
                  <p className="mt-2 max-w-lg text-gray-600 text-sm/6 max-lg:text-center">
                    Connect PandaFlow with your existing workflows in minutes
                    and call our intuitive logging API from any language.
                  </p>
                </div>
                <div className="relative min-h-120 w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex font-medium text-gray-400 text-sm/6">
                        <div className="border-r border-r-white/10 border-b border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          pandaflow.js
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="max-h-120 select-all">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                            },
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            </section>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative bg-white py-24 sm:py-32">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center font-semibold text-base/7 text-brand-600">
              Real-World Experiences
            </h2>
            <Heading className="text-center">What our customers say</Heading>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 divide-y divide-gray-200 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {/* first customer review */}
            <div className="flex flex-auto flex-col gap-4 rounded-t-4xl bg-brand-25 p-6 sm:p-8 lg:rounded-l-4xl lg:rounded-tr-none lg:p-16">
              <div className="mb-2 flex justify-center gap-0.5 lg:justify-start">
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
              </div>
              <p className="text-pretty text-center font-medium text-base text-brand-950 tracking-tight sm:text-lg lg:text-left lg:text-lg/8">
                PingPanda has been a game-changer for me. I've been using it for
                two months now and seeing sales pop up in real-time is super
                satisfying.
              </p>
              <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start lg:justify-start">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="flex items-center font-semibold">
                    Freya Larsson
                    <Icons.verificationBadge className="ml-1.5 inline-block size-4" />
                  </p>
                  <p className="text-gray-600 text-sm">@itsfreya</p>
                </div>
              </div>
            </div>

            {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 rounded-b-4xl bg-brand-25 p-6 sm:p-8 lg:rounded-r-4xl lg:rounded-bl-none lg:p-16">
              <div className="mb-2 flex justify-center gap-0.5 lg:justify-start">
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
                <Star className="size-5 fill-brand-600 text-brand-600" />
              </div>
              <p className="text-pretty text-center font-medium text-base text-brand-950 tracking-tight sm:text-lg lg:text-left lg:text-lg/8">
                PingPanda's been paying off for our SaaS. Nice to have simple
                way to see how we're doing day-to-day. Definitely makes our
                lives easier.
              </p>
              <div className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start lg:justify-start">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="flex items-center font-semibold">
                    Kai Durant
                    <Icons.verificationBadge className="ml-1.5 inline-block size-4" />
                  </p>
                  <p className="text-gray-600 text-sm">@kdurant_</p>
                </div>
              </div>
            </div>
          </div>
          <ShinyButton
            href="/sign-up"
            className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            Start For Free Today
          </ShinyButton>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
