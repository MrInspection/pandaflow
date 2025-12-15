import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, Loader2, PlusIcon } from "lucide-react";
import { CreateEventCategoryModal } from "@/app/dashboard/create-event-category-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/client";

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient();

  const { mutate: insertQuickStartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickStartCategories.$post();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
    },
  });

  return (
    <Card className="flex flex-1 flex-col items-center justify-center rounded-2xl p-6 text-center">
      <div className="flex w-full justify-center">
        <img
          src="/brand-asset-wave.png"
          alt="No categories"
          className="-mt-24 size-48 select-none"
          draggable={false}
        />
      </div>
      <h1 className="mt-2 font-medium text-gray-900 text-xl/8 tracking-tight">
        No Event Categories Yet
      </h1>
      <p className="mt-2 mb-8 max-w-prose text-gray-600 text-sm/6">
        Start tracking events by creating your first category.
      </p>
      <div className="flex items-center justify-center space-y-4 max-sm:flex-col sm:space-x-4 sm:space-y-0">
        <Button
          variant="outline"
          onClick={() => insertQuickStartCategories()}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <div className="inline-flex items-center">
              <Loader2 className="mr-2 size-4 animate-spin" /> Creating
            </div>
          ) : (
            <div className="inline-flex items-center">
              <Archive className="mr-2 size-4" />
              Quick Start
            </div>
          )}
        </Button>
        <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
          <Button className="flex w-full items-center space-x-2 sm:w-auto">
            <PlusIcon className="size-4" /> Add Category
          </Button>
        </CreateEventCategoryModal>
      </div>
    </Card>
  );
};
