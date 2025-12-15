"use client";

import type { EventCategory } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import {
  BarChart2,
  ChevronRight,
  Clock,
  Database,
  Loader2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardEmptyState } from "@/app/dashboard/dashboard-empty-state";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { client } from "@/lib/client";

export function DashboardPageContent() {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get();
      const { categories } = await res.json();
      return categories;
    },
  });

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: async (name: string) => {
        await client.category.deleteCategory.$post({ name });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
        setDeletingCategory(null);
      },
    },
  );

  if (isEventCategoriesLoading) {
    return (
      <div className="flex size-full flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />;
  }

  return (
    <>
      <ul className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {categories.map((category: EventCategory) => (
          <li
            key={category.id}
            className="group relative z-10 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="absolute inset-px z-0 rounded-lg bg-white" />
            <div className="pointer-events-none absolute inset-px z-0 rounded-lg shadow-xs ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-md" />
            <div className="relative z-10 p-6">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="size-12 rounded-full"
                  style={{
                    backgroundColor: category.color
                      ? `#${category.color.toString(16).padStart(6, "0")}`
                      : "#f3f4f6",
                  }}
                />
                <div>
                  <h3 className="text-gray-950 text-lg/7 tracking-tight">
                    {category.emoji || "📂"} {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm/6">
                    {format(category.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <section className="mb-6 space-y-3">
                <div className="flex items-center text-gray-600 text-sm/5">
                  <Clock className="mr-2 size-4 text-brand-500" />
                  <span className="font-medium">Last ping:</span>
                  <span className="ml-1">
                    {category.lastPing
                      ? formatDistanceToNow(category.lastPing) + " ago"
                      : "Never"}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm/5">
                  <Database className="mr-2 size-4 text-brand-500" />
                  <span className="font-medium">Unique fields:</span>
                  <span className="ml-1">{category.uniqueFieldCount || 0}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm/5">
                  <BarChart2 className="mr-2 size-4 text-brand-500" />
                  <span className="font-medium">Events this month:</span>
                  <span className="ml-1">{category.eventsCount || 0}</span>
                </div>
              </section>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/dashboard/category/${category.name}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "flex items-center text-sm",
                  })}
                >
                  View all <ChevronRight className="size-4" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 transition-colors hover:text-red-600"
                  aria-label={`Delete ${category.name} category`}
                  onClick={() => setDeletingCategory(category.name)}
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        showModal={!!deletingCategory}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div>
            <h2 className="font-medium text-gray-950 text-lg/7 tracking-tight">
              Deleting category
            </h2>
            <p className="text-gray-600 text-sm/6">
              Are you sure you want to delete the category{" "}
              <strong>{deletingCategory}</strong>?
              <br />
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3 border-t pt-4">
            <Button variant="outline" onClick={() => setDeletingCategory(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
              disabled={isDeletingCategory}
            >
              {isDeletingCategory ? (
                <div className="inline-flex items-center">
                  <Loader2 className="mr-2 size-4 animate-spin" /> Deleting
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
