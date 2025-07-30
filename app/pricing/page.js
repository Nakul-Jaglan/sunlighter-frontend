"use client"

import { motion } from "framer-motion"
import Layout from '../../components/layout/Layout'
import Card from '@/components/Card'
import Button from '@/components/Button'

function PricingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  }

  const features = [
    "Unlimited verification codes",
    "Real-time notifications",
    "Complete audit trails",
    "Privacy-first controls",
    "24/7 customer support",
    "API access & integration"
  ]

  return (
    <Layout title="Pricing - SunLighter">
      <motion.div
        className="min-h-screen py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Transparent. Affordable.
            <span className="block text-blue-600">Coming Soon.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            We&apos;re working on a pricing model that&apos;s fair to remote teams and freelancers alike. 
            SunLighter is currently <span className="font-semibold text-emerald-600">free</span> while 
            we build in public and gather feedback.
          </motion.p>
        </motion.div>

        {/* Current Free Plan Card */}
        <motion.div 
          className="max-w-2xl mx-auto mb-20"
          variants={itemVariants}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative"
          >
            <Card className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Free Beta
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-15 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-30"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Current Plan</h2>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-6xl font-bold text-emerald-600">$0</span>
                    <span className="text-xl text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600">Full access while we build and improve</p>
                </div>

                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg w-full"
                      onClick={() => window.location.href = '/signup'}
                    >
                      Get Started Free
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-x-4 translate-y-4"></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">🚧</div>
                <h2 className="text-3xl font-bold mb-4">Future Pricing Plans</h2>
                <p className="text-xl opacity-90 mb-6">
                  We&apos;re crafting flexible plans for individuals, teams, and enterprises. 
                  Stay tuned for announcements!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white text-gray-700 bg-opacity-10 rounded-lg p-4">
                    <div className="text-2xl mb-2">👤</div>
                    <h3 className="font-semibold mb-1">Individual</h3>
                    <p className="text-sm opacity-80">Perfect for freelancers</p>
                  </div>
                  <div className="bg-white text-gray-700 bg-opacity-10 rounded-lg p-4">
                    <div className="text-2xl mb-2">👥</div>
                    <h3 className="font-semibold mb-1">Team</h3>
                    <p className="text-sm opacity-80">For growing companies</p>
                  </div>
                  <div className="bg-white text-gray-700 bg-opacity-10 rounded-lg p-4">
                    <div className="text-2xl mb-2">🏢</div>
                    <h3 className="font-semibold mb-1">Enterprise</h3>
                    <p className="text-sm opacity-80">Custom solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gray-50 border-2 border-gray-200">
              <div className="text-4xl mb-4">⭐</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Want early access to premium features?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Join our early access program and help shape the future of SunLighter. 
                Get priority access to new features and special pricing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button 
                    variant="outline"
                    className="px-8 py-4 text-lg"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How long will it be free?",
                answer: "SunLighter will remain free during our beta phase as we gather feedback and improve the platform. We'll give plenty of notice before any pricing changes."
              },
              {
                question: "Will existing users get special pricing?",
                answer: "Absolutely! Early users and feedback providers will receive special pricing and grandfathered benefits when we launch our paid plans."
              },
              {
                question: "What happens to my data?",
                answer: "Your data remains yours, always. We're committed to privacy-first principles and will never sell or share your information, regardless of pricing changes."
              },
              {
                question: "Can I upgrade later?",
                answer: "Yes! When premium features become available, you'll be able to upgrade seamlessly without losing any data or settings."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

export default PricingPage
