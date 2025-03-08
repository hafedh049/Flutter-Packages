"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, CheckCircle2 } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Add form submission functionality
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, you would send this to your API
      console.log("Subscribing email:", email)
      setSubmitted(true)
      setEmail("")

      // Reset after 5 seconds to allow multiple submissions
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 md:p-12 rounded-2xl border border-purple-500/20 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-500/10"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.2, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              <Bell className="w-4 h-4 mr-2" />
              <span>Stay Updated</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Get Flutter Package Updates
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300 mb-8 max-w-xl mx-auto"
            >
              Subscribe to our newsletter to receive updates on the latest Flutter packages, tutorials, and best
              practices directly in your inbox.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center text-green-400 font-medium"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Subscribe
                </Button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

