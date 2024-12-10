import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { db } from "@/lib/db"
import { startOfMonth } from "date-fns"

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({c, ctx}) => {
    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        color: true,
        emoji: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { updatedAt: "desc" }
    })

    const categoriesWithCounts = await Promise.all([
      categories.map(async (category) => {
        const now = new Date()
        const firstDayOfMonth = startOfMonth(now)

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          db.event.findMany({
            where: {
              eventCategory: {id: category.id},
              createdAt: {gte: firstDayOfMonth},
            },
            select: { fields: true},
            distinct: ["fields"],
          })
            .then((events) => {
            const fieldNames = new Set<string>()
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach
              ((fieldName) => {
                fieldNames.add(fieldName)
              })
            })

            return fieldNames.size
          }),
          db.event.count({
            where: {
              eventCategory: {id: category.id},
              createdAt: {gte: firstDayOfMonth},
            },
          }),
          db.event.findFirst({
            where: { eventCategory: {id: category.id} },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          })
        ])

        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    ])

    return c.superjson({categories: categoriesWithCounts})
  })
})