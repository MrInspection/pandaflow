"use client"

import { Plan } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { Card } from "@/components/ui/card"
import { BarChart } from "lucide-react"
import { format } from "date-fns"

export const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter()

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get()
      return await res.json()
    },
  })


  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <section>
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
          {plan === "PRO" ? "Plan: free" : "Plan: free"}
        </h1>
        <p className="text-sm/6 text-gray-600 max-w-prose">
          {plan === "PRO"
            ? "Thank you for supporting PandaFlow. Find your increased usage limits below."
            : "Get access to more events, categories and premium support."
          }
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Total Events</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {usageData?.eventsUsed || 0} of {usageData?.eventsLimit.toLocaleString() || 100}
            </p>
            <p className="text-xs/5 text-muted-foreground">
              Events this period
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Event Categories</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {usageData?.categoriesUsed || 0} of {usageData?.categoriesLimit || 10}
            </p>
            <p className="text-xs/5 text-muted-foreground">
              Active categories
            </p>
          </div>
        </Card>
      </section>
      <p className="text-sm text-gray-500">
        Usage will reset on{" "}
        {usageData?.resetDate
          ? format(usageData.resetDate, "MMM d, yyyy")
          : <span className="animate-pulse w-8 h-4 bg-gray-200">

        </span>
        }
        {plan !== "PRO"
          ? <>
            {" "}
            <span
              className="inline underline text-brand-600 underline-offset-2 cursor-pointer"
              onClick={() => createCheckoutSession()}
            >
              or upgrade now to increase your limit &rarr;
            </span>
          </>
          : null
        }
      </p>
    </div>
  )
}