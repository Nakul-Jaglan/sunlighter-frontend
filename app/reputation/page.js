'use client'
import Layout from '@/components/layout/Layout'
import ReputationLedger from '@/components/ReputationLedger'
import useAuthStore from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ReputationLedgerPage() {
  const user = useAuthStore(state => state.user)
  const loading = useAuthStore(state => state.isLoading)
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
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

  if (!user) {
    return null
  }

  return (
    <Layout>
      <ReputationLedger />
    </Layout>
  )
}
