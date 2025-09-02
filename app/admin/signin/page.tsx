// app/admin/signin/page.tsx
"use client"
import { signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Github, Shield, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState < string > ("")
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const errorParam = searchParams.get('error')
  
  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/admin')
      }
    })
    
    // Handle error from URL params
    if (errorParam === 'AccessDenied') {
      setError('Access denied. You are not authorized to access this admin panel.')
    } else if (errorParam === 'Signin') {
      setError('Sign in failed. Please try again.')
    }
  }, [router, errorParam])
  
  const handleSignIn = async () => {
    try {
      setError('')
      setIsLoading(true)
      
      const result = await signIn('github', {
        callbackUrl: '/admin',
        redirect: false
      })
      
      if (result?.error) {
        setError('Sign in failed. Please try again.')
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Back to home link */}
          <div className="mb-6 text-left">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-6">
            <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Secure authentication required</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Github className="h-5 w-5" />
                Continue with GitHub
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-gray-500">
            Only authorized users can access this panel
          </p>
        </div>
      </motion.div>
    </div>
  )
}