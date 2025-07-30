"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

function LoginPage() {
  const [userType, setUserType] = useState(null) // 'employee' or 'employer'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Simulate login delay
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    // Reset form data when switching user types
    setFormData({
      email: "",
      password: "",
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

  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const spinVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  if (isSubmitted) {
    return (
      <Layout title="Signing In - SunLighter">
        <motion.div 
          className="max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={loadingVariants}>
            <Card className="p-8 text-center">
              <motion.div className="mb-6">
                <motion.div 
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  variants={spinVariants}
                  animate="rotate"
                >
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Signing you in...</h2>
                <p className="text-gray-600">
                  Welcome back! Redirecting to your {userType === 'employee' ? 'employee' : 'employer'} dashboard.
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </Layout>
    )
  }

  return (
    <Layout title="Sign In - SunLighter">
      <motion.div 
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your SunLighter account to continue</p>
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
                <motion.div className="text-center mb-8" variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Your Account Type</h2>
                  <p className="text-gray-600">Choose how you want to sign in</p>
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
                          Access your employment verification profile
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
                          Manage employee verifications and hiring
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                <motion.div className="mt-8 text-center" variants={itemVariants}>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      Sign up here
                    </a>
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="p-8">
                <motion.div className="flex items-center justify-between mb-8 gap-8" variants={itemVariants}>
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
                      {userType === 'employee' ? 'Employee Sign In' : 'Employer Sign In'}
                    </h2>
                    <p className="text-gray-600">
                      {userType === 'employee' 
                        ? 'Access your professional verification dashboard'
                        : 'Manage your organization and employee verifications'
                      }
                    </p>
                  </div>
                </motion.div>

                <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
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

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </motion.div>

                  <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <label className="flex items-center">
                      <motion.input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
                      Forgot password?
                    </a>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button type="submit" className="w-full py-3">
                        Sign In as {userType === 'employee' ? 'Employee' : 'Employer'}
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>

                {/* <motion.div className="mt-6" variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="ml-2">Google</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="ml-2">LinkedIn</span>
                    </motion.button>
                  </div>
                </motion.div> */}

                <motion.div className="mt-8 text-center" variants={itemVariants}>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                      Sign up here
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

export default LoginPage