"use client"

import { m, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  const footerVariants = {
    initial: { 
      opacity: 0,
      y: 20
    },
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

  const sectionVariants = {
    initial: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const linkVariants = {
    initial: { opacity: 0.7 },
    hover: { 
      opacity: 1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" }
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ]

  return (
    <motion.footer
      variants={footerVariants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-gray-50 border-t border-gray-200"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company Info */}
          <motion.div 
            variants={sectionVariants}
            className="md:col-span-2"
          >
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center space-x-3 mb-4"
            >
              <Link href="/" className="flex items-center space-x-3" aria-label="Home">
                <div className="relative w-8 h-8 sm:w-30 sm:h-10 md:w-50 md:h-20">
                  <Image
                    src="/letter.png"
                    alt="Company Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* <span className="text-xl font-semibold text-gray-900">
                  SunLighter
                </span> */}
              </Link>
            </motion.div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Privacy-first employment verification platform. Streamline your hiring process with secure, efficient verification solutions.
            </p>

            <p className="mt-4 text-gray-600 text-base">
                <Link href="mailto:jaglan.nakul@gmail.com" className="text-gray-600 text-base font-medium transition-colors duration-200">
                    Contact us at <span className="text-blue-600 hover:text-blue-900">jaglan.nakul@gmail.com</span>
                </Link>
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3" role="navigation" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Legal & Contact */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <nav className="space-y-3" role="navigation" aria-label="Legal navigation">
              {legalLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              className="mt-6"
            >
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
              >
                Get Support →
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={sectionVariants}
          className="mt-6 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              className="text-gray-500 text-sm"
            >
              © {new Date().getFullYear()} SunLighter. All rights reserved.
            </motion.p>
            <motion.div 
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              className="text-gray-500 text-sm"
            >
              Made with care for privacy and security
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
