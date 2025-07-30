"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Layout from '../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'

function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "HR Director",
      company: "TechCorp Inc.",
      content: "SunLighter has revolutionized our hiring process. What used to take weeks now takes minutes.",
      avatar: "👩‍💼"
    },
    {
      name: "Marcus Johnson",
      role: "Recruiting Manager",
      company: "StartupXYZ",
      content: "The privacy-first approach gives our candidates confidence while giving us the verification we need.",
      avatar: "👨‍💼"
    },
    {
      name: "Elena Rodriguez",
      role: "People Operations",
      company: "Global Solutions",
      content: "Finally, a solution that respects both employer needs and employee privacy. Absolutely brilliant!",
      avatar: "👩‍💻"
    }
  ]

  const features = [
    {
      icon: "🔐",
      title: "Privacy-First Verification",
      description: "Employees control their data with time-limited access codes and approval systems."
    },
    {
      icon: "⚡",
      title: "Instant Verification",
      description: "Get employment status verification in seconds, not days or weeks."
    },
    {
      icon: "🛡️",
      title: "Secure & Compliant",
      description: "Enterprise-grade security with full GDPR and SOC 2 compliance."
    },
    {
      icon: "🌐",
      title: "Easy Integration",
      description: "Simple API integration with your existing HR systems and workflows."
    },
    {
      icon: "📊",
      title: "Complete Audit Trail",
      description: "Full transparency with detailed logs and compliance reports."
    },
    {
      icon: "🤝",
      title: "Win-Win Solution",
      description: "Benefits both employers and employees with mutual trust and transparency."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Verified Employees" },
    { number: "500+", label: "Partner Companies" },
    { number: "99.9%", label: "Uptime" },
    { number: "< 2 sec", label: "Average Response" }
  ]

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
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <Layout title="SunLighter - Privacy-First Employment Verification">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="relative overflow-hidden py-10 lg:py-15" variants={itemVariants}>
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </motion.div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Employment Verification
              <span className="block text-blue-600">Made Simple</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              The privacy-first platform that gives employees control over their data while providing employers with instant, secure verification.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  className="px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/signup'}
                >
                  Start Free Trial
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  variant="outline" 
                  className="px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-sm text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              No credit card required • Setup in 5 minutes
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section className="py-10 bg-gray-50 rounded-2xl" variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-600">Join thousands of companies and employees who trust SunLighter</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="py-20" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose SunLighter?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Built for the modern workforce with privacy, security, and ease of use at its core.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Simple, secure, and straightforward
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Employee Creates Code",
                description: "Employees generate time-limited verification codes with full control over access and duration.",
                icon: "👤"
              },
              {
                step: "02", 
                title: "Employer Verifies",
                description: "Employers enter the code to instantly access verified employment information securely.",
                icon: "🔍"
              },
              {
                step: "03",
                title: "Complete Transparency",
                description: "Both parties get full audit trails and notifications for complete transparency and trust.",
                icon: "📋"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 right-2 bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 px-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="py-20" variants={itemVariants}>
          <div className="text-center mb-6">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What Our Users Say
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 text-center">
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                <blockquote className="text-xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
                </div>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-10 mt-20 bg-gradient-to-r from-sky-500 to-blue-700 rounded-2xl text-white text-center"
          variants={itemVariants}
          style={{ y: y2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Hiring?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join the privacy-first revolution in employment verification. Start your free trial today.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/signup'}
              >
                Start Free Trial
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                Talk to Sales
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
  )
}

export default HomePage
