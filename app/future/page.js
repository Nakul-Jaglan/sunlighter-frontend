"use client"

import { motion } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from "next/link"
import { FaStar, FaLock, FaRocket } from 'react-icons/fa'

function FuturePlansPage() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }

  const futureFeatures = [
    {
      id: 1,
      title: "Blockchain Integration",
      icon: "⛓️",
      gradient: "from-purple-500 to-indigo-600",
      features: [
        "Immutable verification trails",
        "Tamper-proof employment history", 
        "Decentralized trust layer"
      ],
      timeline: "Q2 2025",
      impact: "Revolutionary trust infrastructure"
    },
    {
      id: 2,
      title: "Government ID Verification",
      // subtitle: "(opt-in)",
      icon: "🆔",
      gradient: "from-blue-500 to-cyan-600",
      features: [
        "Aadhaar, PAN, SSN, etc. for stronger identity checks",
        "Prevent fake user profiles",
        "Built with strict consent + privacy protection"
      ],
      timeline: "Q3 2025",
      impact: "Enhanced identity verification"
    },
    {
      id: 3,
      title: "Global Expansion",
      icon: "🌍",
      gradient: "from-green-500 to-teal-600",
      features: [
        "Cross-border verification support",
        "API integrations with global freelance platforms",
        "ATS and HR systems integration"
      ],
      timeline: "Q4 2025",
      impact: "Worldwide employment verification"
    },
    {
      id: 4,
      title: "Enhanced Privacy Controls",
      icon: "🔐",
      gradient: "from-orange-500 to-red-600",
      features: [
        "Zero-knowledge proof (ZKP) based verifications",
        "User-defined data visibility levels",
        "Multi-factor consent for sensitive cases"
      ],
      timeline: "Q1 2026",
      impact: "Ultimate privacy protection"
    },
    {
      id: 5,
      title: "Compliance & Standards",
      icon: "📋",
      gradient: "from-pink-500 to-purple-600",
      features: [
        "GDPR, SOC 2, ISO 27001 compliance roadmaps",
        "Open standard for employment verification APIs",
        "Industry-wide adoption framework"
      ],
      timeline: "Q2 2026",
      impact: "Industry standard compliance"
    }
  ]

  const stats = [
    { number: "5+", label: "Major Features Planned" },
    { number: "2026", label: "Full Roadmap Completion" },
    { number: "100%", label: "Privacy First Approach" },
    { number: "∞", label: "Trust & Innovation" }
  ]

  return (
    <Layout>
      <motion.div
        className="min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          className="py-10 px-4 text-center"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Roadmap 2025-2026
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Future Plans
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Shaping the future of employment verification with cutting-edge technology, 
              enhanced privacy, and global accessibility. Here&apos;s what&apos;s coming next.
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Future Features Grid */}
        <motion.section
          className="py-10 px-4"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What&apos;s Coming Next
              </h2>
              <p className="text-lg text-gray-600">
                Revolutionary features that will transform employment verification
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {futureFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-8 h-full relative overflow-hidden">
                    {/* Background Gradient */}
                    {/* <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${feature.gradient}`} /> */}
                    
                    {/* Timeline Badge */}
                    {/* <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {feature.timeline}
                      </span>
                    </div> */}

                    <motion.div
                      className="mb-6"
                      variants={cardHoverVariants}
                    >
                      {/* <div className="text-4xl mb-4">{feature.icon}</div> */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {feature.title}
                        {feature.subtitle && (
                          <span className="text-lg font-normal text-gray-500 ml-2">
                            {feature.subtitle}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-4">
                        {feature.impact}
                      </p>
                    </motion.div>

                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.4 }}
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Effect Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          className="py-10 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              Our Vision for 2026
            </motion.h2>
            
            <motion.p 
              className="text-xl leading-relaxed mb-8 opacity-90"
              variants={itemVariants}
            >
              By 2026, SunLighter will be the global standard for employment verification—
              trusted by millions, integrated everywhere, and setting new benchmarks for 
              privacy, security, and user control in the digital identity space.
            </motion.p>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              variants={itemVariants}
            >
              <div className="text-center flex flex-col items-center">
                <div className="text-4xl mb-4"><FaStar className="text-yellow-400" /></div>
                <h3 className="text-xl font-semibold mb-2">Industry Standard</h3>
                <p className="text-blue-100">The go-to solution for employment verification worldwide</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="text-4xl mb-4"><FaLock className="text-red-600" /></div>
                <h3 className="text-xl font-semibold mb-2">Privacy Leader</h3>
                <p className="text-blue-100">Setting new standards for data protection and user control</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="text-4xl mb-4"><FaRocket className="text-green-600" /></div>
                <h3 className="text-xl font-semibold mb-2">Innovation Hub</h3>
                <p className="text-blue-100">Continuously pushing the boundaries of verification technology</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 md:px-4 text-center"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="rounded-3xl p-12"
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-6"
                variants={itemVariants}
              >
                Shape the Future with Us
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Join us early and help shape the future of employment trust. 
                Your feedback and ideas will directly influence our roadmap.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="primary" 
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/signup" className="text-white">
                      Join Early Access
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="px-8 py-4 text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Link href="/contact" className="text-blue-600">
                      Share Your Ideas
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* <motion.div 
                className="mt-8 text-sm text-gray-500"
                variants={itemVariants}
              >
                <p>
                  💡 Have suggestions? We&apos;d love to hear from you. 
                  <Link href="/contact" className="text-blue-600 hover:underline ml-1">
                    Get in touch
                  </Link>
                </p>
              </motion.div> */}
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </Layout>
  )
}

export default FuturePlansPage
