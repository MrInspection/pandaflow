"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Heading } from "@/components/headings"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const { user } = useUser()
  const router = useRouter()

  const INCLUDED_FEATURES = [
    "10.000 real-time events per month",
    "10 event categories",
    "Advanced analytics and insights",
    "Priority support",
  ]

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const handleGetAccess = () => {
    if (user) {
      createCheckoutSession()
    } else {
      router.push("/sign-in?intent=upgrade")
    }
  }

  return (
    <main className="bg-brand-25 flex flex-col flex-grow">
      <div className="py-24 sm:py-32">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-7xl flex flex-col items-center">
            <Heading className="text-center">
              Simple no-tricks pricing
            </Heading>
            <p className="mt-6 text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              We hate subscriptions. And chances are, you do too, That&apos;s why we offer lifetime access to PandaFlow
              for a one-time payment.
            </p>
          </div>
          <section
            className="bg-white mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-3xl font-heading font-semibold tracking-tight text-gray-900">
                Lifetime access
              </h3>
              <p className="mt-6 text-base/7 text-gray-600r">
                Invest once in PandaFlow and transform how you monitor your SaaS forever.
                Get instant alerts, track critical metrics and never miss a beat in your business growth.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-brand-600">
                  What&apos;s included?
                </h4>
                <div className="h-px flex-auto bg-gray-200" />
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                {INCLUDED_FEATURES.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckIcon className="h-6 w-5 flex-none text-brand-700" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs py-8">
                  <p className="text-base font-semibold text-gray-600">
                    Pay once, own forever
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">$49</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                  </p>

                  <Button className="mt-6 px-20" onClick={handleGetAccess}>
                    Get PandaFlow
                  </Button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Secure payment. Start monitoring in minutes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </MaxWidthWrapper>
      </div>
    </main>
  )
}