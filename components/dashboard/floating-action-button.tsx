"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface FloatingActionButtonProps {
  onClick: () => void
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button onClick={onClick} className="fab flex items-center justify-center" size="lg">
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add new task</span>
    </Button>
  )
}
