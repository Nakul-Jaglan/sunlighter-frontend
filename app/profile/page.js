"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '../../contexts/AuthContext'
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    location: '',
    bio: '',
    // Employee specific fields
    // Employer specific fields
    company_name: '',
    company_website: '',
    company_size: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        location: user.location || '',
        bio: user.bio || '',
        company_name: user.company_name || '',
        company_website: user.company_website || '',
        company_size: user.company_size || ''
      })
    }
  }, [user])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage({ type: '', text: '' })
    
    try {
      const success = await updateProfile(formData)
      if (success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
        setIsEditing(false)
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating your profile.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        location: user.location || '',
        bio: user.bio || '',
        company_name: user.company_name || '',
        company_website: user.company_website || '',
        company_size: user.company_size || ''
      })
    }
    setIsEditing(false)
    setMessage({ type: '', text: '' })
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
    }
  }

  if (!user) {
    return (
      <Layout title="Profile - SunLighter">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
            <Button variant="primary">
              <a href="/login" className="text-white">Log In</a>
            </Button>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Profile - SunLighter">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">
            Manage your {user.user_type === 'employer' ? 'company' : 'personal'} information and preferences
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Profile Header */}
          <motion.div variants={cardVariants}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.full_name}</h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.user_type === 'employer' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.user_type === 'employer' ? 'Employer' : 'Employee'}
                      </span>
                      {user.user_type === 'employer' && user.company_handle && (
                        <span className="text-sm text-green-600 font-medium">@{user.company_handle}</span>
                      )}
                      {user.user_type === 'employee' && user.user_id && (
                        <span className="text-sm text-blue-600 font-medium">#{user.user_id}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {!isEditing ? (
                    <Button 
                      variant="primary" 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="secondary" 
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-4 py-2"
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Success/Error Message */}
              <AnimatePresence>
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-md ${
                      message.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-700' 
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}
                  >
                    <div className="flex items-start">
                      <svg className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                        message.type === 'success' ? 'text-green-400' : 'text-red-400'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        {message.type === 'success' ? (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        )}
                      </svg>
                      <p className="font-medium">{message.text}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Profile Information */}
          <motion.div variants={cardVariants}>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {user.user_type === 'employer' ? 'Company Information' : 'Personal Information'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Input
                    label="Location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Employer-specific fields */}
                {user.user_type === 'employer' && (
                  <>
                    <div>
                      <Input
                        label="Company Name"
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => handleInputChange('company_name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Input
                        label="Company Website"
                        type="url"
                        value={formData.company_website}
                        onChange={(e) => handleInputChange('company_website', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Size
                      </label>
                      <select
                        value={formData.company_size}
                        onChange={(e) => handleInputChange('company_size', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    placeholder={`Tell us about ${user.user_type === 'employer' ? 'your company' : 'yourself'}...`}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Settings */}
          <motion.div variants={cardVariants}>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Account Status</h4>
                    <p className="text-sm text-gray-600">Your account is currently active</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Verification</h4>
                    <p className="text-sm text-gray-600">
                      {user.is_verified ? 'Your email is verified' : 'Please verify your email address'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.is_verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Account Created</h4>
                    <p className="text-sm text-gray-600">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  )
}

export default ProfilePage
