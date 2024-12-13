"use client"

import { PropsWithChildren, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { EventCategoryType, EventCategorySchema } from "@/lib/validators/category.schema"
import { client } from "@/lib/client"
import { Loader2 } from "lucide-react"
import { createElementProps } from "react-syntax-highlighter"

const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
  { emoji: "💶", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
]

interface CreateEventCategoryModal extends PropsWithChildren {
  containerClassName?: string
}

export const CreateEventCategoryModal = ({ children, containerClassName }: CreateEventCategoryModal) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: createEventCategory, isPending: isCreatingCategory } = useMutation({
    mutationFn: async (data: EventCategoryType) => {
      await client.category.createEventCategory.$post(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      setIsOpen(false)
    },
  })

  const form = useForm<EventCategoryType>({
    resolver: zodResolver(EventCategorySchema),
  })

  const selectedColor = form.watch("color")
  const selectedEmoji = form.watch("emoji")

  function onSubmit(data: EventCategoryType) {
    createEventCategory(data)
  }

  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Modal showModal={isOpen} setShowModal={setIsOpen} className="max-w-xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                New Event Category
              </h2>
              <p className="text-sm/6 text-gray-600">
                Create a new category to organize your events.
              </p>
            </div>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full"
                        placeholder="e.g. user-signups"
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Options</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-3">
                        {COLOR_OPTIONS.map((color, index) => (
                          <button
                            type="button" key={index}
                            className={cn(
                              `bg-[${color}]`,
                              "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                              selectedColor === color ? "ring-brand-700 scale-110" : "ring-transparent hover:scale-105",
                            )}
                            onClick={() => form.setValue("color", color)}
                          >
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emoji Options</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-3">
                        {EMOJI_OPTIONS.map((value, index) => (
                          <button
                            type="button" key={index}
                            className={cn(
                              "size-10 flex items-center justify-center text-xl rounded-md transition-all",
                              selectedEmoji === value.emoji ? "bg-brand-100 ring-2 ring-brand-700 scale-110" : "bg-brand-100 hover:bg-brand-200",
                            )}
                            onClick={() => form.setValue("emoji", value.emoji)}
                          >
                            {value.emoji}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingCategory}>
                {isCreatingCategory ? (
                  <div className="inline-flex items-center">
                    <Loader2 className="size-4 animate-spin mr-2" /> Creating</div>
                ) : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  )
}