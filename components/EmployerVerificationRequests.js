"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { employmentVerification } from '@/services/api'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Mail,
  Building2,
  Calendar,
  AlertCircle,
  RefreshCw,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react'

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    label: 'Pending'
  },
  approved: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800 border-green-200',
    label: 'Approved'
  },
  rejected: {
    icon: XCircle,
    color: 'bg-red-100 text-red-800 border-red-200',
    label: 'Rejected'
  },
  expired: {
    icon: AlertCircle,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    label: 'Expired'
  }
}

export default function EmployerVerificationRequests() {
  const [requests, setRequests] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')
  const [processingId, setProcessingId] = useState(null)
  const [responseMessage, setResponseMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError('')

    try {
      const [requestsData, statsData] = await Promise.all([
        employmentVerification.getPendingRequests(0, 100),
        employmentVerification.getStats()
      ])

      setRequests(requestsData.requests || [])
      setStats(statsData || {})
    } catch (err) {
      setError(err.message || 'Failed to load verification requests')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (requestId, status, message = '') => {
    setProcessingId(requestId)
    setError('')
    setSuccess('')

    try {
      await employmentVerification.updateRequestStatus(requestId, {
        status,
        verification_message: message
      })

      setSuccess(`Request ${status} successfully!`)
      setResponseMessage('')
      
      // Reload data to get updated status
      await loadData()
    } catch (err) {
      setError(err.message || 'Failed to update request status')
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFilteredRequests = (status) => {
    return requests.filter(req => status === 'all' || req.status === status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Employment Verification Requests
        </h1>
        <p className="text-gray-600">
          Review and verify employment requests from your current and former employees
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total_requests}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending_count}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved_count}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected_count}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </Card>
        </div>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Requests Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending ({getFilteredRequests('pending').length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({getFilteredRequests('approved').length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({getFilteredRequests('rejected').length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({requests.length})
          </TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected', 'all'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6">
            {getFilteredRequests(tabValue).length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {tabValue === 'all' ? '' : tabValue} requests
                </h3>
                <p className="text-gray-600">
                  {tabValue === 'pending' 
                    ? 'When employees request verification from your company, they will appear here.' 
                    : `No ${tabValue === 'all' ? '' : tabValue} verification requests found.`
                  }
                </p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {getFilteredRequests(tabValue).map((request) => {
                  const StatusIcon = statusConfig[request.status]?.icon || Clock
                  const statusColor = statusConfig[request.status]?.color || 'bg-gray-100 text-gray-800'
                  const statusLabel = statusConfig[request.status]?.label || request.status
                  
                  return (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <User className="h-5 w-5 text-gray-400 mr-2" />
                                <h3 className="font-semibold text-gray-900">
                                  {request.employee_name}
                                </h3>
                              </div>
                              <Badge className={`${statusColor}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusLabel}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2" />
                                  {request.employee_email}
                                </div>
                                <div className="flex items-center">
                                  <Building2 className="h-4 w-4 mr-2" />
                                  {request.job_title}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Requested: {formatDate(request.created_at)}
                                </div>
                                {request.start_date && (
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Employment: {formatDate(request.start_date)} - {request.end_date ? formatDate(request.end_date) : 'Present'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {request.verification_message && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Employee message:</strong> {request.verification_message}
                            </p>
                          </div>
                        )}

                        {request.status === 'pending' && (
                          <div className="mt-6 border-t pt-6">
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Response Message (Optional)
                              </label>
                              <Textarea
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                placeholder="Add a message explaining your decision..."
                                rows={3}
                                className="w-full"
                              />
                            </div>
                            
                            <div className="flex space-x-3">
                              <Button
                                onClick={() => handleUpdateStatus(request.id, 'approved', responseMessage)}
                                disabled={processingId === request.id}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {processingId === request.id ? (
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                )}
                                Approve
                              </Button>
                              
                              <Button
                                onClick={() => handleUpdateStatus(request.id, 'rejected', responseMessage)}
                                disabled={processingId === request.id}
                                variant="destructive"
                              >
                                {processingId === request.id ? (
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <XCircle className="h-4 w-4 mr-2" />
                                )}
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}

                        {request.status !== 'pending' && request.verification_message && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                              <strong>Your response:</strong> {request.verification_message}
                            </p>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
