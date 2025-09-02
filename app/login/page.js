"use client";
import { use, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/authStore";


function LoginPage() {
  const login = useAuthStore(state => state.login)
  const isLoading = useAuthStore(state => state.isLoading)
  const error = useAuthStore(state => state.error)
  const clearError = useAuthStore(state => state.clearError)
  const user = useAuthStore(state => state.user)

  const [userType, setUserType] = useState(null) // 'employee' or 'employer'
  const [isCompanyLogin, setIsCompanyLogin] = useState(false) // Track if showing company login
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyHandle: "", // For company login
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear any existing errors
    if (error) {
      clearError()
    }
  }

  useEffect(()=>{
    if (user) {
      console.log("User logged in:", user);
      let redirectPath = '/dashboard' // Default
      
      if (userType === 'employer' && isCompanyLogin) {
        redirectPath = '/company/dashboard'
      } else if (user.user_type === 'employer') {
        redirectPath = '/employer/dashboard'
      } else if (user.user_type === 'company') {
        redirectPath = '/company/dashboard'
      }
      
      router.push(redirectPath)
    }
  }, [user, userType, isCompanyLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    
    try {
      // Determine login credentials based on login type
      let loginEmail = formData.email
      
      // For company login, if using company handle, we might need special handling
      if (userType === 'employer' && isCompanyLogin && formData.companyHandle) {
        // If company handle is provided, use it as the identifier
        loginEmail = formData.companyHandle
      }

      const result = await login(loginEmail, formData.password, isCompanyLogin ? 'companies' : userType === 'employee' ? 'employees' : 'employers')
      console.log(result, "result")
      if (result.success) {
        // Redirect based on login type and user role
        let redirectPath = '/dashboard' // Default
        console.log(userType, "userType")
        if (userType === 'employer' && isCompanyLogin) {
          redirectPath = '/company/dashboard'
        } else if (userType === 'employer') {
          redirectPath = '/employer/dashboard'
        }
        router.push(redirectPath)
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitted(false)
    }
  }

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    setIsCompanyLogin(false) // Reset company login state
    // Reset form data when switching user types
    setFormData({
      email: "",
      password: "",
      companyHandle: "",
    })
  }

  const handleCompanyLoginToggle = () => {
    setIsCompanyLogin(!isCompanyLogin)
    // Clear form data when switching between employer and company login
    setFormData({
      email: "",
      password: "",
      companyHandle: "",
    })
    if (error) {
      clearError()
    }
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

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    back: {
      rotateY: 180,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
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
                  Welcome back! Redirecting to your {userType === 'employee' ? 'employee' : (isCompanyLogin ? 'company' : 'employer')} dashboard.
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Company / Employer</h3>
                        <p className="text-sm text-gray-600">
                          Manage employee verifications and hiring
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                <motion.div className="mt-8 text-center" variants={itemVariants}>
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
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
              style={{ perspective: "1000px" }}
            >
              <motion.div
                variants={flipVariants}
                animate={userType === 'employer' && isCompanyLogin ? "back" : "front"}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side - Employee or Employer Login */}
                <motion.div
                  className="max-w-[500px] dashboard"
                  style={{ 
                    backfaceVisibility: "hidden",
                    position: userType === 'employer' && isCompanyLogin ? "absolute" : "relative",
                    width: "100%"
                  }}
                >
                  <Card className="p-8">
                    <motion.div className="flex items-center justify-between mb-8 gap-8" variants={itemVariants}>
                      <motion.button
                        onClick={() => {
                          setUserType(null)
                          setIsCompanyLogin(false)
                        }}
                        className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </motion.button>

                      <div className="flex-1 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-nowrap">
                          {userType === 'employee' ? 'Employee Sign In' : 'Employer Sign In'}
                        </h2>
                        <p className="text-gray-600 whitespace-nowrap">
                          {userType === 'employee' 
                            ? 'Access your professional verification dashboard'
                            : 'Manage your organization dashboard'
                          }
                        </p>
                      </div>

                      {userType === 'employer' && (
                        <motion.button
                          onClick={handleCompanyLoginToggle}
                          className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Company Login
                        </motion.button>
                      )}
                    </motion.div>

                    <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
                        >
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className="font-medium">Login Failed</p>
                              <p className="mt-1 text-sm">{error}</p>
                              {error.includes('Server error') && (
                                <div className="mt-2 text-xs text-red-600">
                                  <p>• The backend service is currently experiencing technical issues</p>
                                  <p>• This may be due to database maintenance or deployment updates</p>
                                  <p>• Please try again in a few minutes or contact support</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
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

                      <motion.div variants={itemVariants}>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button 
                            type="submit" 
                            className="w-full py-3"
                            disabled={isLoading || isSubmitted}
                          >
                            {isLoading || isSubmitted ? (
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing in...
                              </div>
                            ) : (
                              `Sign In as ${userType === 'employee' ? 'Employee' : 'Employer'}`
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>

                    <motion.div className="mt-8 text-center" variants={itemVariants}>
                      <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                          Sign up here
                        </a>
                      </p>
                    </motion.div>
                  </Card>
                </motion.div>

                {/* Back Side - Company Login */}
                {userType === 'employer' && (
                  <motion.div
                    className="max-w-[500px] min-w-[500px]"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: isCompanyLogin ? "relative" : "absolute",
                      width: "100%",
                      top: "0%"
                    }}
                  >
                    <Card className="p-8 max-h-[500px]" >
                      <motion.div className="flex items-center justify-between mb-8 gap-8" variants={itemVariants}>
                        <motion.button
                          onClick={() => {
                            setUserType(null)
                            setIsCompanyLogin(false)
                          }}
                          className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                        </motion.button>

                        <div className="flex-1 text-center">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Sign In</h2>
                          <p className="text-gray-600">
                            Access your company dashboard
                          </p>
                        </div>

                        <motion.button
                          onClick={handleCompanyLoginToggle}
                          className="text-green-600 hover:text-green-700 transition-colors duration-200 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Employer Login
                        </motion.button>
                      </motion.div>

                      <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
                          >
                            <div className="flex items-start">
                              <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <p className="font-medium">Login Failed</p>
                                <p className="mt-1 text-sm">{error}</p>
                                {error.includes('Server error') && (
                                  <div className="mt-2 text-xs text-red-600">
                                    <p>• The backend service is currently experiencing technical issues</p>
                                    <p>• This may be due to database maintenance or deployment updates</p>
                                    <p>• Please try again in a few minutes or contact support</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                        
                        <motion.div variants={itemVariants}>
                          <Input
                            label="Company Handle or Email"
                            placeholder="Enter company handle (@company) or email"
                            value={formData.companyHandle || formData.email}
                            onChange={(e) => {
                              const value = e.target.value
                              if (value.startsWith('@')) {
                                handleInputChange("companyHandle", value)
                                handleInputChange("email", "")
                              } else {
                                handleInputChange("email", value)
                                handleInputChange("companyHandle", "")
                              }
                            }}
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

                        <motion.div variants={itemVariants}>
                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button 
                              type="submit" 
                              className="w-full py-3"
                              disabled={isLoading || isSubmitted}
                            >
                              {isLoading || isSubmitted ? (
                                <div className="flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                  Signing in...
                                </div>
                              ) : (
                                "Sign In as Company"
                              )}
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.form>

                      <motion.div className="mt-8 text-center" variants={itemVariants}>
                        <p className="text-sm text-gray-600">
                          Don&apos;t have an account?{" "}
                          <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                            Sign up here
                          </a>
                        </p>
                      </motion.div>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  )
}

export default LoginPage