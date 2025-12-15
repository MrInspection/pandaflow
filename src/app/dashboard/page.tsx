import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { CreateEventCategoryModal } from "@/app/dashboard/create-event-category-modal";
import { DashboardPageContent } from "@/app/dashboard/dashboard-page-content";
import { DashboardPage } from "@/components/dashboard-page";
import { PaymentSuccessModal } from "@/components/payment-success-modal";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Dashboard(props: PageProps) {
  const searchParams = await props.searchParams;
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const intent = searchParams.intent;
  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userId: user.id,
      userEmail: user.email,
    });

    if (session.url) redirect(session.url);
  }

  const success = searchParams.success;

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardPage
        title="Dashboard"
        cta={
          <CreateEventCategoryModal>
            <Button>
              <PlusIcon className="size-4" /> Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        hideBackButton
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  );
}
