"use client";

import type { Plan } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BarChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/client";

export const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter();

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post();
      return res.json();
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get();
      return await res.json();
    },
  });

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <section>
        <h1 className="mt-2 font-medium text-gray-900 text-xl/8 tracking-tight">
          {plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
        </h1>
        <p className="max-w-prose text-gray-600 text-sm/6">
          {plan === "PRO"
            ? "Thank you for supporting PandaFlow. Find your increased usage limits below."
            : "Get access to more events, categories and premium support."}
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="font-medium text-sm/6">Total Events</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-bold text-2xl">
              {usageData?.eventsUsed || 0} of{" "}
              {usageData?.eventsLimit.toLocaleString() || 100}
            </p>
            <p className="text-muted-foreground text-xs/5">
              Events this period
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="font-medium text-sm/6">Event Categories</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-bold text-2xl">
              {usageData?.categoriesUsed || 0} of{" "}
              {usageData?.categoriesLimit || 10}
            </p>
            <p className="text-muted-foreground text-xs/5">Active categories</p>
          </div>
        </Card>
      </section>
      <p className="text-gray-500 text-sm">
        Usage will reset on{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMM d, yyyy")
        ) : (
          <span className="h-4 w-8 animate-pulse bg-gray-200"></span>
        )}
        {plan !== "PRO" ? (
          <>
            {" "}
            {/** biome-ignore lint/a11y/noStaticElementInteractions: needed */}
            <span
              className="inline cursor-pointer text-brand-600 underline underline-offset-2"
              onClick={() => createCheckoutSession()}
            >
              or upgrade now to increase your limit &rarr;
            </span>
          </>
        ) : null}
      </p>
    </div>
  );
};
