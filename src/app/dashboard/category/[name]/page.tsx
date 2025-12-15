import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CategoryPageContent } from "@/app/dashboard/category/[name]/category-page-content";
import { DashboardPage } from "@/components/dashboard-page";
import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    name: string | string[] | undefined;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  if (typeof params.name !== "string") {
    return notFound();
  }

  const auth = await currentUser();

  if (!auth) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: { externalId: auth.id },
  });

  if (!user) return notFound();

  const category = await prisma.eventCategory.findUnique({
    where: { name_userId: { name: params.name, userId: user.id } },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });

  if (!category) return notFound();

  const hasEvents = category._count.events > 0;

  return (
    <DashboardPage
      title={`${category.emoji} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)} Events`}
    >
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  );
}
