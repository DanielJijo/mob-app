"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTasks, type Task } from "@/contexts/task-context"
import { MoreHorizontal, Edit, Trash2, Calendar, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { format, isToday, isTomorrow, isPast } from "date-fns"

interface TaskCardProps {
  task: Task
  onEdit: () => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toggleTaskComplete, deleteTask } = useTasks()

  const handleToggleComplete = async () => {
    await toggleTaskComplete(task.id)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteTask(task.id)
    setIsDeleting(false)
    setShowDeleteDialog(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-3 w-3" />
      case "medium":
        return <Clock className="h-3 w-3" />
      case "low":
        return <CheckCircle2 className="h-3 w-3" />
      default:
        return null
    }
  }

  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return null

    const date = new Date(dateString)

    if (isToday(date)) {
      return { text: "Today", urgent: true }
    } else if (isTomorrow(date)) {
      return { text: "Tomorrow", urgent: false }
    } else if (isPast(date)) {
      return { text: `Overdue (${format(date, "MMM d")})`, urgent: true, overdue: true }
    } else {
      return { text: format(date, "MMM d, yyyy"), urgent: false }
    }
  }

  const dueDateInfo = formatDueDate(task.due_date)

  return (
    <>
      <Card
        className={`task-card ${task.completed ? "task-completed" : ""} ${
          task.priority === "high" ? "priority-high" : task.priority === "medium" ? "priority-medium" : "priority-low"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} className="mt-1" />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium text-gray-900 task-title ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm mt-1 ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                      {task.description}
                    </p>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {getPriorityIcon(task.priority)}
                  <span className="ml-1 capitalize">{task.priority}</span>
                </Badge>

                {dueDateInfo && (
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      dueDateInfo.overdue
                        ? "bg-red-50 text-red-700 border-red-200"
                        : dueDateInfo.urgent
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    {dueDateInfo.text}
                  </Badge>
                )}

                {task.completed && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
