"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { FaWhatsapp, FaPhone, FaPaperPlane } from 'react-icons/fa'
import { MdOutlineMailLock } from "react-icons/md";


function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit form data via fetch to avoid redirect
      const response = await fetch('https://formsubmit.co/ajax/jaglan.nakul@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.inquiryType,
          _subject: `New Query on SunLighter Website: ${formData.subject}`,
          _autoresponse: 'Thank you for contacting us! We will get back to you shortly.',
          _template: 'table'
        })
      })

      if (response.ok) {
        setShowThankYou(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        })
        
        // Auto redirect after 10 seconds
        setTimeout(() => {
          window.location.href = '/'
        }, 10000)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // Fallback to the original method if AJAX fails
      const form = document.createElement('form')
      form.action = 'https://formsubmit.co/jaglan.nakul@gmail.com'
      form.method = 'POST'
      form.style.display = 'none'

      const fields = [
        { name: 'name', value: formData.name },
        { name: 'email', value: formData.email },
        { name: 'company', value: formData.company },
        { name: 'subject', value: formData.subject },
        { name: 'message', value: formData.message },
        { name: 'inquiry_type', value: formData.inquiryType },
        { name: '_next', value: window.location.origin + '?submitted=true' },
        { name: '_subject', value: `New Query on SunLighter Website: ${formData.subject}` },
        { name: '_captcha', value: 'false' },
        { name: '_autoresponse', value: 'Thank you for contacting us! We will get back to you shortly.' },
        { name: '_template', value: 'table' }
      ]

      fields.forEach(field => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = field.name
        input.value = field.value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  }

  const contactMethods = [
    {
      icon: <MdOutlineMailLock className="text-gray-600" />,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'jaglan.nakul@gmail.com',
      action: 'mailto:jaglan.nakul@gmail.com'
    },
    {
      icon: <FaWhatsapp className="text-gray-600" />,
      title: 'Live Chat',
      description: 'Chat directly on WhatsApp',
      contact: 'Available 24*7',
      action: 'https://wa.me/917988223181?text=Hello%20SunLighter%20Team'
    },
    {
      icon: <FaPhone className="text-gray-600" />,
      title: 'Phone Support',
      description: 'Get in touch via phone',
      contact: '+91 7988223181',
      action: 'tel:+917988223181'
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' },
    { value: 'legal', label: 'Legal & Compliance' }
  ]

  return (
    <Layout title="Contact Us - SunLighter">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about SunLighter? We&apos;re here to help you streamline your employment verification process.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div variants={cardVariants}>
              <Card className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Input
                        label="Full Name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="your.email@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Company and Inquiry Type Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <Input
                        label="Company Name"
                        placeholder="Your company (optional)"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                        className="w-full px-3 py-3 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div variants={itemVariants}>
                    <Input
                      label="Subject"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Tell us more about your inquiry, requirements, or how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-3 py-2 placeholder:text-gray-400 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      required
                    />
                  </motion.div>

                  {/* Privacy Notice */}
                  <motion.div variants={itemVariants}>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            <strong>Privacy Notice:</strong> Your information will be used solely to respond to your inquiry. 
                            We respect your privacy and will never share your details with third parties.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                        className="w-full py-3 text-lg flex items-center justify-center"
                      >
                        <FaPaperPlane className="mr-2" />
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending Message...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Information Sidebar */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Contact Methods */}
            <motion.div variants={cardVariants}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.action}
                      target="_blank"
                      className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">{method.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {method.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                          <p className="text-sm font-medium text-gray-800">{method.contact}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Business Hours */}
            {/* <motion.div variants={cardVariants}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-700">Currently Online</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">We typically respond within 2-4 hours</p>
                </div>
              </Card>
            </motion.div> */}

            {/* FAQ Quick Links */}
            {/* <motion.div variants={cardVariants}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
                <div className="space-y-2">
                  {[
                    'How does employment verification work?',
                    'Pricing and subscription plans',
                    'Integration and API documentation',
                    'Security and compliance',
                    'Account setup and onboarding'
                  ].map((faq, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      → {faq}
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div> */}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of companies already using SunLighter for secure employment verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button className="py-2" onClick={() => window.location.href = '/signup'}>
                  Start Now
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button className="py-2" variant="outline" onClick={() => window.location.href = '/pricing'}>
                  View Pricing
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Thank You Modal */}
      {showThankYou && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                    Thank You!
                  </h3>
                  <div className="text-sm text-gray-600 space-y-3">
                    <p>Your message has been successfully submitted. We&apos;ll get back to you within 24 hours.</p>
                    
                    <div className="border-t pt-3 mt-4">
                      <p className="font-medium text-gray-700 mb-2">Need immediate support?</p>
                      <div className="space-y-1">
                        <p>Email: <a href="mailto:jaglan.nakul@gmail.com" className="text-blue-600 hover:underline"> jaglan.nakul@gmail.com</a></p>
                        <p>Phone: <a href="tel:+917988223181" className="text-blue-600 hover:underline"> +91 7988223181</a></p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      Redirecting to home page in 10 seconds...
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowThankYou(false)
                    window.location.href = '/'
                  }}
                  className="w-full cursor-pointer inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Go to Home
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowThankYou(false)}
                  className="mt-3 w-full cursor-pointer inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </Layout>
  )
}

export default ContactPage
