"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Heading } from "@/components/headings";
import { Button } from "@/components/ui/button";

interface DashboardPageProps {
  title: string;
  children?: ReactNode;
  hideBackButton?: boolean;
  cta?: ReactNode;
}

export function DashboardPage({
  title,
  children,
  hideBackButton,
  cta,
}: DashboardPageProps) {
  const router = useRouter();
  return (
    <section className="flex h-full w-full flex-1 flex-col">
      <div className="flex w-full justify-between border-gray-200 p-6 sm:px-8 sm:pt-8 sm:pb-0">
        <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-6">
            {hideBackButton ? null : (
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-fit bg-white"
                variant="outline"
              >
                <ChevronLeft className="size-4" />
              </Button>
            )}
            <Heading className="sm:text-4xl">{title}</Heading>
          </div>

          {cta ? <div>{cta}</div> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
        {children}
      </div>
    </section>
  );
}
