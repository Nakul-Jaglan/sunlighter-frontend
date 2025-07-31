"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "employee" // or "employer" - changed from 'role' to 'user_type'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    
    setIsSubmitted(true)
    
    try {
      const { confirmPassword, ...registrationData } = formData
      const result = await register(registrationData)
      
      if (result.success) {
        // Redirect based on user user_type
        const redirectPath = result.user.user_type === 'employer' ? '/employer/dashboard' : '/dashboard'
        window.location.href = redirectPath
      }
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsSubmitted(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  }

  return (
    <Layout title="Register - SunLighter">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join SunLighter for secure employment verification</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-xl border-0 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      onClick={() => handleInputChange("user_type", "employee")}
                      className={`p-3 text-sm font-medium rounded-md border-2 transition-colors ${
                        formData.user_type === "employee"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Employee
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => handleInputChange("user_type", "employer")}
                      className={`p-3 text-sm font-medium rounded-md border-2 transition-colors ${
                        formData.user_type === "employer"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Employer
                    </motion.button>
                  </div>
                </div>

                <div>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>

                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button 
                    type="submit" 
                    className="w-full py-3"
                    disabled={isLoading || isSubmitted}
                  >
                    {isLoading || isSubmitted ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div className="mt-6 text-center" variants={itemVariants}>
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </a>
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}

export default RegisterPage
