"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import Button from "../Button"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10)
  })

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  const headerVariants = {
    initial: { 
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      opacity: 0
    },
    visible: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    scrolled: { 
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      transition: { duration: 0.3 }
    },
  }

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  }

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 0.8,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: { y: -2, opacity: 1 },
    tap: { y: 0 },
  }

  const navContainerVariants = {
    initial: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.08
      }
    }
  }

  const authButtonVariants = {
    initial: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const menuIconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.3
      }
    },
    closed: { rotate: 0 },
    open: { rotate: 180 },
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate={"visible"}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200/50"
      role="banner"
    >
      <motion.nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
        role="navigation" 
        aria-label="Main navigation"
        variants={navContainerVariants}
        initial="initial"
        animate="visible"
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-3" aria-label="Home">
              <div className="relative w-8 h-8 sm:w-30 sm:h-30 md:w-50 md:h-50">
                <Image
                  src="/letter.png"
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* <span className="text-xl font-semibold text-gray-900 hidden sm:block">
                SunLighter
              </span> */}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                initial="initial"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2, ease: "easeInOut", delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-800 text-xl hover:text-blue-900 font-medium transition-colors duration-200 relative group"
                  role="menuitem"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            variants={authButtonVariants}
            initial="initial"
            animate="visible"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Link
                href="/login"
                className="text-gray-600 text-xl hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Log In
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Button variant="primary" className="px-2 py-2">
                <Link href="/signup" className="text-white text-xl">
                  Sign Up
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            variants={menuIconVariants}
            initial="initial"
            animate={isMobileMenuOpen ? "open" : "visible"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          id="mobile-menu"
          variants={mobileMenuVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
          className="md:hidden overflow-hidden bg-white border-t border-gray-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="border-t border-gray-200 pt-3 mt-3 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <Link
                href="/login"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <div className="px-3">
                <Button variant="primary" className="w-full px-4 py-2">
                  <Link href="/signup" className="text-white">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>
    </motion.header>
  )
}

export default Header
