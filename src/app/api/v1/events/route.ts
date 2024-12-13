import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { categoryNameSchema } from "@/lib/validators/category.schema"
import { db } from "@/lib/db"
import { FREE_QUOTA, PRO_QUOTA } from "@/config/config"
import { DiscordClient } from "@/lib/discord-client"

const REQUEST_VALIDATOR = z.object({
  category: categoryNameSchema,
  fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
  description: z.string().optional(),
}).strict()

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization")

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid auth header format. Expected 'Bearer API_KEY'" }, { status: 401 })
  }
  const apiKey = authHeader.split(" ")[1]

  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { apiKey },
    include: {
      eventCategories: true,
    },
  })

  if (!user) {
    return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
  }

  if (!user.discordId) {
    return NextResponse.json({ message: "Please enter your discord ID in your account settings" }, { status: 403 })
  }

  const currentData = new Date()
  const currentMonth = currentData.getMonth() + 1
  const currentYear = currentData.getFullYear()

  const quota = await db.quota.findUnique({
    where: {
      userId: user.id,
      year: currentYear,
      month: currentMonth,
    },
  })

  const quotaLimit = user.plan === "FREE"
    ? FREE_QUOTA.maxEventsPerMonth
    : PRO_QUOTA.maxEventsPerMonth

  if (quota && quota.count >= quotaLimit) {
    return NextResponse.json({ message: "Monthly quota reached. Please upgrade your plan for more events" }, { status: 429 })
  }

  const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN)
}