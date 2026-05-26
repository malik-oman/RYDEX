"use client"

import React from 'react'
import { motion, Variants } from 'motion/react'
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa'

const Footer = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" }
  ]

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Vehicles", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Contact", href: "#" }
  ]

  const vehicleLinks = [
    { name: "Cars", href: "#" },
    { name: "Bikes", href: "#" },
    { name: "Trucks", href: "#" },
    { name: "Buses", href: "#" },
    { name: "Luxury Vehicles", href: "#" }
  ]

  const supportLinks = [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "FAQs", href: "#" }
  ]

  return (
    <footer className="w-full bg-black text-white relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-20 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-wider text-white">
                RY<span className="text-amber-400">DEX</span>
              </h2>
              <div className="mt-2 w-12 h-1 bg-amber-400 rounded-full" />
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Book any vehicle — from bikes to trucks. Trusted owners. 
              Transparent pricing. Your journey starts here.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaPhoneAlt className="text-sm" />
                <span className="text-sm">+92 311 7343706</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaEnvelope className="text-sm" />
                <span className="text-sm">contact@rydex.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaMapMarkerAlt className="text-sm" />
                <span className="text-sm">Lahore, Pakistan</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent`}
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-white">
              Quick Links
            </h3>
            <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-amber-400" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vehicle Types */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-white">
              Vehicle Types
            </h3>
            <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
            <ul className="space-y-3">
              {vehicleLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-amber-400" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 mb-8"
        />

        {/* Bottom Bar */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm"
        >
          <motion.p variants={itemVariants}>
            © {new Date().getFullYear()} RYDEX. All rights reserved.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex items-center gap-6">
            {supportLinks.map((link, i) => (
              <a 
                key={i}
                href={link.href}
                className="hover:text-amber-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-gray-600"
          >
            Built by <span className="text-amber-400 font-medium">Malik Oman</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer