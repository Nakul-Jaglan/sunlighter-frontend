"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [employmentStatus, setEmploymentStatus] = useState(true) // true = employed, false = not employed
  const [currentEmployment, setCurrentEmployment] = useState({
    company: "Tech Corp Inc.",
    role: "Senior Software Developer",
    joiningDate: "2023-01-15",
    location: "San Francisco, CA"
  })

  const [verificationCodes, setVerificationCodes] = useState([
    {
      id: 1,
      code: "SL-9A7G-K1P4",
      purpose: "Job Application - Google",
      createdOn: "2025-01-28",
      expiresIn: "2 days",
      status: "Active",
      usageCount: 0,
      maxUsage: 3
    },
    {
      id: 2,
      code: "SL-3K9M-L8B2",
      purpose: "Background Check - Meta",
      createdOn: "2025-01-25",
      expiresIn: "Expired",
      status: "Expired",
      usageCount: 1,
      maxUsage: 1
    }
  ])

  const [accessHistory, setAccessHistory] = useState([
    {
      id: 1,
      employer: "Microsoft HR",
      timestamp: "2025-01-28 14:30",
      codeUsed: "SL-9A7G-K1P4",
      location: "Seattle, WA",
      authorized: true
    },
    {
      id: 2,
      employer: "Meta Recruiting",
      timestamp: "2025-01-25 09:15",
      codeUsed: "SL-3K9M-L8B2",
      location: "Menlo Park, CA",
      authorized: true
    }
  ])

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
    location: "",
    employmentType: "Full-time",
    department: "",
    salary: ""
  })

  const [employmentHistory, setEmploymentHistory] = useState([
    {
      id: 1,
      company: "Tech Corp Inc.",
      role: "Senior Software Developer",
      joiningDate: "2023-01-15",
      endDate: null, // null means current job
      location: "San Francisco, CA",
      employmentType: "Full-time",
      department: "Engineering",
      isCurrent: true
    },
    {
      id: 2,
      company: "StartupXYZ",
      role: "Software Developer",
      joiningDate: "2021-06-01",
      endDate: "2022-12-31",
      location: "New York, NY",
      employmentType: "Full-time",
      department: "Product",
      isCurrent: false
    }
  ])

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

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const segments = []
    for (let i = 0; i < 3; i++) {
      let segment = ''
      for (let j = 0; j < 4; j++) {
        segment += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      segments.push(segment)
    }
    const code = `SL-${segments.join('-')}`
    setGeneratedCode(code)
    
    // Add to codes list
    const newCode = {
      id: Date.now(),
      code,
      purpose: newCodeForm.purpose,
      createdOn: new Date().toISOString().split('T')[0],
      expiresIn: newCodeForm.expiry === '24h' ? '1 day' : newCodeForm.expiry === '7d' ? '7 days' : '30 days',
      status: 'Active',
      usageCount: 0,
      maxUsage: newCodeForm.maxUsage
    }
    
    setVerificationCodes(prev => [newCode, ...prev])
    setShowCodeModal(true)
    setNewCodeForm({ purpose: "", expiry: "24h", maxUsage: 3, requireApproval: false })
  }

  const revokeCode = (codeId) => {
    setVerificationCodes(prev => 
      prev.map(code => 
        code.id === codeId ? { ...code, status: 'Revoked' } : code
      )
    )
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const addEmployment = () => {
    const newEmployment = {
      id: Date.now(),
      ...newEmploymentForm,
      isCurrent: true
    }
    
    // Mark previous current employment as ended
    setEmploymentHistory(prev => 
      prev.map(emp => 
        emp.isCurrent ? { ...emp, isCurrent: false, endDate: new Date().toISOString().split('T')[0] } : emp
      )
    )
    
    // Add new employment
    setEmploymentHistory(prev => [newEmployment, ...prev])
    
    // Update current employment for overview
    setCurrentEmployment({
      company: newEmploymentForm.company,
      role: newEmploymentForm.role,
      joiningDate: newEmploymentForm.joiningDate,
      location: newEmploymentForm.location
    })
    
    // Reset form and close modal
    setNewEmploymentForm({
      company: "",
      role: "",
      joiningDate: "",
      location: "",
      employmentType: "Full-time",
      department: "",
      salary: ""
    })
    setShowEmploymentModal(false)
  }

  const markAsCurrentJob = (employmentId) => {
    setEmploymentHistory(prev => 
      prev.map(emp => {
        if (emp.id === employmentId) {
          // Update current employment for overview
          setCurrentEmployment({
            company: emp.company,
            role: emp.role,
            joiningDate: emp.joiningDate,
            location: emp.location
          })
          return { ...emp, isCurrent: true, endDate: null }
        } else {
          return { ...emp, isCurrent: false, endDate: emp.endDate || new Date().toISOString().split('T')[0] }
        }
      })
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'codes', name: 'Verification Codes', icon: '🔐' },
    { id: 'history', name: 'Access History', icon: '📋' },
    { id: 'employment', name: 'Employment', icon: '�' },
    // { id: 'privacy', name: 'Privacy Settings', icon: '�️' },
    // { id: 'settings', name: 'Account Settings', icon: '⚙️' }
  ]

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
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap cursor-pointer py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? "active" : "inactive"}
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
                        <p className="text-gray-900">{currentEmployment.joiningDate}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <p className="text-gray-900">{currentEmployment.location}</p>
                      </div>
                    </motion.div>
                  )}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{code.createdOn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{code.expiresIn}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                code.status === 'Active' ? 'bg-green-100 text-green-800' :
                                code.status === 'Expired' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {code.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {code.status === 'Active' && (
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
                    {employmentHistory.map((employment, index) => (
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
                                <span className="font-medium">Duration:</span> {employment.joiningDate} - {employment.endDate || 'Present'}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span> {employment.location}
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
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
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
                          label="Location"
                          placeholder="e.g., San Francisco, CA"
                          value={newEmploymentForm.location}
                          onChange={(e) => setNewEmploymentForm(prev => ({ ...prev, location: e.target.value }))}
                        />
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
