import { notFound } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { DashboardPage } from "@/components/dashboard-page"
import { CategoryPageContent } from "@/app/dashboard/category/[name]/category-page-content"

interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}

export default async function Page({ params }: PageProps) {
  if(typeof params.name !== "string") {
    return notFound()
  }

  const auth = await currentUser()

  if (!auth) {
    return notFound()
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) return notFound()

  const category = await db.eventCategory.findUnique({
    where: { name_userId: { name: params.name, userId: user.id } },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    }
  })

  if (!category) return notFound()

  const hasEvents = category._count.events > 0

  return (
    <DashboardPage title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  )
}