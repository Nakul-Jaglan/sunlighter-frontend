'use client'
import Layout from '@/components/Layout'
import EmploymentVerificationRequests from '@/components/EmploymentVerificationRequests'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerificationRequestsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/register')
      } else if (user.user_type !== 'employee') {
        router.push('/dashboard')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.user_type !== 'employee') {
    return null
  }

  return (
    <Layout>
      <EmploymentVerificationRequests />
    </Layout>
  )
}
