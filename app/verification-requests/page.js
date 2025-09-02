'use client'
import Layout from '@/components/layout/Layout'
import EmploymentVerificationRequests from '@/components/EmploymentVerificationRequests'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAuthStore from '@/stores/authStore'

export default function VerificationRequestsPage() {
  const user = useAuthStore(state => state.user)
  const loading = useAuthStore(state => state.isLoading)
  const userType = useAuthStore(state => state.userType)
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (userType !== 'employees') {
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

  if (!user || userType !== 'employees') {
    return null
  }

  return (
    <Layout>
      <EmploymentVerificationRequests />
    </Layout>
  )
}
