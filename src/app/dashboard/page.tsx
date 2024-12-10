import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { DashboardPageContent } from "@/app/dashboard/dashboard-page-content"
import { DashboardPage } from "@/app/dashboard/dashboard-page"

export default async function Dashboard() {
  const auth = await currentUser()

  if(!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if(!user) {
    redirect("/sign-in")
  }

  return (
    <>
      <DashboardPage title="Dashboard">
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}
