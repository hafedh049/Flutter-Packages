"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Flutter Packages
              </h3>
              <p className="text-gray-400 mb-4">
                Discover the best packages to supercharge your Flutter development workflow.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/flutter/flutter"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://twitter.com/flutterdev"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/flutter"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://www.youtube.com/flutterdev"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-white">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#categories" className="text-gray-400 hover:text-white transition-colors">
                    UI Components
                  </Link>
                </li>
                <li>
                  <Link href="#search" className="text-gray-400 hover:text-white transition-colors">
                    State Management
                  </Link>
                </li>
                <li>
                  <Link href="#search" className="text-gray-400 hover:text-white transition-colors">
                    Animation
                  </Link>
                </li>
                <li>
                  <Link href="#search" className="text-gray-400 hover:text-white transition-colors">
                    Networking
                  </Link>
                </li>
                <li>
                  <Link href="#search" className="text-gray-400 hover:text-white transition-colors">
                    Storage
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://flutter.dev/docs"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://flutter.dev/learn"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://medium.com/flutter"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://flutter.dev/community"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://flutter.dev/faq"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <Link
                    href="mailto:info@flutterpackages.dev"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    info@flutterpackages.dev
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://flutter.dev/support"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/sponsors/flutter"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sponsorship
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/flutter/flutter/contribute"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contribute
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          <p>© {currentYear} Flutter Packages. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="https://flutter.dev/privacy" target="_blank" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="https://flutter.dev/tos" target="_blank" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="https://flutter.dev/brand" target="_blank" className="hover:text-white transition-colors">
              Brand Guidelines
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

