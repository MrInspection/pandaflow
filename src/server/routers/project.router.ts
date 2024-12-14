import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { addMonths, startOfMonth } from "date-fns"
import { db } from "@/lib/db"
import { FREE_QUOTA, PRO_QUOTA } from "@/config/config"
import { z } from "zod"

export const projectRouter = router({
  getUsage: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    const currentDate = startOfMonth(new Date())
    const quota = await db.quota.findFirst({
      where: {
        userId: user.id,
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      },
    })

    const eventCount = quota?.count ?? 0

    const categoryCount = await db.eventCategory.count({
      where: {
        userId: user.id,
      },
    })

    const limit = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA

    const resetDate = addMonths(currentDate, 1)

    return c.superjson({
      categoriesUsed: categoryCount,
      categoriesLimit: limit.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimit: limit.maxEventsPerMonth,
      resetDate,
    })
  }),

  setDiscordId: privateProcedure
    .input(z.object({ discordId: z.string().max(20) }))
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { discordId } = input

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          discordId,
        },
      })

      return c.json({ success: true })
    }),
})