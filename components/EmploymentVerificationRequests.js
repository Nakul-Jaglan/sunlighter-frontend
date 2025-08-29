"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import Textarea from './ui/textarea'
import Badge from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { employmentVerification, employment } from '@/services/api'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Send, 
  Building2,
  Calendar,
  User,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800',
    label: 'Pending'
  },
  approved: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800',
    label: 'Approved'
  },
  rejected: {
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
    label: 'Rejected'
  },
  expired: {
    icon: AlertCircle,
    color: 'bg-gray-100 text-gray-800',
    label: 'Expired'
  }
}

export default function EmploymentVerificationRequests() {
  const [employments, setEmployments] = useState([])
  const [verificationRequests, setVerificationRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedEmployment, setSelectedEmployment] = useState('')
  const [verificationMessage, setVerificationMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError('')

    try {
      const [employmentData, requestsData] = await Promise.all([
        employment.getAll(),
        employmentVerification.getMyRequests()
      ])

      setEmployments(employmentData || [])
      setVerificationRequests(requestsData || [])
    } catch (err) {
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRequest = async (e) => {
    e.preventDefault()
    
    if (!selectedEmployment) {
      setError('Please select an employment record')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const selectedEmploymentData = employments.find(emp => emp.id === parseInt(selectedEmployment))
      
      const requestData = {
        employment_id: parseInt(selectedEmployment),
        company_name: selectedEmploymentData.company_name,
        company_website: selectedEmploymentData.company_website || `https://${selectedEmploymentData.company_handle}.com`,
        verification_message: verificationMessage
      }

      await employmentVerification.createRequest(requestData)
      
      setSuccess('Verification request sent successfully!')
      setSelectedEmployment('')
      setVerificationMessage('')
      
      // Reload requests to show the new one
      await loadData()
    } catch (err) {
      setError(err.message || 'Failed to send verification request')
    } finally {
      setSubmitting(false)
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

  const getAvailableEmployments = () => {
    // Filter out employments that already have pending requests
    const pendingRequestEmploymentIds = verificationRequests
      .filter(req => req.status === 'pending')
      .map(req => req.employment_id)
    
    return employments.filter(emp => !pendingRequestEmploymentIds.includes(emp.id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Employment Verification Requests
        </h1>
        <p className="text-gray-600">
          Request verification from your employers to validate your employment history
        </p>
      </div>

      {/* Create New Request */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Send className="h-5 w-5 mr-2" />
          Request New Verification
        </h2>

        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Employment Record
            </label>
            <select
              value={selectedEmployment}
              onChange={(e) => setSelectedEmployment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose an employment record...</option>
              {getAvailableEmployments().map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.job_title} at {emp.company_name} ({formatDate(emp.start_date)} - {emp.end_date ? formatDate(emp.end_date) : 'Present'})
                </option>
              ))}
            </select>
            {getAvailableEmployments().length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No employment records available for verification requests. 
                {verificationRequests.some(req => req.status === 'pending') && 
                  ' You have pending requests for all your employment records.'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message to Employer (Optional)
            </label>
            <Textarea
              value={verificationMessage}
              onChange={(e) => setVerificationMessage(e.target.value)}
              placeholder="Add a message to help your employer identify you and verify your employment..."
              rows={3}
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            disabled={submitting || getAvailableEmployments().length === 0}
            className="w-full"
          >
            {submitting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sending Request...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Verification Request
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Existing Requests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Verification Requests</h2>
        
        {verificationRequests.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Clock className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Yet</h3>
            <p className="text-gray-600">
              Create your first verification request to get your employment validated by your employer.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {verificationRequests.map((request) => {
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
                        <div className="flex items-center mb-2">
                          <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                          <h3 className="font-semibold text-gray-900">{request.company_name}</h3>
                          <Badge className={`ml-2 ${statusColor}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusLabel}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Requested: {formatDate(request.created_at)}
                          </div>
                          {request.verified_at && (
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Verified: {formatDate(request.verified_at)}
                            </div>
                          )}
                          {request.expires_at && request.status === 'pending' && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                              Expires: {formatDate(request.expires_at)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {request.verification_message && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Your message:</strong> {request.verification_message}
                        </p>
                      </div>
                    )}

                    {request.verification_message && request.status !== 'pending' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Employer response:</strong> {request.verification_message}
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
