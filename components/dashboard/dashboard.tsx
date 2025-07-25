"use client"

import { useState } from "react"
import { Header } from "./header"
import { TaskList } from "./task-list"
import { TaskDialog } from "./task-dialog"
import { EmptyState } from "./empty-state"
import { FloatingActionButton } from "./floating-action-button"
import { useTasks } from "@/contexts/task-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function Dashboard() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const { filteredTasks, loading } = useTasks()

  const handleEditTask = (taskId: string) => {
    setEditingTask(taskId)
    setIsTaskDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsTaskDialogOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredTasks.length > 0 ? (
          <TaskList onEditTask={handleEditTask} />
        ) : (
          <EmptyState onCreateTask={() => setIsTaskDialogOpen(true)} />
        )}
      </main>

      <FloatingActionButton onClick={() => setIsTaskDialogOpen(true)} />

      <TaskDialog open={isTaskDialogOpen} onOpenChange={handleCloseDialog} editingTaskId={editingTask} />
    </div>
  )
}
