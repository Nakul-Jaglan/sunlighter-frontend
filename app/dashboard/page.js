"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { employment, verification } from '../../services/api'
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'
import useAuthStore from "@/stores/authStore"

function EmployeeDashboard() {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const authLoading = useAuthStore(state => state.isLoading)

  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // State for API data
  const [employments, setEmployments] = useState([])
  const [verificationCodes, setVerificationCodes] = useState([])
  const [accessHistory, setAccessHistory] = useState([])
  
  // Computed values
  const currentEmployment = employments.find(emp => emp.isCurrent) || null
  const employmentStatus = !!currentEmployment

  const [newCodeForm, setNewCodeForm] = useState({
    purpose: "",
    expiry: "24h",
    maxUsage: 3,
    requireApproval: false
  })

  const [showCodeModal, setShowCodeModal] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [showEmploymentModal, setShowEmploymentModal] = useState(false)
  const [newEmploymentForm, setNewEmploymentForm] = useState({
    company: "",
    role: "",
    joiningDate: "",
    companyHandle: "",  // Changed from location to companyHandle
    employmentType: "Full-time",
    department: "",
    salary: ""
  })

  // Helper functions for employment type mapping
  const employmentTypeToBackend = {
    'Full-time': 'full_time',
    'Part-time': 'part_time',
    'Contract': 'contract',
    'Freelance': 'freelance',
    'Internship': 'internship'
  }
  
  const employmentTypeToDisplay = {
    'full_time': 'Full-time',
    'part_time': 'Part-time',
    'contract': 'Contract',
    'freelance': 'Freelance',
    'internship': 'Internship'
  }

  // Data loading effect
  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Load data in parallel
      const [employmentsData, codesData, logsData] = await Promise.all([
        employment.getAll(),
        verification.getCodes(),
        verification.getAccessLogs()
      ])

      // Map employment types to display format
      const mappedEmployments = employmentsData.map(emp => ({
        ...emp,
        employmentType: employmentTypeToDisplay[emp.employment_type] || emp.employment_type,
        company: emp.company_name,
        role: emp.job_title,  // Changed from 'position' to 'job_title'
        joiningDate: emp.start_date,
        companyHandle: emp.company_handle,  // Changed from location to company_handle
        endDate: emp.end_date,
        isCurrent: emp.employment_status === 'current'  // Check employment_status instead of is_current
      }))

      setEmployments(mappedEmployments)
      setVerificationCodes(codesData)
      setAccessHistory(logsData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if(authLoading) return
    if (isAuthenticated) {
      loadDashboardData()
    }
    else{
      window.location.href = '/login';
      return
    }
  }, [authLoading, isAuthenticated, loadDashboardData])

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const tabVariants = {
    inactive: { color: "#6B7280" },
    active: { color: "#3B82F6" }
  }

  const generateCode = async () => {
    try {
      // Get current employment for employment_id
      const currentEmp = employments.find(emp => emp.isCurrent)
      if (!currentEmp) {
        setError('You need to have a current employment to generate verification codes.')
        return
      }

      // Calculate expiry datetime
      const hoursToAdd = newCodeForm.expiry === '24h' ? 24 : newCodeForm.expiry === '7d' ? 168 : 720
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + hoursToAdd)

      const codeData = {
        purpose: newCodeForm.purpose,
        employment_id: currentEmp.id,
        expires_at: expiryDate.toISOString(),
        max_usage_count: newCodeForm.maxUsage,
        require_approval: newCodeForm.requireApproval
      }

      const newCode = await verification.createCode(codeData)
      setGeneratedCode(newCode.code)
      setShowCodeModal(true)
      setNewCodeForm({ purpose: "", expiry: "24h", maxUsage: 3, requireApproval: false })
      
      // Refresh codes list
      await loadVerificationCodes()
    } catch (error) {
      console.error('Failed to generate code:', error)
      setError(error.message)
    }
  }

  // Helper functions to load individual data
  const loadEmployments = async () => {
    try {
      const data = await employment.getAll()
      setEmployments(data)
    } catch (error) {
      console.error('Failed to load employments:', error)
    }
  }

  const loadVerificationCodes = async () => {
    try {
      const data = await verification.getCodes()
      setVerificationCodes(data)
    } catch (error) {
      console.error('Failed to load verification codes:', error)
    }
  }

  const revokeCode = async (codeId) => {
    try {
      await verification.revokeCode(codeId)
      // Update local state
      setVerificationCodes(prev => 
        prev.map(code => 
          code.id === codeId ? { ...code, status: 'revoked' } : code
        )
      )
    } catch (error) {
      console.error('Failed to revoke code:', error)
      setError('Failed to revoke verification code. Please try again.')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const addEmployment = async () => {
    try {
      // Create employment via API with correct field mapping
      const employmentData = {
        company_name: newEmploymentForm.company,
        job_title: newEmploymentForm.role,  // Changed from 'position' to 'job_title'
        start_date: newEmploymentForm.joiningDate,
        company_website: `https://${newEmploymentForm.companyHandle}.com`,  // Generate website from handle
        employment_type: employmentTypeToBackend[newEmploymentForm.employmentType],
        department: newEmploymentForm.department,
        salary_range: newEmploymentForm.salary || null,  // Changed from 'salary' to 'salary_range'
        company_handle: newEmploymentForm.companyHandle,  // Store company handle for direct matching
      }
      
      const newEmployment = await employment.create(employmentData)
      
      // Map the returned employment to display format
      const mappedNewEmployment = {
        ...newEmployment,
        employmentType: employmentTypeToDisplay[newEmployment.employment_type] || newEmployment.employment_type,
        company: newEmployment.company_name,
        role: newEmployment.job_title,  // Changed from 'position' to 'job_title'
        joiningDate: newEmployment.start_date,
        companyHandle: newEmployment.company_handle || newEmploymentForm.companyHandle,  // Use company handle
        endDate: newEmployment.end_date,
        isCurrent: newEmployment.employment_status === 'current'  // Check employment_status
      }
      
      // Mark previous current employment as ended
      setEmployments(prev => 
        prev.map(emp => 
          emp.isCurrent ? { ...emp, isCurrent: false, endDate: new Date().toISOString().split('T')[0] } : emp
        )
      )
      
      // Add new employment to local state
      setEmployments(prev => [mappedNewEmployment, ...prev])
      
      // Reset form and close modal
      setNewEmploymentForm({
        company: "",
        role: "",
        joiningDate: "",
        companyHandle: "",  // Changed from location
        employmentType: "Full-time",
        department: "",
        salary: ""
      })
      setShowEmploymentModal(false)
    } catch (error) {
      console.error('Failed to add employment:', error)
      setError('Failed to add employment. Please try again.')
    }
  }

  const markAsCurrentJob = async (employmentId) => {
    try {
      await employment.setCurrentEmployment(employmentId)  // Changed from setCurrent to setCurrentEmployment
      
      setEmployments(prev => 
        prev.map(emp => {
          if (emp.id === employmentId) {
            return { ...emp, isCurrent: true, endDate: null }
          } else {
            return { ...emp, isCurrent: false, endDate: emp.endDate || new Date().toISOString().split('T')[0] }
          }
        })
      )
    } catch (error) {
      console.error('Failed to set current employment:', error)
      setError('Failed to update current employment. Please try again.')
    }
  }

  const deleteEmployment = async (employmentId) => {
    try {
      await employment.delete(employmentId)
      
      // Remove from local state
      setEmployments(prev => prev.filter(emp => emp.id !== employmentId))
    } catch (error) {
      console.error('Failed to delete employment:', error)
      setError('Failed to delete employment. Please try again.')
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'codes', name: 'Verification Codes', icon: '🔐' },
    { id: 'history', name: 'Access History', icon: '📋' },
    { id: 'employment', name: 'Employment', icon: '💼' },
    // { id: 'privacy', name: 'Privacy Settings', icon: '🔒' },
    // { id: 'settings', name: 'Account Settings', icon: '⚙️' }
  ]

  // Loading state
  if (authLoading || isLoading) {
    return (
      <Layout title="Loading... - SunLighter">
        <div className="max-w-7xl mx-auto py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your dashboard...</span>
          </div>
        </div>
      </Layout>
    )
  }

  // Authentication check
  if (!isAuthenticated) {
    return (
      <Layout title="Access Denied - SunLighter">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
            <Button onClick={() => window.location.href = '/login'} className="py-2">
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  // Error state
  if (error) {
    return (
      <Layout title="Dashboard Error - SunLighter">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadDashboardData} className="py-2">
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Employee Dashboard - SunLighter">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
              <p className="text-gray-600">Manage your employment verification and privacy settings</p>
            </div>
            {/* <div className="mt-4 md:mt-0">
              <motion.div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  employmentStatus 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  employmentStatus ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                {employmentStatus ? 'Currently Employed' : 'Not Currently Employed'}
              </motion.div>
            </div> */}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="mb-8 flex overflow-x-auto justify-center" variants={itemVariants}>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-32 flex-shrink-0 cursor-pointer py-4 px-1 border-b-2 font-medium text-sm flex items-center justify-center transition-colors duration-200
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? "active" : "inactive"}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{tab.name}</span>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>


        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {/* Current Employment Status */}
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Current Employment Status</h2>
                    {/* <motion.button
                      onClick={() => setEmploymentStatus(!employmentStatus)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        employmentStatus ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform"
                        animate={{ x: employmentStatus ? 20 : 2 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button> */}
                  </div>
                  
                  {employmentStatus && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid md:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <p className="text-gray-900">{currentEmployment.company}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <p className="text-gray-900">{currentEmployment.role}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                        <p className="text-gray-900">{new Date(currentEmployment.joiningDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Handle</label>
                        <p className="text-gray-900">{currentEmployment.companyHandle ? `@${currentEmployment.companyHandle}` : 'Not specified'}</p>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>

              {/* User Profile Information */}
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <p className="text-gray-900">{user?.full_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <p className="text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                        {user?.user_id || 'Not assigned'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                      <p className="text-gray-900 capitalize">{user?.user_type}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              {/* <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('codes')}
                      className="cursor-pointer"
                    >
                      <Card className="p-4 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🔐</div>
                          <h3 className="font-semibold text-gray-900">Generate Code</h3>
                          <p className="text-sm text-gray-600">Create new verification code</p>
                        </div>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('history')}
                      className="cursor-pointer"
                    >
                      <Card className="p-4 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                        <div className="text-center">
                          <div className="text-2xl mb-2">📋</div>
                          <h3 className="font-semibold text-gray-900">View History</h3>
                          <p className="text-sm text-gray-600">Check access logs</p>
                        </div>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('privacy')}
                      className="cursor-pointer"
                    >
                      <Card className="p-4 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🛡️</div>
                          <h3 className="font-semibold text-gray-900">Privacy Settings</h3>
                          <p className="text-sm text-gray-600">Manage permissions</p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </Card>
              </motion.div> */}

              {/* Stats */}
              {/* <motion.div variants={itemVariants}>
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{verificationCodes.filter(c => c.status === 'Active').length}</div>
                    <div className="text-sm text-gray-600">Active Codes</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{accessHistory.length}</div>
                    <div className="text-sm text-gray-600">Total Verifications</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-600">Companies</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </Card>
                </div>
              </motion.div> */}
            </motion.div>
          )}

          {activeTab === 'codes' && (
            <motion.div
              key="codes"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {/* Generate New Code */}
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Verification Code</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Purpose"
                      placeholder="e.g., Job application at Google"
                      value={newCodeForm.purpose}
                      onChange={(e) => setNewCodeForm(prev => ({ ...prev, purpose: e.target.value }))}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Duration</label>
                      <select
                        value={newCodeForm.expiry}
                        onChange={(e) => setNewCodeForm(prev => ({ ...prev, expiry: e.target.value }))}
                        className="w-full px-3 py-3 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="24h">24 Hours</option>
                        <option value="7d">7 Days</option>
                        <option value="30d">30 Days</option>
                      </select>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={generateCode}
                      disabled={!newCodeForm.purpose}
                      className="w-full md:w-auto py-2"
                    >
                      Generate Access Code
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>

              {/* Active Codes */}
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Verification Codes</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {verificationCodes.map((code, index) => (
                          <motion.tr
                            key={code.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <code className="text-sm font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">{code.code}</code>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => copyToClipboard(code.code)}
                                  className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 512 512"
                                    stroke="currentColor"
                                    strokeWidth={32}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5">
                                    <rect x="128" y="128" width="336" height="336" rx="57" ry="57" />
                                    <path d="M383.5 128l.5 -24a56.16 56.16 0 0 0 -56 -56H112
                                            a64.19 64.19 0 0 0 -64 64V328
                                            a56.16 56.16 0 0 0 56 56h24" />
                                  </svg>
                                </motion.button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{code.purpose}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(code.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(code.expires_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                code.status === 'active' ? 'bg-green-100 text-green-800' :
                                code.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                                code.status === 'revoked' ? 'bg-red-100 text-red-800' :
                                code.status === 'used' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {code.status === 'active' && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => revokeCode(code.id)}
                                  className="text-red-600 hover:text-red-800 cursor-pointer"
                                >
                                  Revoke
                                </motion.button>
                              )}
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
                  <div className="space-y-4">
                    {accessHistory.map((access, index) => (
                      <motion.div
                        key={access.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{access.employer}</h3>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                access.authorized ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {access.authorized ? 'Authorized' : 'Unauthorized'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <span>Code: {access.codeUsed}</span> • 
                              <span> {access.timestamp}</span> • 
                              <span> {access.location}</span>
                            </div>
                          </div>
                          {!access.authorized && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Report Unauthorized
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'employment' && (
            <motion.div
              key="employment"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {/* Add New Employment */}
              <motion.div variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Employment History</h2>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={() => setShowEmploymentModal(true)}
                        className="py-2"
                      >
                        Add New Employment
                      </Button>
                    </motion.div>
                  </div>
                  <p className="text-gray-600 mb-6">Manage your employment history and current job status</p>
                  
                  {/* Employment List */}
                  <div className="space-y-4">
                    {employments.map((employment, index) => (
                      <motion.div
                        key={employment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-lg p-4 ${
                          employment.isCurrent ? 'border-green-200 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{employment.role}</h3>
                              {employment.isCurrent && (
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{employment.company}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Duration:</span> {new Date(employment.joiningDate).toLocaleDateString()} - {employment.endDate ? new Date(employment.endDate).toLocaleDateString() : 'Present'}
                              </div>
                              <div>
                                <span className="font-medium">Company Handle:</span> {employment.companyHandle ? `@${employment.companyHandle}` : 'Not specified'}
                              </div>
                              <div>
                                <span className="font-medium">Type:</span> {employment.employmentType}
                              </div>
                              {employment.department && (
                                <div>
                                  <span className="font-medium">Department:</span> {employment.department}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            {!employment.isCurrent && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => markAsCurrentJob(employment.id)}
                                className="text-sm cursor-pointer text-blue-600 hover:text-blue-800"
                              >
                                Mark as Current
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => deleteEmployment(employment.id)}
                              className="text-sm cursor-pointer text-red-600 hover:text-red-800"
                            >
                              Delete
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

          {/* Add other tab contents here... */}
        </AnimatePresence>

        {/* Code Generation Modal */}
        <AnimatePresence>
          {showCodeModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <motion.div
                  className="fixed inset-0 transition-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCodeModal(false)}
                /> */}

                <motion.div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="text-center">
                      <motion.div
                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                        Verification Code Generated!
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <code className="text-2xl font-mono font-bold text-blue-600">{generatedCode}</code>
                      </div>
                      <div className="flex space-x-2 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(generatedCode)}
                          className="inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Copy Code
                        </motion.button>
                        {/* <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          📱 Show QR
                        </motion.button> */}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCodeModal(false)}
                      className="w-full cursor-pointer inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Done
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Employment Modal */}
        <AnimatePresence>
          {showEmploymentModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <motion.div
                  className="fixed inset-0  transition-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowEmploymentModal(false)}
                /> */}

                <motion.div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                         Add New Employment
                      </h3>
                      <p className="text-sm text-gray-600">
                        Congratulations on your new job! Add your employment details to keep your profile updated.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Company Name"
                          placeholder="e.g., Google Inc."
                          value={newEmploymentForm.company}
                          onChange={(e) => setNewEmploymentForm(prev => ({ ...prev, company: e.target.value }))}
                        />
                        <Input
                          label="Job Title"
                          placeholder="e.g., Senior Software Engineer"
                          value={newEmploymentForm.role}
                          onChange={(e) => setNewEmploymentForm(prev => ({ ...prev, role: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Start Date"
                          type="date"
                          value={newEmploymentForm.joiningDate}
                          onChange={(e) => setNewEmploymentForm(prev => ({ ...prev, joiningDate: e.target.value }))}
                        />
                        <Input
                          label="Company Handle"
                          placeholder="e.g., @sunlighter or sunlighter"
                          value={newEmploymentForm.companyHandle}
                          onChange={(e) => {
                            // Remove @ symbol if present and convert to lowercase
                            let value = e.target.value.replace('@', '').toLowerCase();
                            setNewEmploymentForm(prev => ({ ...prev, companyHandle: value }));
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter the company&apos;s handle (without @). Verification requests will be sent directly to this company account.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                          <select
                            value={newEmploymentForm.employmentType}
                            onChange={(e) => setNewEmploymentForm(prev => ({ ...prev, employmentType: e.target.value }))}
                            className="w-full px-3 py-3 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>
                        <Input
                          label="Department (Optional)"
                          placeholder="e.g., Engineering, Marketing"
                          value={newEmploymentForm.department}
                          onChange={(e) => setNewEmploymentForm(prev => ({ ...prev, department: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addEmployment}
                      disabled={!newEmploymentForm.company || !newEmploymentForm.role || !newEmploymentForm.joiningDate}
                      className="w-full cursor-pointer inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add Employment
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowEmploymentModal(false)}
                      className="mt-3 w-full cursor-pointer inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  )
}

export default EmployeeDashboard
