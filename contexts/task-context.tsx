"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { useAuth } from "./auth-context"
import { useToast } from "@/hooks/use-toast"

export interface Task {
  id: string
  title: string
  description: string
  due_date: string | null
  priority: "low" | "medium" | "high"
  completed: boolean
  created_at: string
  updated_at: string
  user_id: string
}

export type TaskFilter = "all" | "open" | "completed"
export type TaskPriority = "low" | "medium" | "high"

interface TaskContextType {
  tasks: Task[]
  loading: boolean
  filter: TaskFilter
  searchQuery: string
  setFilter: (filter: TaskFilter) => void
  setSearchQuery: (query: string) => void
  addTask: (task: Omit<Task, "id" | "created_at" | "updated_at" | "user_id">) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTaskComplete: (id: string) => Promise<void>
  refreshTasks: () => Promise<void>
  filteredTasks: Task[]
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<TaskFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      loadTasks()
    } else {
      setTasks([])
    }
  }, [user])

  const loadTasks = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData: Omit<Task, "id" | "created_at" | "updated_at" | "user_id">) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ ...taskData, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setTasks((prev) => [data, ...prev])
      toast({
        title: "Task created",
        description: "Your task has been successfully created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)))
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id)

      if (error) throw error

      setTasks((prev) => prev.filter((task) => task.id !== id))
      toast({
        title: "Task deleted",
        description: "Your task has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    await updateTask(id, { completed: !task.completed })
  }

  const refreshTasks = async () => {
    await loadTasks()
  }

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    // Apply filter
    if (filter === "open" && task.completed) return false
    if (filter === "completed" && !task.completed) return false

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
    }

    return true
  })

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filter,
        searchQuery,
        setFilter,
        setSearchQuery,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        refreshTasks,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
