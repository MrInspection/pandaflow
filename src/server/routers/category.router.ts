import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { parseColor } from "@/lib/utils";
import {
  categoryNameSchema,
  EventCategorySchema,
} from "@/lib/validators/category.schema";
import { j, privateProcedure } from "@/server/jstack";

export const categoryRouter = j.router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);

    const categories = await prisma.eventCategory.findMany({
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
    });

    const categoriesWithCounts = categories.map((category) => {
      const uniqueFieldNames = new Set<string>();
      let lastPing: Date | null = null;

      category.events.forEach((event) => {
        Object.keys(event.fields as object).forEach((fieldName) => {
          uniqueFieldNames.add(fieldName);
        });
        if (!lastPing || event.createdAt > lastPing) {
          lastPing = event.createdAt;
        }
      });

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
      };
    });

    return c.superjson({ categories: categoriesWithCounts });
  }),

  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, input, ctx }) => {
      const { name } = input;

      await prisma.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      });
      return c.json({ success: true });
    }),

  createEventCategory: privateProcedure
    .input(EventCategorySchema)
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx;
      const { name, color, emoji } = input;

      const eventCategory = await prisma.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          userId: user.id,
        },
      });
      return c.json({ eventCategory });
    }),

  insertQuickStartCategories: privateProcedure.mutation(async ({ c, ctx }) => {
    const categories = await prisma.eventCategory.createMany({
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
    });
    return c.json({ success: true, count: categories.count });
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: categoryNameSchema }))
    .query(async ({ c, ctx, input }) => {
      const { name } = input;

      const category = await prisma.eventCategory.findUnique({
        where: { name_userId: { name, userId: ctx.user.id } },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      });

      if (!category) {
        throw new HTTPException(404, { message: `Category ${name} not found` });
      }

      const hasEvents = category._count.events > 0;

      return c.json({ hasEvents });
    }),

  getEventsByCategoryName: privateProcedure
    .input(
      z.object({
        name: categoryNameSchema,
        page: z.number(),
        limit: z.number().max(50),
        timeRange: z.enum(["today", "week", "month"]),
      }),
    )
    .query(async ({ c, ctx, input }) => {
      const { name, page, limit, timeRange } = input;

      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case "today":
          startDate = startOfDay(now);
          break;
        case "week":
          startDate = startOfWeek(now, { weekStartsOn: 0 });
          break;
        case "month":
          startDate = startOfMonth(now);
          break;
      }

      const [events, eventsCount, uniqueFieldCount] = await Promise.all([
        prisma.event.findMany({
          where: {
            eventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),

        prisma.event.count({
          where: {
            eventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
        }),

        prisma.event
          .findMany({
            where: {
              eventCategory: { name, userId: ctx.user.id },
              createdAt: { gte: startDate },
            },
            select: {
              fields: true,
            },
            distinct: ["fields"],
          })
          .then((events) => {
            const fieldNames = new Set<string>();
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach((fieldName) => {
                fieldNames.add(fieldName);
              });
            });
            return fieldNames.size;
          }),
      ]);

      return c.superjson({
        events,
        eventsCount,
        uniqueFieldCount,
      });
    }),
});
