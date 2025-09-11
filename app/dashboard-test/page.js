"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Input from '../../components/Input'

function DashboardTest() {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock data for testing
  const user = {
    full_name: "John Doe",
    email: "john.doe@example.com", 
    user_id: "12345",
    user_type: "employee"
  }
  
  const employments = [
    {
      id: 1,
      company: "ZeniTech Solutions",
      role: "Senior Software Engineer", 
      joiningDate: "2023-01-15",
      companyHandle: "zenitech",
      employmentType: "Full-time",
      department: "Engineering",
      isCurrent: true
    },
    {
      id: 2,
      company: "DataFlow Inc",
      role: "Frontend Developer",
      joiningDate: "2021-03-01", 
      endDate: "2022-12-31",
      companyHandle: "dataflow",
      employmentType: "Full-time",
      department: "Product",
      isCurrent: false
    }
  ]
  
  const verificationCodes = [
    {
      id: 1,
      code: "ABC123DEF",
      purpose: "Job application at Google",
      created_at: "2024-01-15T10:00:00Z",
      expires_at: "2024-01-16T10:00:00Z",
      status: "active"
    },
    {
      id: 2,
      code: "XYZ789GHI", 
      purpose: "Loan application",
      created_at: "2024-01-10T15:30:00Z",
      expires_at: "2024-01-17T15:30:00Z",
      status: "used"
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'codes', name: 'Verification Codes', icon: '🔐' },
    { id: 'history', name: 'Access History', icon: '📋' },
    { id: 'employment', name: 'Employment', icon: '💼' },
    { id: 'reputation', name: 'Reputation', icon: '⭐' },
  ]

  return (
    <Layout title="Employee Dashboard - SunLighter">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
              <p className="text-gray-600">Manage your employment verification and privacy settings</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="mb-8 flex overflow-x-auto justify-center">
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
            <motion.div key="overview" className="space-y-6">
              {/* Current Employment Status */}
              <motion.div>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Current Employment Status</h2>
                  </div>
                  
                  <motion.div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <p className="text-gray-900">{employments[0].company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <p className="text-gray-900">{employments[0].role}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                      <p className="text-gray-900">{new Date(employments[0].joiningDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Handle</label>
                      <p className="text-gray-900">@{employments[0].companyHandle}</p>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>

              {/* User Profile Information */}
              <motion.div>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <p className="text-gray-900">{user.full_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <p className="text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                        {user.user_id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                      <p className="text-gray-900 capitalize">{user.user_type}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'codes' && (
            <motion.div key="codes" className="space-y-6">
              {/* Generate New Code */}
              <motion.div>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Verification Code</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Purpose"
                      placeholder="e.g., Job application at Google"
                      value=""
                      readOnly
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Duration</label>
                      <select className="w-full px-3 py-3 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="24h">24 Hours</option>
                        <option value="7d">7 Days</option>
                        <option value="30d">30 Days</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto py-2">
                    Generate Access Code
                  </Button>
                </Card>
              </motion.div>

              {/* Active Codes */}
              <motion.div>
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
                        {verificationCodes.map((code) => (
                          <tr key={code.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <code className="text-sm font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">{code.code}</code>
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
                                code.status === 'used' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {code.status === 'active' && (
                                <button className="text-red-600 hover:text-red-800">
                                  Revoke
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'employment' && (
            <motion.div key="employment" className="space-y-6">
              <motion.div>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Employment History</h2>
                    <Button className="py-2">
                      Add New Employment
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {employments.map((employment) => (
                      <motion.div
                        key={employment.id}
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
                                <span className="font-medium">Company Handle:</span> @{employment.companyHandle}
                              </div>
                              <div>
                                <span className="font-medium">Type:</span> {employment.employmentType}
                              </div>
                              <div>
                                <span className="font-medium">Department:</span> {employment.department}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            {!employment.isCurrent && (
                              <button className="text-sm text-blue-600 hover:text-blue-800">
                                Mark as Current
                              </button>
                            )}
                            <button className="text-sm text-red-600 hover:text-red-800">
                              Delete
                            </button>
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

export default DashboardTest