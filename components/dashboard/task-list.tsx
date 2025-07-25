"use client"

import { TaskCard } from "./task-card"
import { useTasks } from "@/contexts/task-context"

interface TaskListProps {
  onEditTask: (taskId: string) => void
}

export function TaskList({ onEditTask }: TaskListProps) {
  const { filteredTasks } = useTasks()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
        </h2>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task, index) => (
          <div key={task.id} className="animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
            <TaskCard task={task} onEdit={() => onEditTask(task.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}
