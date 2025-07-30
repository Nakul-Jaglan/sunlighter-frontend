"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Input from '@/components/Input'

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // For development, we'll use a regular form submission
    // FormSubmit.co doesn't work with localhost due to CORS
    if (typeof window !== 'undefined') {
      // Create a hidden form for submission
      const form = document.createElement('form')
      form.action = 'https://formsubmit.co/jaglan.nakul@gmail.com'
      form.method = 'POST'
      form.style.display = 'none'

      // Add all form fields
      const fields = [
        { name: 'name', value: formData.name },
        { name: 'email', value: formData.email },
        { name: 'company', value: formData.company },
        { name: 'subject', value: formData.subject },
        { name: 'message', value: formData.message },
        { name: 'inquiry_type', value: formData.inquiryType },
        { name: '_next', value: window.location.origin },
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

      // Submit the form
      document.body.appendChild(form)
      form.submit()
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
      icon: '📧',
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'jaglan.nakul@gmail.com',
      action: 'mailto:jaglan.nakul@gmail.com'
    },
    // {
    //   icon: '💬',
    //   title: 'Live Chat',
    //   description: 'Chat with our support team',
    //   contact: 'Available 24*7',
    //   action: '#'
    // },
    {
      icon: '📞',
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
            Have questions about SunLighter? We're here to help you streamline your employment verification process.
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
                        className="w-full py-3 text-lg"
                      >
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
                          '📤 Send Message'
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
            <motion.div variants={cardVariants}>
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
            </motion.div>
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
    </Layout>
  )
}

export default ContactPage
