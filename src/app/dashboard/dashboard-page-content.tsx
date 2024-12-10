"use client"

import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import { LoadingSpinner } from "@/components/loading-spinner"

export function DashboardPageContent() {
  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })

  if(isEventCategoriesLoading) {
    return <div className="flex items-center justify-center flex-1 size-full">
      <LoadingSpinner />
    </div>
  }

  if(!categories || categories.length === 0) {
    return <div>No categories</div>
  }

  return (
    <ul className="grid max-w-6xl grd-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-6">
      {categories.map((category) => (
        <li key={category.id}>
          {category.name}
        </li>
      ))}
    </ul>
  )
}
