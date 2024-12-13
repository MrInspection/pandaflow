import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, PlusIcon } from "lucide-react"
import { CreateEventCategoryModal } from "@/app/dashboard/_components/create-event-category-modal"

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient()

  const { mutate: insertQuickStartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickStartCategories.$post()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["user-event-categories"]})
    },
  })

  return (
    <>
      <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
        <div className="flex justify-center w-full">
          <img
            src="/brand-asset-wave.png" alt="No categories"
            className="size-48 -mt-24 select-none" draggable={false}
          />
        </div>
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
          No Event Categories Yet
        </h1>
        <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
          Start tracking events by creating your first category.
        </p>
        <div className="flex max-sm:flex-col items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            variant="outline"
            onClick={() => insertQuickStartCategories()}
            disabled={isPending}
          >
            {isPending ? (
              <div className="inline-flex items-center">
                <Loader2 className="size-4 animate-spin mr-2" /> Creating
              </div>
            ) : "Quick Start"}
          </Button>
          <CreateEventCategoryModal>
            <Button className="flex items-center space-x-2 w-full sm:w-auto">
              <PlusIcon className="size-4" /> Add Category
            </Button>
          </CreateEventCategoryModal>
        </div>
      </Card>
    </>
  )
}
