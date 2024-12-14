import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { DashboardPageContent } from "@/app/dashboard/dashboard-page-content"
import { DashboardPage } from "@/components/dashboard-page"
import { CreateEventCategoryModal } from "@/app/dashboard/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { createCheckoutSession } from "@/lib/stripe"
import { PaymentSuccessModal } from "@/components/payment-success-modal"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Dashboard({searchParams}: PageProps) {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  const intent = searchParams.intent
  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userId: user.id,
      userEmail: user.email,
    })

    if (session.url) redirect(session.url)
  }

  const success = searchParams.success

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
  )
}
