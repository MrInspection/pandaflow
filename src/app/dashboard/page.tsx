import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { DashboardPageContent } from "@/app/dashboard/dashboard-page-content"
import { DashboardPage } from "@/app/dashboard/_components/dashboard-page"
import { CreateEventCategoryModal } from "@/app/dashboard/_components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default async function Dashboard() {
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

  return (
    <>
      <DashboardPage
        title="Dashboard"
        cta={<CreateEventCategoryModal>
          <Button> <PlusIcon className="size-4" /> Add Category</Button>
        </CreateEventCategoryModal>}
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}
