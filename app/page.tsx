"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginPage } from "@/components/auth/login-page"
import { Dashboard } from "@/components/dashboard/dashboard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginPage />
}
