"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/headings";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";

export default function PricingPage() {
  const { user } = useUser();
  const router = useRouter();

  const INCLUDED_FEATURES = [
    "10.000 real-time events per month",
    "10 event categories",
    "Advanced analytics and insights",
    "Priority support",
  ];

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post();
      return await res.json();
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  const handleGetAccess = () => {
    if (user) {
      createCheckoutSession();
    } else {
      router.push("/sign-in?intent=upgrade");
    }
  };

  return (
    <main className="flex grow flex-col bg-brand-25">
      <div className="py-24 sm:py-32">
        <MaxWidthWrapper>
          <div className="mx-auto flex max-w-7xl flex-col items-center">
            <Heading className="text-center">Simple no-tricks pricing</Heading>
            <p className="mt-6 max-w-prose text-pretty text-center text-base/7 text-gray-600">
              We hate subscriptions. And chances are, you do too, That&apos;s
              why we offer lifetime access to PandaFlow for a one-time payment.
            </p>
          </div>
          <section className="mx-auto mt-16 max-w-2xl rounded-3xl bg-white ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="font-heading font-semibold text-3xl text-gray-900 tracking-tight">
                Lifetime access
              </h3>
              <p className="mt-6 text-base/7 text-gray-600r">
                Invest once in PandaFlow and transform how you monitor your SaaS
                forever. Get instant alerts, track critical metrics and never
                miss a beat in your business growth.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none font-semibold text-brand-600 text-sm leading-6">
                  What&apos;s included?
                </h4>
                <div className="h-px flex-auto bg-gray-200" />
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-4 text-gray-600 text-sm/6 sm:grid-cols-2 sm:gap-6">
                {INCLUDED_FEATURES.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckIcon className="h-6 w-5 flex-none text-brand-700" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-gray-900/5 ring-inset lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs py-8">
                  <p className="font-semibold text-base text-gray-600">
                    Pay once, own forever
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="font-bold text-5xl text-gray-900 tracking-tight">
                      $49
                    </span>
                    <span className="font-semibold text-gray-600 text-sm leading-6 tracking-wide">
                      USD
                    </span>
                  </p>

                  <Button className="mt-6 px-20" onClick={handleGetAccess}>
                    Get PandaFlow
                  </Button>
                  <p className="mt-6 text-gray-600 text-xs leading-5">
                    Secure payment. Start monitoring in minutes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </MaxWidthWrapper>
      </div>
    </main>
  );
}
