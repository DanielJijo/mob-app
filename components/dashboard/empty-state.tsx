"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTasks } from "@/contexts/task-context"
import { CheckSquare, Plus, Search, Filter } from "lucide-react"

interface EmptyStateProps {
  onCreateTask: () => void
}

export function EmptyState({ onCreateTask }: EmptyStateProps) {
  const { tasks, filter, searchQuery } = useTasks()

  const hasNoTasks = tasks.length === 0
  const hasNoFilteredTasks = tasks.length > 0 && searchQuery
  const hasNoTasksInFilter = tasks.length > 0 && !searchQuery && filter !== "all"

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-8">
          {hasNoTasks ? (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-500 mb-6">
                Get started by creating your first task. Stay organized and productive!
              </p>
              <Button onClick={onCreateTask} size="lg" className="animate-bounce-custom">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Task
              </Button>
            </>
          ) : hasNoFilteredTasks ? (
            <>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-6">
                No tasks match your search for "{searchQuery}". Try a different keyword.
              </p>
              <Button onClick={onCreateTask} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create New Task
              </Button>
            </>
          ) : hasNoTasksInFilter ? (
            <>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No {filter} tasks</h3>
              <p className="text-gray-500 mb-6">You don't have any {filter} tasks at the moment.</p>
              <Button onClick={onCreateTask} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create New Task
              </Button>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
