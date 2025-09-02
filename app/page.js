"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Layout from '../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { FaUserShield, FaBolt, FaShieldAlt, FaGlobe, FaChartBar, FaHandshake, FaUser, FaSearch, FaClipboard, FaClock, FaLock, FaDollarSign, FaBuilding, FaUserTie, FaBriefcase, FaUniversity, FaHome, FaKey, FaFileContract, FaUserCheck, FaDatabase, FaLink, FaCloud, FaCode, FaBook, FaCogs, FaBell, FaCheckCircle, FaQuestionCircle, FaUsers, FaMoneyBillWave, FaLaptop, FaFileAlt, FaBalanceScale } from "react-icons/fa"


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
      icon: <FaShieldAlt className="w-8 h-8 text-green-500" />,
      title: "Privacy-First Verification",
      description: "Employees will control their data with time-limited access codes and approval systems."
    },
    {
      icon: <FaBolt className="w-8 h-8 text-yellow-400" />,
      title: "Instant Verification",
      description: "Will provide employment status verification in seconds, not days or weeks."
    },
    {
      icon: <FaUserShield className="w-8 h-8 text-red-600" />,
      title: "Secure & Compliant",
      description: "Will feature enterprise-grade security with full GDPR and SOC 2 compliance."
    },
    {
      icon: <FaGlobe className="w-8 h-8 text-blue-500" />,
      title: "Easy Integration",
      description: "Will offer simple API integration with your existing HR systems and workflows."
    },
    {
      icon: <FaChartBar className="w-8 h-8 text-orange-500" />,
      title: "Complete Audit Trail",
      description: "Will provide full transparency with detailed logs and compliance reports."
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-yellow-500" />,
      title: "Win-Win Solution",
      description: "Will benefit both employers and employees with mutual trust and transparency."
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
              The privacy-first platform that will give employees control over their data while providing employers with instant, secure verification.
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
                  Join Early Access
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  variant="outline" 
                  className="px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Updates
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

        {/* Problem Statement Section */}
        <motion.section className="py-16 bg-gray-50 rounded-2xl" variants={itemVariants}>
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Employment Verification Challenge
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Traditional employment verification is broken. HR departments spend countless hours processing verification requests, 
              while employees lose control over their personal employment data. Background check companies charge high fees 
              and take weeks to provide basic employment confirmation. SunLighter will solve these problems.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                problem: "Time-Consuming Process",
                description: "Manual verification processes can take 5-15 business days, slowing down hiring and loan approvals.",
                icon: <FaClock className="w-8 h-8 text-red-500" />
              },
              {
                problem: "Privacy Concerns",
                description: "Employees have no control over who accesses their employment data or how long it remains accessible.",
                icon: <FaLock className="w-8 h-8 text-orange-500" />
              },
              {
                problem: "High Costs",
                description: "Traditional background check services charge $25-100+ per verification, adding unnecessary costs.",
                icon: <FaDollarSign className="w-8 h-8 text-yellow-600" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center bg-white p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.problem}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits for Different Users */}
        <motion.section className="py-16" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Benefits for Every Stakeholder
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              SunLighter will serve HR teams, hiring managers, employees, and third-party verifiers with tailored solutions.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Employers */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <FaBuilding className="w-8 h-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">For Employers & HR Teams</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will reduce verification time</strong> from weeks to seconds</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will lower costs</strong> by eliminating expensive background check services</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will offer API integration</strong> with existing HRIS and ATS systems</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will provide compliance reporting</strong> with detailed audit trails</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will include bulk verification</strong> capabilities for large hiring volumes</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* For Employees */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <FaUserTie className="w-8 h-8 text-green-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">For Employees</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will give full control</strong> over who accesses your employment data</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will provide time-limited access codes</strong> that expire automatically</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will send real-time notifications</strong> whenever your data is accessed</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will enable faster job applications</strong> with instant verification</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span><strong>Will ensure complete transparency</strong> with detailed access logs</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Use Cases Section */}
        <motion.section className="py-16 rounded-2xl" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Common Use Cases
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From job applications to loan approvals, SunLighter will streamline verification across industries.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Job Applications",
                description: "Will speed up the hiring process with instant employment history verification during candidate screening.",
                icon: <FaBriefcase className="w-8 h-8 text-blue-600" />,
                examples: ["Pre-employment screening", "Reference checks", "Background verification"]
              },
              {
                title: "Loan Applications",
                description: "Will help financial institutions verify employment status quickly for mortgage and loan approvals.",
                icon: <FaUniversity className="w-8 h-8 text-green-600" />,
                examples: ["Mortgage applications", "Personal loans", "Credit applications"]
              },
              {
                title: "Rental Applications",
                description: "Will enable landlords to verify tenant employment status instantly for rental property applications.",
                icon: <FaHome className="w-8 h-8 text-purple-600" />,
                examples: ["Apartment rentals", "Income verification", "Tenant screening"]
              },
              {
                title: "Insurance Claims",
                description: "Will allow insurance companies to verify employment for disability and workers' compensation claims.",
                icon: <FaShieldAlt className="w-8 h-8 text-orange-600" />,
                examples: ["Disability claims", "Workers' comp", "Income protection"]
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-1">
                  {useCase.examples.map((example, idx) => (
                    <div key={idx} className="text-sm text-blue-600 flex items-center">
                      <span className="text-blue-400 mr-2">•</span>
                      {example}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="py-10" variants={itemVariants}>
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

        {/* Security & Compliance Section */}
        <motion.section className="py-16" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Enterprise-Grade Security & Compliance
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Will be built with security-first architecture and designed to meet the most stringent compliance requirements.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Data Privacy Protection",
                description: "Employee data will be encrypted at rest and in transit, with zero-knowledge architecture ensuring maximum privacy.",
                icon: <FaKey className="w-8 h-8 text-blue-600" />,
                features: ["End-to-end encryption", "Zero-knowledge storage", "Data minimization"]
              },
              {
                title: "Compliance Ready",
                description: "Will be designed to meet GDPR, CCPA, SOX, and other regulatory requirements with built-in compliance tools.",
                icon: <FaFileContract className="w-8 h-8 text-green-600" />,
                features: ["GDPR compliance", "CCPA ready", "SOX audit trails"]
              },
              {
                title: "Access Controls",
                description: "Will feature granular permission systems with role-based access controls and multi-factor authentication.",
                icon: <FaUserCheck className="w-8 h-8 text-purple-600" />,
                features: ["Role-based access", "MFA support", "Permission granularity"]
              },
              {
                title: "Audit Trails",
                description: "Will maintain complete audit logs for all verification activities with tamper-proof timestamping.",
                icon: <FaDatabase className="w-8 h-8 text-orange-600" />,
                features: ["Complete audit logs", "Tamper-proof records", "Compliance reporting"]
              },
              {
                title: "API Security",
                description: "Will provide secure API endpoints with rate limiting, authentication tokens, and webhook security.",
                icon: <FaLink className="w-8 h-8 text-red-600" />,
                features: ["OAuth 2.0", "Rate limiting", "Webhook signatures"]
              },
              {
                title: "Infrastructure Security",
                description: "Will be hosted on secure cloud infrastructure with 99.9% uptime and disaster recovery.",
                icon: <FaCloud className="w-8 h-8 text-indigo-600" />,
                features: ["99.9% uptime SLA", "Disaster recovery", "Geographic redundancy"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-1">
                    {feature.features.map((feat, idx) => (
                      <div key={idx} className="text-sm text-green-600 flex items-center">
                        <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Integration Section */}
        <motion.section className="py-16 bg-gray-50 rounded-2xl" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Easy Integration & Implementation
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Will get you up and running in minutes with our developer-friendly API and comprehensive integration options.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Developer-Friendly API</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaCode className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">RESTful API Design</h4>
                    <p className="text-gray-600">Will feature clean, intuitive endpoints following REST principles with comprehensive documentation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBook className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interactive Documentation</h4>
                    <p className="text-gray-600">Will allow testing API endpoints directly in the browser with real-time examples and responses.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaCogs className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">SDK Support</h4>
                    <p className="text-gray-600">Will provide official SDKs for Python, JavaScript, PHP, and Java with more languages coming later.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBell className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Webhook Support</h4>
                    <p className="text-gray-600">Will offer real-time notifications for verification events with secure webhook endpoints.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Integrations</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Workday", category: "HRIS" },
                  { name: "BambooHR", category: "HR Platform" },
                  { name: "Greenhouse", category: "ATS" },
                  { name: "Lever", category: "Recruiting" },
                  { name: "Salesforce", category: "CRM" },
                  { name: "HubSpot", category: "CRM" },
                  { name: "Zapier", category: "Automation" },
                  { name: "Microsoft Teams", category: "Communication" }
                ].map((integration, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-500">{integration.category}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Custom Integration Support</h4>
                <p className="text-blue-700 text-sm">
                  Don&apos;t see your system listed? Our integration team will help you build custom connections 
                  to your existing tools and workflows.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section className="py-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl" variants={itemVariants}>
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
                description: "Employees will generate time-limited verification codes with full control over access and duration.",
                icon: <FaUser className="w-8 h-8 text-green-600" />
              },
              {
                step: "02", 
                title: "Employer Verifies",
                description: "Employers will enter the code to instantly access verified employment information securely.",
                icon: <FaSearch className="w-8 h-8 text-green-600" />
              },
              {
                step: "03",
                title: "Complete Transparency",
                description: "Both parties will get full audit trails and notifications for complete transparency and trust.",
                icon: <FaClipboard className="w-8 h-8 text-green-700" />
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

        {/* FAQ Section */}
        <motion.section className="py-16" variants={itemVariants}>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Common questions about employment verification and how SunLighter works.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How will SunLighter protect employee privacy?",
                answer: "SunLighter will give employees complete control over their data. Employees will generate time-limited access codes that specify exactly what information can be accessed and for how long. All data will be encrypted, and employees will receive notifications whenever their information is accessed."
              },
              {
                question: "What information will be verified through SunLighter?",
                answer: "SunLighter will be able to verify employment status, job title, employment dates, salary information (with employee consent), and other employment-related data. Employees will control which specific details are shared for each verification request."
              },
              {
                question: "How fast will the verification process be?",
                answer: "Verification will be instant once an employee provides an access code. The entire process will take seconds compared to traditional methods that can take 5-15 business days. This speed will help accelerate hiring, loan approvals, and other time-sensitive processes."
              },
              {
                question: "Will SunLighter be compliant with privacy regulations?",
                answer: "Yes, SunLighter will be designed to comply with GDPR, CCPA, SOX, and other major privacy regulations. Our privacy-first architecture will ensure data minimization, user consent, and complete audit trails for all verification activities."
              },
              {
                question: "Will SunLighter integrate with existing HR systems?",
                answer: "Absolutely. SunLighter will offer RESTful APIs and pre-built integrations with popular HRIS, ATS, and CRM systems like Workday, BambooHR, Greenhouse, and Salesforce. Our team will also help with custom integrations."
              },
              {
                question: "What will happen if an employee leaves the company?",
                answer: "Former employees will retain control over their employment data through SunLighter. They will continue to be able to generate verification codes for their past employment, ensuring they can still verify their work history for future opportunities."
              },
              {
                question: "How much will SunLighter cost?",
                answer: "SunLighter will offer flexible pricing based on your verification volume and needs. We will provide significant cost savings compared to traditional background check services while offering faster, more secure verification."
              },
              {
                question: "What will happen if there's a dispute about employment information?",
                answer: "SunLighter will maintain detailed audit trails for all verifications. In case of disputes, both employers and employees will have access to timestamped records of what information was shared and when, providing transparency and accountability."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-3">
                    <FaQuestionCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        {/* <motion.section className="py-20" variants={itemVariants}>
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
                  &quot;{testimonials[currentTestimonial].content}&quot;
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
        </motion.section> */}

        {/* CTA Section */}
        <motion.section 
          className="py-10 mt-40 bg-gradient-to-r from-sky-500 to-blue-700 rounded-2xl text-white text-center"
          variants={itemVariants}
          style={{ y: y2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Future Hiring?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join the upcoming privacy-first revolution in employment verification. Be among the first to experience the future.
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
                Join Early Access
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                Get Updates
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </Layout>
  )
}

export default HomePage
