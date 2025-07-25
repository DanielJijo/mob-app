"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Github, Chrome, CheckSquare, Zap, Shield, Smartphone } from "lucide-react"

export function LoginPage() {
  const { signInWithGoogle, signInWithGitHub } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <CheckSquare className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Organize your life, <span className="text-primary">one task at a time</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              A beautiful, modern task management app that helps you stay productive and organized. Sync across all your
              devices and never miss a deadline again.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <Zap className="h-8 w-8 text-primary" />
              <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
              <p className="text-sm text-gray-600 text-center lg:text-left">Optimized for speed and performance</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="font-semibold text-gray-900">Secure & Private</h3>
              <p className="text-sm text-gray-600 text-center lg:text-left">Your data is encrypted and secure</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <Smartphone className="h-8 w-8 text-primary" />
              <h3 className="font-semibold text-gray-900">Mobile Ready</h3>
              <p className="text-sm text-gray-600 text-center lg:text-left">Works perfectly on all devices</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Welcome to TaskFlow</CardTitle>
              <CardDescription className="text-base">Sign in to start managing your tasks efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={signInWithGoogle}
                variant="outline"
                size="lg"
                className="w-full h-12 text-base font-medium hover:bg-gray-50 transition-colors bg-transparent"
              >
                <Chrome className="mr-3 h-5 w-5" />
                Continue with Google
              </Button>

              <Button
                onClick={signInWithGitHub}
                variant="outline"
                size="lg"
                className="w-full h-12 text-base font-medium hover:bg-gray-50 transition-colors bg-transparent"
              >
                <Github className="mr-3 h-5 w-5" />
                Continue with GitHub
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
