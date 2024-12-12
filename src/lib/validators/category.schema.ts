import { z } from "zod"

export const EventCategorySchema = z.object({
  name: z
    .string().min(1, "Category name is required.")
    .regex(/^[a-zA-Z0-9-]+$/, "Category name can only contain letters, numbers, or hyphens."),
  color: z
    .string()
    .min(1, "Color is required.")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
  emoji: z.string().emoji("Invalid emoji.").optional(),
})

export type EventCategoryType = z.infer<typeof EventCategorySchema>
