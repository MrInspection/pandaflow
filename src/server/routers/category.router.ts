import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { db } from "@/lib/db"
import { startOfMonth } from "date-fns"
import { z } from "zod"
import { categoryNameSchema, EventCategorySchema } from "@/lib/validators/category.schema"
import { parseColor } from "@/lib/utils"
import { HTTPException } from "hono/http-exception"

export const categoryRouter = router({
  getEventCategories: privateProcedure
    .query(async ({ c, ctx }) => {
      const now = new Date()
      const firstDayOfMonth = startOfMonth(now)

      const categories = await db.eventCategory.findMany({
        where: { userId: ctx.user.id },
        select: {
          id: true,
          name: true,
          emoji: true,
          color: true,
          updatedAt: true,
          createdAt: true,
          events: {
            where: { createdAt: { gte: firstDayOfMonth } },
            select: {
              fields: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              events: {
                where: { createdAt: { gte: firstDayOfMonth } },
              },
            },
          },
        },
        orderBy: { updatedAt: "desc" },
      })

      const categoriesWithCounts = categories.map((category) => {
        const uniqueFieldNames = new Set<string>()
        let lastPing: Date | null = null

        category.events.forEach((event) => {
          Object.keys(event.fields as object).forEach((fieldName) => {
            uniqueFieldNames.add(fieldName)
          })
          if (!lastPing || event.createdAt > lastPing) {
            lastPing = event.createdAt
          }
        })

        return {
          id: category.id,
          name: category.name,
          emoji: category.emoji,
          color: category.color,
          updatedAt: category.updatedAt,
          createdAt: category.createdAt,
          uniqueFieldCount: uniqueFieldNames.size,
          eventsCount: category._count.events,
          lastPing,
        }
      })

      return c.superjson({ categories: categoriesWithCounts })
    }),

  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, input, ctx }) => {
      const { name } = input

      await db.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      })
      return c.json({ success: true })
    }),

  createEventCategory: privateProcedure
    .input(EventCategorySchema)
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { name, color, emoji } = input

      // TODO: Add paid plan logic

      const eventCategory = await db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          userId: user.id,
        },
      })
      return c.json({ eventCategory })
    }),

  insertQuickStartCategories: privateProcedure
    .mutation(async ({ c, ctx }) => {
      const categories = await db.eventCategory.createMany({
        data: [
          {
            name: "bug",
            emoji: "🐛",
            color: 0xff6b6b,
          },
          {
            name: "sales",
            emoji: "💶",
            color: 0xffeb3b,
          },
          {
            name: "questions",
            emoji: "🤔",
            color: 0x6c5ce7,
          },
        ].map((category) => ({
          ...category,
          userId: ctx.user.id,
        })),
      })
      return c.json({ success: true, count: categories.count })
    }),

  pollCategory: privateProcedure
    .input(z.object({name: categoryNameSchema}))
    .query(async ({c, ctx, input}) => {
      const { name } = input

      const category = await db.eventCategory.findUnique({
        where: { name_userId: { name, userId: ctx.user.id } },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        }
      })

      if(!category) {
        throw new HTTPException(404, { message: `Category ${name} not found` })
      }

      const hasEvents = category._count.events > 0

      return c.json({ hasEvents })
    })
})
