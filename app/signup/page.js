"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

function SignUpPage() {
  const [userType, setUserType] = useState(null) // 'employee' or 'employer'
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    email: "",
    password: "",
    
    // Employee fields
    country: "",
    // timezone: "",
    
    // Employer fields
    organizationName: "",
    designation: "",
    companyHandle: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userId, setUserId] = useState(null)
  const [companyId, setCompanyId] = useState(null)

    // Generate userId after successful submit
    const generateUserId = () => {
        if (userType === 'employee') {
            return Math.floor(Math.random() * 900000) + 100000
        } else if (userType === 'employer') {
            return (
                // (Math.floor(Math.random() * 900000) + 100000) + " & " +
                (formData.companyHandle ? `@${formData.companyHandle}` : "")
            )
        }
        return ""
    }


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-suggest company handle from organization name for employers
    if (field === "organizationName" && value.length >= 3 && userType === 'employer') {
      const suggestedHandle = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 15)

      if (!formData.companyHandle) {
        setFormData((prev) => ({
          ...prev,
          companyHandle: suggestedHandle,
        }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserId(generateUserId())
    setCompanyId(userType === 'employer' ? Math.floor(Math.random() * 900000) + 100000 : null)
    setIsSubmitted(true)
  }

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    // Reset form data when switching user types
    setFormData({
      fullName: "",
      email: "",
      password: "",
      country: "",
      timezone: "",
      organizationName: "",
      designation: "",
      companyHandle: "",
    })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
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
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  }

  const typeCardVariants = {
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.98 }
  }

  if (isSubmitted) {
    return (
      <Layout title="Registration Successful - SunLighter">
        <motion.div 
          className="max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <Card className="p-8 text-center">
              <motion.div className="mb-6" variants={itemVariants}>
                <motion.div 
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                >
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                <p className="text-gray-600 mb-4">
                  Your {userType === 'employee' ? 'employee' : 'employer'} account has been created successfully.
                </p>
                <motion.div 
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <p className="text-sm text-gray-600 mb-1">Your User ID is:</p>
                  <p className="text-xl font-bold text-blue-600">{userId}</p>
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button onClick={() => (window.location.href = "/dashboard")} className="py-2">
                    Go to Dashboard
                  </Button>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    )
  }

  return (
    <Layout title="Sign Up - SunLighter">
      <motion.div 
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join SunLighter</h1>
          <p className="text-gray-600">Create your account and start building trust through verified employment</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!userType ? (
            <motion.div
              key="user-type-selection"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="p-8">
                <motion.div className="text-center mb-6" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Account Type</h2>
                  <p className="text-gray-600 text-lg">Select the option that best describes you</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    variants={typeCardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleUserTypeSelect('employee')}
                    className="cursor-pointer"
                  >
                    <Card className="p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Employee / Freelancer</h3>
                        <p className="text-sm text-gray-600">
                          Verify your employment history and build a trusted professional profile
                        </p>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    variants={typeCardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleUserTypeSelect('employer')}
                    className="cursor-pointer"
                  >
                    <Card className="p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Employer / HR</h3>
                        <p className="text-sm text-gray-600">
                          Verify candidate employment history and streamline your hiring process
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="registration-form"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="p-8">
                <motion.div className="flex items-center mb-8 gap-8" variants={itemVariants}>
                  <motion.button
                    onClick={() => setUserType(null)}
                    className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </motion.button>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {userType === 'employee' ? 'Employee Registration' : 'Employer Registration'}
                    </h2>
                    <p className="text-gray-600">
                      {userType === 'employee' 
                        ? 'Create your professional verification profile'
                        : 'Set up your organization for employee verification'
                      }
                    </p>
                  </div>
                </motion.div>

                <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                  {/* Common Fields */}
                  <motion.div variants={itemVariants}>
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </motion.div>

                  {/* User Type Specific Fields */}
                  {userType === 'employee' && (
                    <>
                      <motion.div variants={itemVariants}>
                        <Input
                          label="Country"
                          placeholder="Select your country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          required
                        />
                      </motion.div>

                      {/* <motion.div variants={itemVariants}>
                        <Input
                          label="Time Zone"
                          placeholder="Select your time zone"
                          value={formData.timezone}
                          onChange={(e) => handleInputChange("timezone", e.target.value)}
                          required
                        />
                      </motion.div> */}
                    </>
                  )}

                  {userType === 'employer' && (
                    <>
                      <motion.div variants={itemVariants}>
                        <Input
                          label="Organization Name"
                          placeholder="Enter your organization name"
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange("organizationName", e.target.value)}
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Input
                          label="Designation"
                          placeholder="Enter your job title"
                          value={formData.designation}
                          onChange={(e) => handleInputChange("designation", e.target.value)}
                          required
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Input
                          label="Company Handle"
                          placeholder="Enter company handle (min 3 characters)"
                          value={formData.companyHandle}
                          onChange={(e) => handleInputChange("companyHandle", e.target.value)}
                          minLength={3}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">This will be your unique identifier on the platform</p>
                      </motion.div>
                    </>
                  )}

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters with uppercase, lowercase, number and special character
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button type="submit" className="w-full py-3">
                        Create {userType === 'employee' ? 'Employee' : 'Employer'} Account
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>

                <motion.div className="mt-6 text-center" variants={itemVariants}>
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      Log in
                    </a>
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  )
}

export default SignUpPage