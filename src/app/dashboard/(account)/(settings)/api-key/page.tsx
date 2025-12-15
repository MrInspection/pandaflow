import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ApiKeySettings } from "@/app/dashboard/(account)/(settings)/api-key/api-key-settings";
import { DashboardPage } from "@/components/dashboard-page";
import prisma from "@/lib/prisma";

export default async function UpgradePage() {
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

  return (
    <DashboardPage title="API Key">
      <ApiKeySettings apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  );
}
