"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '../../../contexts/AuthContext'
import { api } from '../../../services/api'
import Layout from '../../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

function EmployerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('verify')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Real data from API
  const [accessHistory, setAccessHistory] = useState([])
  const [savedVerifications, setSavedVerifications] = useState([])
  const [verificationRequests, setVerificationRequests] = useState([])

  useEffect(() => {
    if (!user || user.user_type !== 'employer') {
      window.location.href = '/login'
      return
    }
    loadDashboardData()
  }, [user])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Load verification requests for this employer
      const requests = await api.employer.getVerificationRequests()
      setVerificationRequests(requests || [])
      
      // Load access history
      const history = await api.admin.getAccessLogs()
      setAccessHistory(history || [])
      
      // Load saved verifications (could be from completed requests)
      const completed = requests?.filter(r => r.status === 'verified') || []
      setSavedVerifications(completed)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      // Keep empty arrays as fallback
      setVerificationRequests([])
      setAccessHistory([])
      setSavedVerifications([])
    } finally {
      setIsLoading(false)
    }
  }

  const [requestForm, setRequestForm] = useState({
    email: '',
    reason: '',
    message: ''
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const verifyEmployee = async () => {
    if (!verificationCode.trim()) {
      setVerificationResult({
        valid: false,
        error: "Please enter a verification code"
      })
      return
    }

    setIsVerifying(true)
    
    try {
      const result = await api.verification.verify(verificationCode.trim())
      setVerificationResult({
        valid: true,
        employee: {
          name: result.employee_name,
          status: result.status,
          role: result.position || "Employee",
          company: result.company_name,
          joinDate: result.start_date,
          verifiedOn: new Date().toISOString()
        }
      })
      
      // Reload dashboard data to update access history
      loadDashboardData()
    } catch (error) {
      console.error('Verification error:', error)
      setVerificationResult({
        valid: false,
        error: error.response?.data?.detail || "Invalid verification code or verification failed"
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  const sendVerificationRequest = async () => {
    if (!requestForm.email.trim()) {
      alert('Please enter an email address')
      return
    }

    try {
      await api.employer.sendVerificationRequest({
        employee_email: requestForm.email,
        reason: requestForm.reason,
        message: requestForm.message
      })
      
      alert('Verification request sent to employee!')
      setRequestForm({ email: '', reason: '', message: '' })
      // Reload data to show new request
      loadDashboardData()
    } catch (error) {
      console.error('Error sending verification request:', error)
      alert('Failed to send verification request. Please try again.')
    }
  }

  const tabs = [
    { id: 'verify', name: 'Verify Employee', icon: '🔍' },
    { id: 'history', name: 'Access History', icon: '📋' },
    { id: 'request', name: 'Request Verification', icon: '📤' },
    // { id: 'saved', name: 'Saved Verifications', icon: '⭐' },
    // { id: 'compliance', name: 'Compliance & Logs', icon: '📊' },
    // { id: 'settings', name: 'Account Settings', icon: '⚙️' }
  ]

  if (isLoading) {
    return (
      <Layout title="Employer Dashboard - SunLighter">
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Employer Dashboard - SunLighter">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
              <p className="text-gray-600 text-lg">Welcome back, {user?.full_name}</p>
              {user?.company_handle && (
                <p className="text-blue-600 text-sm font-mono">@{user.company_handle}</p>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Company Information */}
        <motion.div className="mb-8" variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <p className="text-gray-900">{user?.company_name || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Handle</label>
                <p className="text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                  {user?.company_handle ? `@${user.company_handle}` : 'Not assigned'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                <p className="text-gray-900">{user?.company_website || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <p className="text-gray-900">{user?.company_size || 'Not specified'}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 cursor-pointer px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* <span>{tab.icon}</span> */}
                  <span>{tab.name}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'verify' && (
            <motion.div
              key="verify"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6 lg:w-[50vw]"
            >
              {/* Verification Input */}
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Verify Employee Status</h2>
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                      <Input
                        label="Access Code"
                        placeholder="Enter employee verification code (e.g., SL-9A7G-K1P4)"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="flex items-end">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={verifyEmployee}
                          disabled={!verificationCode || isVerifying}
                          className="py-3 text-xl"
                        >
                          {isVerifying ? 'Verifying...' : 'Verify'}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Verification Result */}
                  {verificationResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg border ${
                        verificationResult.valid 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      {verificationResult.valid ? (
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-green-800">Verification Successful</h3>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                              <span className="font-medium">Employee:</span> {verificationResult.employee.name}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {verificationResult.employee.status}
                            </div>
                            <div>
                              <span className="font-medium">Role:</span> {verificationResult.employee.role}
                            </div>
                            <div>
                              <span className="font-medium">Company:</span> {verificationResult.employee.company}
                            </div>
                            <div>
                              <span className="font-medium">Join Date:</span> {verificationResult.employee.joinDate}
                            </div>
                            <div>
                              <span className="font-medium">Verified On:</span> {new Date(verificationResult.employee.verifiedOn).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-red-800">Verification Failed</h3>
                            <p className="text-red-600">Invalid or expired verification code</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </Card>
              </motion.div>

              {/* Quick Stats */}
              {/* <motion.div variants={itemVariants}>
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{accessHistory.filter(h => h.outcome === 'Valid').length}</div>
                    <div className="text-sm text-gray-600">Successful Verifications</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{savedVerifications.length}</div>
                    <div className="text-sm text-gray-600">Saved Verifications</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">7</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </Card>
                </div>
              </motion.div> */}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Access History</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {accessHistory.map((access, index) => (
                          <motion.tr
                            key={access.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {access.date} {access.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <code className="text-sm font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">{access.code}</code>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{access.employeeName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{access.position}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                access.outcome === 'Valid' ? 'bg-green-100 text-green-800' :
                                access.outcome === 'Expired' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {access.outcome}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'request' && (
            <motion.div
              key="request"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:w-[50vw]"
            >
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Employee Verification</h2>
                  <p className="text-gray-600 mb-6">Send a verification request to an employee if you don&apos;t have their access code.</p>
                  
                  <div className="space-y-4">
                    <Input
                      label="Employee Email"
                      type="email"
                      placeholder="employee@example.com"
                      value={requestForm.email}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Verification</label>
                      <select
                        value={requestForm.reason}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, reason: e.target.value }))}
                        className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select reason...</option>
                        <option value="job-application">Job Application</option>
                        <option value="background-check">Background Check</option>
                        <option value="employment-verification">Employment Verification</option>
                        <option value="reference-check">Reference Check</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                      <textarea
                        rows={4}
                        value={requestForm.message}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Additional context or instructions for the employee..."
                        className="w-full px-3 py-2 placeholder:text-gray-400 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="py-2"
                        onClick={sendVerificationRequest}
                        disabled={!requestForm.email || !requestForm.reason}
                      >
                        Send Verification Request
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Verifications</h2>
                  <div className="space-y-4">
                    {savedVerifications.map((verification, index) => (
                      <motion.div
                        key={verification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{verification.employeeName}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              <span>{verification.position}</span> • 
                              <span> {verification.company}</span> • 
                              <span> Verified on {verification.verifiedOn}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
                            >
                              Re-verify
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-red-600 hover:text-red-800 cursor-pointer text-sm"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  )
}

export default EmployerDashboard
