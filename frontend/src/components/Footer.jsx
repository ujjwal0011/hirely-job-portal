'use client'

import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Twitter, Instagram, Youtube, Linkedin, MapPin, Mail, Phone, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user)

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Explore Jobs' },
    { href: '/companies', label: 'Top Companies' },
    { href: '/resources', label: 'Career Resources' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    ...(isAuthenticated ? [{ href: '/dashboard', label: 'Candidate Dashboard' }] : []),
  ]

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">Hirely</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering careers, connecting ambitions. Hirely is your gateway to 
              a world of professional opportunities, matching talent with visionary companies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Explore Hirely
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <span>21 Innovation Hub, Tech Park, Bangalore, Karnataka, India - 560103</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href="mailto:hello@Hirely.com" className="hover:text-blue-600 transition-colors duration-300">
                doejohn67711@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <a href="tel:+918288665190" className="hover:text-blue-600 transition-colors duration-300">
                  +91 828 866 5190
                </a>
              </li>
            </ul>
            <Button variant="outline" className="mt-4">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-200" />
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Hirely. Transforming careers, one connection at a time.
        </p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
            Terms of Service
          </Link>
          <Link to="/accessibility" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

